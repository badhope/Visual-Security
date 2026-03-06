/**
 * 引导流程与 UI 增强模块
 * 包含新手引导、提示系统、UI 动画等
 */

/**
 * 新手引导管理器
 */
export class TourGuide {
    constructor() {
        this.steps = [];
        this.currentStep = 0;
        this.isActive = false;
        this.overlay = null;
        this.tooltip = null;
    }
    
    /**
     * 初始化引导
     */
    init() {
        this.createOverlay();
        this.createTooltip();
        this.loadSteps();
    }
    
    /**
     * 创建遮罩层
     */
    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'tour-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 9998;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(this.overlay);
    }
    
    /**
     * 创建提示框
     */
    createTooltip() {
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'tour-tooltip';
        this.tooltip.style.cssText = `
            position: absolute;
            background: linear-gradient(135deg, rgba(0, 245, 212, 0.95), rgba(131, 56, 236, 0.95));
            backdrop-filter: blur(20px);
            border: 2px solid rgba(0, 245, 212, 0.5);
            border-radius: 15px;
            padding: 20px;
            max-width: 350px;
            z-index: 9999;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            box-shadow: 0 10px 40px rgba(0, 245, 212, 0.4);
        `;
        document.body.appendChild(this.tooltip);
    }
    
    /**
     * 加载引导步骤
     */
    loadSteps() {
        this.steps = [
            {
                target: '.nav-link[data-page="gallery"]',
                title: '探索视觉错觉',
                content: '点击这里进入图库，探索 25+ 种令人惊叹的视觉错觉！',
                position: 'bottom'
            },
            {
                target: '.nav-link[data-page="learn"]',
                title: '学习科学知识',
                content: '学习中心提供神经科学、数学、物理学等多角度的原理解释。',
                position: 'bottom'
            },
            {
                target: '.level-badge',
                title: '等级系统',
                content: '通过探索和学习获得经验值，提升等级解锁成就！',
                position: 'left'
            },
            {
                target: '.illusion-card:first-child',
                title: '互动体验',
                content: '点击任意错觉卡片查看详情，并与错觉进行互动！',
                position: 'right'
            },
            {
                target: '.creator-mode-btn',
                title: '创作模式',
                content: '使用创作模式设计属于你自己的视觉错觉！',
                position: 'top'
            }
        ];
    }
    
    /**
     * 开始引导
     */
    start() {
        if (this.isActive) return;
        
        this.isActive = true;
        this.currentStep = 0;
        this.overlay.style.opacity = '1';
        this.overlay.style.pointerEvents = 'all';
        
        this.showStep();
    }
    
    /**
     * 显示当前步骤
     */
    showStep() {
        if (this.currentStep >= this.steps.length) {
            this.end();
            return;
        }
        
        const step = this.steps[this.currentStep];
        const target = document.querySelector(step.target);
        
        if (!target) {
            this.next();
            return;
        }
        
        // 高亮目标元素
        target.style.transition = 'all 0.3s ease';
        target.style.boxShadow = '0 0 0 4px rgba(0, 245, 212, 0.5)';
        
        // 滚动到目标元素
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // 更新提示框内容
        this.updateTooltip(step);
        
        // 定位提示框
        this.positionTooltip(target, step.position);
        
        // 显示提示框
        setTimeout(() => {
            this.tooltip.style.opacity = '1';
            this.tooltip.style.transform = 'translateY(0)';
        }, 300);
    }
    
    /**
     * 更新提示框内容
     */
    updateTooltip(step) {
        this.tooltip.innerHTML = `
            <h4 style="margin: 0 0 10px 0; color: #fff; font-size: 18px; font-family: 'Orbitron', sans-serif;">
                ${step.title}
            </h4>
            <p style="margin: 0 0 20px 0; color: rgba(255, 255, 255, 0.9); font-size: 14px; line-height: 1.6;">
                ${step.content}
            </p>
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button class="illusion-btn" onclick="window.tourGuide.skip()" style="padding: 8px 16px; font-size: 13px;">
                    跳过
                </button>
                <button class="illusion-btn active" onclick="window.tourGuide.next()" style="padding: 8px 16px; font-size: 13px;">
                    ${this.currentStep === this.steps.length - 1 ? '完成' : '下一步'}
                </button>
            </div>
        `;
    }
    
    /**
     * 定位提示框
     */
    positionTooltip(target, position) {
        const targetRect = target.getBoundingClientRect();
        const tooltipRect = this.tooltip.getBoundingClientRect();
        
        let top, left;
        
        switch (position) {
            case 'bottom':
                top = targetRect.bottom + 20;
                left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
                break;
            case 'top':
                top = targetRect.top - tooltipRect.height - 20;
                left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
                left = targetRect.left - tooltipRect.width - 20;
                break;
            case 'right':
                top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
                left = targetRect.right + 20;
                break;
            default:
                top = targetRect.bottom + 20;
                left = targetRect.left;
        }
        
        // 边界检查
        top = Math.max(20, Math.min(top, window.innerHeight - tooltipRect.height - 20));
        left = Math.max(20, Math.min(left, window.innerWidth - tooltipRect.width - 20));
        
        this.tooltip.style.top = `${top}px`;
        this.tooltip.style.left = `${left}px`;
    }
    
    /**
     * 下一步
     */
    next() {
        const target = document.querySelector(this.steps[this.currentStep]?.target);
        if (target) {
            target.style.boxShadow = '';
        }
        
        this.currentStep++;
        this.showStep();
    }
    
    /**
     * 跳过引导
     */
    skip() {
        const target = document.querySelector(this.steps[this.currentStep]?.target);
        if (target) {
            target.style.boxShadow = '';
        }
        
        this.end();
        localStorage.setItem('tour_skipped', 'true');
    }
    
    /**
     * 结束引导
     */
    end() {
        this.isActive = false;
        this.overlay.style.opacity = '0';
        this.overlay.style.pointerEvents = 'none';
        this.tooltip.style.opacity = '0';
        this.tooltip.style.transform = 'translateY(20px)';
        
        localStorage.setItem('tour_completed', 'true');
    }
    
    /**
     * 检查是否需要显示引导
     */
    shouldShow() {
        const completed = localStorage.getItem('tour_completed');
        const skipped = localStorage.getItem('tour_skipped');
        return !completed && !skipped;
    }
}

