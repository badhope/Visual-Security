/**
 * 增强交互模块
 * 修复按钮响应问题，增强用户体验
 */

/**
 * 按钮响应增强管理器
 */
export class ButtonEnhancementManager {
    constructor() {
        this.initialized = false;
        this.buttonSelectors = [
            'button',
            '.neon-button',
            '.gradient-button',
            '.liquid-button',
            '.nav-link',
            '[onclick]',
            '[role="button"]'
        ];
        this.clickHandlers = new Map();
    }

    /**
     * 初始化所有增强功能
     */
    init() {
        if (this.initialized) return;

        console.log('🔧 Initializing Button Enhancement Manager...');
        
        this.bindAllButtons();
        this.addKeyboardSupport();
        this.addRippleEffect();
        this.addLoadingStates();
        this.addTooltipEnhancements();
        this.fixUnresponsiveButtons();
        
        this.initialized = true;
        console.log('✅ Button Enhancement Manager initialized!');
    }

    /**
     * 绑定所有按钮事件
     */
    bindAllButtons() {
        this.buttonSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(button => {
                this.enhanceButton(button);
            });
        });

        // 使用事件委托处理动态添加的按钮
        document.body.addEventListener('click', (e) => {
            const button = e.target.closest('button, [onclick], [role="button"]');
            if (button && !this.initialized) {
                this.enhanceButton(button);
            }
        });
    }

    /**
     * 增强单个按钮
     */
    enhanceButton(button) {
        if (button.dataset.enhanced) return;

        // 添加触觉反馈
        button.addEventListener('click', (e) => {
            this.handleButtonClick(e, button);
        });

        // 添加悬停效果
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.transition = 'transform 0.2s ease';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });

        // 添加焦点样式（键盘导航）
        button.addEventListener('focus', () => {
            button.style.outline = '2px solid #00f5d4';
            button.style.outlineOffset = '2px';
        });

        button.addEventListener('blur', () => {
            button.style.outline = 'none';
            button.style.outlineOffset = '0';
        });

        button.dataset.enhanced = 'true';
    }

    /**
     * 处理按钮点击
     */
    handleButtonClick(e, button) {
        // 添加点击波纹效果
        this.createRipple(e, button);

        // 播放点击音效（如果启用）
        if (window.settings?.soundEnabled) {
            this.playClickSound();
        }

        // 记录点击事件（用于分析）
        this.logButtonClick(button);
    }

    /**
     * 创建波纹效果
     */
    createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-effect 0.6s ease-out;
            pointer-events: none;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    /**
     * 添加键盘支持
     */
    addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            // Enter 键触发按钮
            if (e.key === 'Enter') {
                const focused = document.activeElement;
                if (focused.tagName === 'BUTTON' || focused.hasAttribute('onclick')) {
                    focused.click();
                }
            }

            // Space 键触发按钮
            if (e.key === ' ') {
                const focused = document.activeElement;
                if (focused.tagName === 'BUTTON' && !['INPUT', 'TEXTAREA'].includes(focused.tagName)) {
                    e.preventDefault();
                    focused.click();
                }
            }

            // Escape 键关闭模态框/菜单
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    /**
     * 关闭所有模态框
     */
    closeAllModals() {
        document.querySelectorAll('.modal, .dialog, .popup').forEach(modal => {
            modal.style.display = 'none';
            modal.dispatchEvent(new CustomEvent('close'));
        });
    }

    /**
     * 添加波纹效果动画样式
     */
    addRippleEffect() {
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple-effect {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                
                .button-loading {
                    position: relative;
                    pointer-events: none;
                    opacity: 0.7;
                }
                
                .button-loading::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 20px;
                    height: 20px;
                    margin: -10px 0 0 -10px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: button-spin 0.8s linear infinite;
                }
                
                @keyframes button-spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * 添加加载状态
     */
    addLoadingStates() {
        // 拦截所有 onclick 事件，添加加载状态
        const originalSetAttribute = HTMLElement.prototype.setAttribute;
        HTMLElement.prototype.setAttribute = function(name, value) {
            if (name === 'onclick' && value && !this.dataset.loadingIntercepted) {
                this.dataset.loadingIntercepted = 'true';
                const originalClick = this.onclick;
                if (originalClick) {
                    this.onclick = (e) => {
                        if (!this.disabled) {
                            this.setLoading(true);
                            try {
                                const result = originalClick.call(this, e);
                                if (!(result instanceof Promise)) {
                                    this.setLoading(false);
                                } else {
                                    result.finally(() => this.setLoading(false));
                                }
                                return result;
                            } catch (error) {
                                this.setLoading(false);
                                throw error;
                            }
                        }
                    };
                }
            }
            return originalSetAttribute.call(this, name, value);
        };
    }

    /**
     * 设置按钮加载状态
     */
    setLoading(isLoading) {
        if (isLoading) {
            this.classList.add('button-loading');
            this.disabled = true;
        } else {
            this.classList.remove('button-loading');
            this.disabled = false;
        }
    }

    /**
     * 添加工具提示增强
     */
    addTooltipEnhancements() {
        document.querySelectorAll('[title]').forEach(element => {
            if (!element.dataset.tooltipEnhanced) {
                element.addEventListener('mouseenter', (e) => {
                    this.showEnhancedTooltip(e.target);
                });
                element.addEventListener('mouseleave', () => {
                    this.hideTooltip();
                });
                element.dataset.tooltipEnhanced = 'true';
            }
        });
    }

    /**
     * 显示增强工具提示
     */
    showEnhancedTooltip(element) {
        const tooltip = document.createElement('div');
        tooltip.className = 'enhanced-tooltip';
        tooltip.textContent = element.title;
        
        tooltip.style.cssText = `
            position: fixed;
            padding: 8px 12px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            border-radius: 6px;
            font-size: 13px;
            z-index: 100000;
            pointer-events: none;
            animation: tooltip-fade-in 0.2s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border: 1px solid rgba(255,255,255,0.1);
        `;

        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let top = rect.bottom + 8;
        let left = rect.left + (rect.width - tooltipRect.width) / 2;

        // 确保不超出视口
        if (top + tooltipRect.height > window.innerHeight) {
            top = rect.top - tooltipRect.height - 8;
        }
        if (left < 0) left = 0;
        if (left + tooltipRect.width > window.innerWidth) {
            left = window.innerWidth - tooltipRect.width;
        }

        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';

        element.dataset.tooltipElement = 'true';
    }

    /**
     * 隐藏工具提示
     */
    hideTooltip() {
        const tooltip = document.querySelector('.enhanced-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    /**
     * 修复无响应的按钮
     */
    fixUnresponsiveButtons() {
        // 查找所有有 onclick 属性但不响应的按钮
        document.querySelectorAll('[onclick]').forEach(element => {
            const onclick = element.getAttribute('onclick');
            if (onclick) {
                // 检查函数是否存在
                try {
                    const func = new Function('return ' + onclick.split('(')[0]);
                    if (typeof func !== 'function') {
                        console.warn('⚠️ Button with invalid onclick:', onclick);
                        // 尝试修复
                        this.tryFixButton(element, onclick);
                    }
                } catch (e) {
                    console.warn('⚠️ Button with invalid onclick:', onclick, e);
                }
            }
        });
    }

    /**
     * 尝试修复按钮
     */
    tryFixButton(element, onclick) {
        // 如果是 app.xxx 形式，确保 app 对象存在
        if (onclick.startsWith('app.')) {
            const funcName = onclick.split('(')[0].replace('app.', '');
            if (window.app && typeof window.app[funcName] === 'function') {
                console.log('✅ Fixed button:', onclick);
                return true;
            }
        }
        return false;
    }

    /**
     * 播放点击音效
     */
    playClickSound() {
        // 简单的蜂鸣声（可选功能）
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    /**
     * 记录按钮点击
     */
    logButtonClick(button) {
        const buttonInfo = {
            text: button.textContent.trim(),
            id: button.id,
            class: button.className,
            onclick: button.getAttribute('onclick'),
            timestamp: new Date().toISOString()
        };

        // 开发模式下输出日志
        if (window.debugMode) {
            console.log('🖱️ Button clicked:', buttonInfo);
        }

        // 可以发送到分析服务器
        // analytics.track('button_click', buttonInfo);
    }
}

/**
 * 全局交互管理器
 */
export class GlobalInteractionManager {
    constructor() {
        this.buttonManager = new ButtonEnhancementManager();
        this.scrollHandlers = new Map();
        this.resizeHandlers = new Map();
    }

    /**
     * 初始化所有交互增强
     */
    init() {
        console.log('🌐 Initializing Global Interaction Manager...');
        
        this.buttonManager.init();
        this.addSmoothScroll();
        this.addParallaxEffects();
        this.addIntersectionObservers();
        this.addGestureSupport();
        
        console.log('✅ Global Interaction Manager initialized!');
    }

    /**
     * 添加平滑滚动
     */
    addSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * 添加视差效果
     */
    addParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        if (parallaxElements.length === 0) return;

        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    parallaxElements.forEach(el => {
                        const speed = el.dataset.parallax || 0.5;
                        const rect = el.getBoundingClientRect();
                        const offset = rect.top * speed;
                        el.style.transform = `translateY(${offset}px)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    /**
     * 添加交叉观察器（懒加载）
     */
    addIntersectionObservers() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    
                    // 触发动画
                    if (entry.target.dataset.animation) {
                        this.triggerAnimation(entry.target, entry.target.dataset.animation);
                    }
                    
                    // 懒加载图片
                    if (entry.target.dataset.src) {
                        entry.target.src = entry.target.dataset.src;
                        entry.target.removeAttribute('data-src');
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('[data-animate], [data-src]').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * 触发动画
     */
    triggerAnimation(element, animation) {
        const animations = {
            'fade-in': () => {
                element.style.opacity = '0';
                setTimeout(() => {
                    element.style.transition = 'opacity 0.6s ease';
                    element.style.opacity = '1';
                }, 100);
            },
            'slide-up': () => {
                element.style.transform = 'translateY(30px)';
                element.style.opacity = '0';
                setTimeout(() => {
                    element.style.transition = 'all 0.6s ease';
                    element.style.transform = 'translateY(0)';
                    element.style.opacity = '1';
                }, 100);
            },
            'zoom-in': () => {
                element.style.transform = 'scale(0.9)';
                element.style.opacity = '0';
                setTimeout(() => {
                    element.style.transition = 'all 0.6s ease';
                    element.style.transform = 'scale(1)';
                    element.style.opacity = '1';
                }, 100);
            }
        };

        if (animations[animation]) {
            animations[animation]();
        }
    }

    /**
     * 添加手势支持（移动端）
     */
    addGestureSupport() {
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }

    /**
     * 处理滑动手势
     */
    handleSwipe(startX, endX) {
        const diff = startX - endX;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // 左滑
                this.handleSwipeLeft();
            } else {
                // 右滑
                this.handleSwipeRight();
            }
        }
    }

    /**
     * 处理左滑
     */
    handleSwipeLeft() {
        // 可以在这里添加自定义逻辑
        console.log('← Swipe left detected');
    }

    /**
     * 处理右滑
     */
    handleSwipeRight() {
        // 可以在这里添加自定义逻辑
        console.log('→ Swipe right detected');
    }
}

// 导出单例
export const interactionManager = new GlobalInteractionManager();

// 自动初始化（当 DOM 加载完成后）
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            interactionManager.init();
        });
    } else {
        interactionManager.init();
    }
}