/**
 * 提示系统
 */
export class ToastSystem {
    constructor() {
        this.container = null;
    }
    
    /**
     * 初始化
     */
    init() {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        this.container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(this.container);
    }
    
    /**
     * 显示提示
     */
    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.cssText = `
            background: rgba(10, 10, 18, 0.95);
            backdrop-filter: blur(20px);
            border-left: 4px solid ${this.getColor(type)};
            border-radius: 8px;
            padding: 15px 20px;
            min-width: 300px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            gap: 12px;
            animation: slideInRight 0.3s ease;
        `;
        
        const icon = this.getIcon(type);
        toast.innerHTML = `
            <span style="font-size: 20px;">${icon}</span>
            <span style="color: #fff; font-size: 14px; flex: 1;">${message}</span>
        `;
        
        this.container.appendChild(toast);
        
        // 自动移除
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                this.container.removeChild(toast);
            }, 300);
        }, duration);
    }
    
    /**
     * 获取颜色
     */
    getColor(type) {
        const colors = {
            info: '#00f5d4',
            success: '#00ff88',
            warning: '#ffbe0b',
            error: '#ff006e'
        };
        return colors[type] || colors.info;
    }
    
    /**
     * 获取图标
     */
    getIcon(type) {
        const icons = {
            info: 'ℹ️',
            success: '✅',
            warning: '⚠️',
            error: '❌'
        };
        return icons[type] || icons.info;
    }
}

/**
 * 加载屏幕
 */
export class LoadingScreen {
    constructor() {
        this.screen = null;
    }
    
    /**
     * 创建加载屏幕
     */
    create() {
        this.screen = document.createElement('div');
        this.screen.className = 'loading-screen';
        this.screen.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
                <div class="pulse-loader">
                    <div class="pulse-dot"></div>
                    <div class="pulse-dot"></div>
                    <div class="pulse-dot"></div>
                </div>
                <p style="color: #00f5d4; font-size: 14px; font-family: 'Orbitron', sans-serif;">
                    正在加载视觉体验...
                </p>
            </div>
        `;
        this.screen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0a0a12 0%, #1a1a2e 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            transition: opacity 0.5s ease;
        `;
        document.body.appendChild(this.screen);
    }
    
    /**
     * 显示加载
     */
    show() {
        if (!this.screen) {
            this.create();
        }
        this.screen.style.opacity = '1';
        this.screen.style.pointerEvents = 'all';
    }
    
    /**
     * 隐藏加载
     */
    hide() {
        if (this.screen) {
            this.screen.style.opacity = '0';
            setTimeout(() => {
                this.screen.style.pointerEvents = 'none';
            }, 500);
        }
    }
}

/**
 * 帮助系统
 */
export class HelpSystem {
    constructor() {
        this.topics = {
            'navigation': {
                title: '导航操作',
                content: `
                    <ul style="list-style: none; padding: 0; line-height: 2;">
                        <li>🖱️ <strong>点击导航栏</strong> - 切换不同页面</li>
                        <li>⌨️ <strong>ESC 键</strong> - 返回首页</li>
                        <li>⌨️ <strong>方向键 ← →</strong> - 在详情页切换错觉</li>
                        <li>🖱️ <strong>滚轮</strong> - 滚动页面</li>
                    </ul>
                `
            },
            'interaction': {
                title: '互动操作',
                content: `
                    <ul style="list-style: none; padding: 0; line-height: 2;">
                        <li>🖱️ <strong>点击错觉卡片</strong> - 查看详情</li>
                        <li>🖱️ <strong>点击互动按钮</strong> - 体验错觉变化</li>
                        <li>🖱️ <strong>悬停</strong> - 查看提示信息</li>
                        <li>🎨 <strong>创作模式</strong> - 设计自己的错觉</li>
                    </ul>
                `
            },
            'gamification': {
                title: '游戏系统',
                content: `
                    <ul style="list-style: none; padding: 0; line-height: 2;">
                        <li>⭐ <strong>探索错觉</strong> - 获得经验值</li>
                        <li>📚 <strong>学习模块</strong> - 解锁成就</li>
                        <li>🏆 <strong>完成挑战</strong> - 提升等级</li>
                        <li>🎯 <strong>收集成就</strong> - 证明你的实力</li>
                    </ul>
                `
            }
        };
    }
    
    /**
     * 显示帮助
     */
    show(topic) {
        const help = this.topics[topic];
        if (!help) return;
        
        const modal = document.createElement('div');
        modal.className = 'help-modal';
        modal.innerHTML = `
            <div style="
                background: rgba(10, 10, 18, 0.95);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                padding: 40px;
                max-width: 500px;
                margin: 20px;
            ">
                <h3 style="
                    color: #00f5d4;
                    font-size: 24px;
                    font-family: 'Orbitron', sans-serif;
                    margin: 0 0 20px 0;
                ">${help.title}</h3>
                <div style="color: #a0a0a0; font-size: 14px; line-height: 1.8;">
                    ${help.content}
                </div>
                <button class="illusion-btn" onclick="this.closest('.help-modal').remove()" style="
                    margin-top: 20px;
                    padding: 10px 24px;
                    float: right;
                ">
                    知道了
                </button>
            </div>
        `;
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        document.body.appendChild(modal);
    }
}

// 导出单例
const tourGuide = new TourGuide();
const toastSystem = new ToastSystem();
const loadingScreen = new LoadingScreen();
const helpSystem = new HelpSystem();

export { tourGuide, toastSystem, loadingScreen, helpSystem };
export default {
    TourGuide,
    ToastSystem,
    LoadingScreen,
    HelpSystem,
    tourGuide,
    toastSystem,
    loadingScreen,
    helpSystem
};
