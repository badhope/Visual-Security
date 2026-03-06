/**
 * 创作模式模块
 * 允许用户自定义和创建视觉错觉
 */

import { createSVGElement } from '../utils/helpers.js';

/**
 * 创作模式管理器
 */
export class CreatorMode {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.elements = [];
        this.selectedElement = null;
        this.mode = 'select'; // 'select', 'draw', 'move', 'resize'
        this.isDrawing = false;
        this.startPos = null;
        this.currentElement = null;
        
        this.tools = {
            select: this.selectTool.bind(this),
            drawCircle: this.drawCircleTool.bind(this),
            drawRect: this.drawRectTool.bind(this),
            drawLine: this.drawLineTool.bind(this),
            drawPath: this.drawPathTool.bind(this)
        };
        
        this.currentTool = 'select';
        this.properties = {
            fillColor: 'rgba(0, 245, 212, 0.3)',
            strokeColor: '#00f5d4',
            strokeWidth: 2,
            opacity: 1
        };
    }
    
    /**
     * 初始化创作模式
     */
    init(container) {
        this.container = container;
        this.setupCanvas();
        this.setupToolbar();
        this.setupEventListeners();
        this.setupPropertyPanel();
    }
    
    /**
     * 设置画布
     */
    setupCanvas() {
        this.canvas = createSVGElement('svg', {
            class: 'creator-canvas-svg',
            viewBox: '0 0 800 600',
            width: '100%',
            height: '100%'
        });
        
        // 添加网格背景
        const grid = this.createGrid();
        this.canvas.appendChild(grid);
        
        const canvasContainer = this.container.querySelector('.creator-canvas');
        if (canvasContainer) {
            canvasContainer.appendChild(this.canvas);
        }
    }
    
    /**
     * 创建网格
     */
    createGrid() {
        const grid = createSVGElement('g', { class: 'grid' });
        const gridSize = 20;
        const width = 800;
        const height = 600;
        
        for (let x = 0; x <= width; x += gridSize) {
            const line = createSVGElement('line', {
                x1: x,
                y1: 0,
                x2: x,
                y2: height,
                stroke: 'rgba(255, 255, 255, 0.05)',
                'stroke-width': '1'
            });
            grid.appendChild(line);
        }
        
        for (let y = 0; y <= height; y += gridSize) {
            const line = createSVGElement('line', {
                x1: 0,
                y1: y,
                x2: width,
                y2: y,
                stroke: 'rgba(255, 255, 255, 0.05)',
                'stroke-width': '1'
            });
            grid.appendChild(line);
        }
        
        return grid;
    }
    
    /**
     * 设置工具栏
     */
    setupToolbar() {
        const toolbar = this.container.querySelector('.creator-toolbar');
        if (!toolbar) return;
        
        const tools = [
            { id: 'select', icon: 'fa-cursor', label: '选择' },
            { id: 'drawCircle', icon: 'fa-circle', label: '圆形' },
            { id: 'drawRect', icon: 'fa-square', label: '矩形' },
            { id: 'drawLine', icon: 'fa-slash', label: '直线' },
            { id: 'drawPath', icon: 'fa-pen', label: '路径' }
        ];
        
        toolbar.innerHTML = '';
        tools.forEach(tool => {
            const button = document.createElement('button');
            button.className = 'illusion-btn tool-btn';
            button.innerHTML = `<i class="fas ${tool.icon}"></i> ${tool.label}`;
            button.onclick = () => this.setTool(tool.id);
            toolbar.appendChild(button);
        });
        
        // 添加导出按钮
        const exportBtn = document.createElement('button');
        exportBtn.className = 'illusion-btn';
        exportBtn.innerHTML = '<i class="fas fa-download"></i> 导出';
        exportBtn.onclick = () => this.export();
        toolbar.appendChild(exportBtn);
        
        // 添加清空按钮
        const clearBtn = document.createElement('button');
        clearBtn.className = 'illusion-btn';
        clearBtn.innerHTML = '<i class="fas fa-trash"></i> 清空';
        clearBtn.onclick = () => this.clear();
        toolbar.appendChild(clearBtn);
    }
    
    /**
     * 设置属性面板
     */
    setupPropertyPanel() {
        const controls = this.container.querySelector('.creator-controls');
        if (!controls) return;
        
        controls.innerHTML = `
            <div class="creator-control-group">
                <label>填充颜色</label>
                <input type="color" id="fillColor" value="#00f5d4">
            </div>
            <div class="creator-control-group">
                <label>描边颜色</label>
                <input type="color" id="strokeColor" value="#00f5d4">
            </div>
            <div class="creator-control-group">
                <label>描边宽度</label>
                <input type="range" id="strokeWidth" min="0" max="20" value="2">
            </div>
            <div class="creator-control-group">
                <label>不透明度</label>
                <input type="range" id="opacity" min="0" max="1" step="0.1" value="1">
            </div>
        `;
        
        // 绑定事件
        document.getElementById('fillColor').addEventListener('input', (e) => {
            this.properties.fillColor = e.target.value;
            this.updateSelectedElement();
        });
        
        document.getElementById('strokeColor').addEventListener('input', (e) => {
            this.properties.strokeColor = e.target.value;
            this.updateSelectedElement();
        });
        
        document.getElementById('strokeWidth').addEventListener('input', (e) => {
            this.properties.strokeWidth = parseInt(e.target.value);
            this.updateSelectedElement();
        });
        
        document.getElementById('opacity').addEventListener('input', (e) => {
            this.properties.opacity = parseFloat(e.target.value);
            this.updateSelectedElement();
        });
    }
    
    /**
     * 设置当前工具
     */
    setTool(toolId) {
        this.currentTool = toolId;
        
        // 更新工具栏 UI
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.closest('.tool-btn')?.classList.add('active');
    }
    
    /**
     * 设置事件监听
     */
    setupEventListeners() {
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('dblclick', this.handleDoubleClick.bind(this));
    }
    
    /**
     * 鼠标按下处理
     */
    handleMouseDown(e) {
        const pos = this.getMousePosition(e);
        
        if (this.currentTool === 'select') {
            this.selectElement(pos);
        } else {
            this.isDrawing = true;
            this.startPos = pos;
            
            if (this.currentTool === 'drawPath') {
                this.currentElement = createSVGElement('path', {
                    d: `M ${pos.x} ${pos.y}`,
                    fill: 'none',
                    stroke: this.properties.strokeColor,
                    'stroke-width': this.properties.strokeWidth,
                    opacity: this.properties.opacity
                });
            } else {
                this.currentElement = this.createElement(this.currentTool, pos);
            }
            
            if (this.currentElement) {
                this.canvas.appendChild(this.currentElement);
            }
        }
    }
    
    /**
     * 鼠标移动处理
     */
    handleMouseMove(e) {
        if (!this.isDrawing || !this.currentElement) return;
        
        const pos = this.getMousePosition(e);
        
        if (this.currentTool === 'drawCircle') {
            const radius = Math.sqrt(
                Math.pow(pos.x - this.startPos.x, 2) +
                Math.pow(pos.y - this.startPos.y, 2)
            );
            this.currentElement.setAttribute('r', radius);
        } else if (this.currentTool === 'drawRect') {
            this.currentElement.setAttribute('width', Math.abs(pos.x - this.startPos.x));
            this.currentElement.setAttribute('height', Math.abs(pos.y - this.startPos.y));
            this.currentElement.setAttribute('x', pos.x < this.startPos.x ? pos.x : this.startPos.x);
            this.currentElement.setAttribute('y', pos.y < this.startPos.y ? pos.y : this.startPos.y);
        } else if (this.currentTool === 'drawLine') {
            this.currentElement.setAttribute('x2', pos.x);
            this.currentElement.setAttribute('y2', pos.y);
        } else if (this.currentTool === 'drawPath') {
            const d = this.currentElement.getAttribute('d');
            this.currentElement.setAttribute('d', `${d} L ${pos.x} ${pos.y}`);
        }
    }
    
    /**
     * 鼠标松开处理
     */
    handleMouseUp(e) {
        this.isDrawing = false;
        this.currentElement = null;
    }
    
    /**
     * 双击处理
     */
    handleDoubleClick(e) {
        if (this.currentTool === 'drawPath' && this.currentElement) {
            this.currentElement = null;
        }
    }
    
    /**
     * 获取鼠标位置
     */
    getMousePosition(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.viewBox.baseVal.width / rect.width;
        const scaleY = this.canvas.viewBox.baseVal.height / rect.height;
        
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }
    
    /**
     * 创建元素
     */
    createElement(tool, pos) {
        const attrs = {
            fill: this.properties.fillColor,
            stroke: this.properties.strokeColor,
            'stroke-width': this.properties.strokeWidth,
            opacity: this.properties.opacity
        };
        
        switch (tool) {
            case 'drawCircle':
                return createSVGElement('circle', {
                    cx: pos.x,
                    cy: pos.y,
                    r: 0,
                    ...attrs
                });
            case 'drawRect':
                return createSVGElement('rect', {
                    x: pos.x,
                    y: pos.y,
                    width: 0,
                    height: 0,
                    ...attrs
                });
            case 'drawLine':
                return createSVGElement('line', {
                    x1: pos.x,
                    y1: pos.y,
                    x2: pos.x,
                    y2: pos.y,
                    stroke: this.properties.strokeColor,
                    'stroke-width': this.properties.strokeWidth,
                    opacity: this.properties.opacity
                });
            default:
                return null;
        }
    }
    
    /**
     * 选择元素
     */
    selectElement(pos) {
        // 简单的碰撞检测
        const elements = Array.from(this.canvas.children).filter(
            el => el.tagName !== 'g' && el.classList.contains('grid') === false
        );
        
        for (let element of elements) {
            if (this.isPointInElement(pos, element)) {
                this.selectedElement = element;
                element.classList.add('selected');
                return;
            }
        }
        
        // 取消选择
        if (this.selectedElement) {
            this.selectedElement.classList.remove('selected');
            this.selectedElement = null;
        }
    }
    
    /**
     * 检测点是否在元素内
     */
    isPointInElement(pos, element) {
        // 简化的碰撞检测
        return true;
    }
    
    /**
     * 更新选中元素
     */
    updateSelectedElement() {
        if (!this.selectedElement) return;
        
        const tagName = this.selectedElement.tagName;
        
        if (tagName === 'circle' || tagName === 'rect' || tagName === 'line') {
            this.selectedElement.setAttribute('fill', this.properties.fillColor);
            this.selectedElement.setAttribute('stroke', this.properties.strokeColor);
            this.selectedElement.setAttribute('stroke-width', this.properties.strokeWidth);
            this.selectedElement.setAttribute('opacity', this.properties.opacity);
        }
    }
    
    /**
     * 清空画布
     */
    clear() {
        this.elements = [];
        const children = Array.from(this.canvas.children);
        children.forEach(child => {
            if (!child.classList.contains('grid')) {
                this.canvas.removeChild(child);
            }
        });
    }
    
    /**
     * 导出作品
     */
    export() {
        const svgData = new XMLSerializer().serializeToString(this.canvas);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `illusion-${Date.now()}.svg`;
        link.click();
        
        URL.revokeObjectURL(url);
    }
}

/**
 * 分享系统
 */
export class ShareSystem {
    constructor() {
        this.modal = null;
        this.currentContent = null;
    }
    
    /**
     * 初始化分享系统
     */
    init() {
        this.createModal();
    }
    
    /**
     * 创建分享弹窗
     */
    createModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'share-modal';
        this.modal.innerHTML = `
            <div class="share-content">
                <h3 class="share-title">分享你的发现</h3>
                <div class="share-options">
                    <div class="share-option" data-platform="wechat">
                        <div class="icon"><i class="fab fa-weixin"></i></div>
                        <div class="label">微信</div>
                    </div>
                    <div class="share-option" data-platform="weibo">
                        <div class="icon"><i class="fab fa-weibo"></i></div>
                        <div class="label">微博</div>
                    </div>
                    <div class="share-option" data-platform="qq">
                        <div class="icon"><i class="fab fa-qq"></i></div>
                        <div class="label">QQ</div>
                    </div>
                    <div class="share-option" data-platform="copy">
                        <div class="icon"><i class="fas fa-link"></i></div>
                        <div class="label">复制链接</div>
                    </div>
                    <div class="share-option" data-platform="screenshot">
                        <div class="icon"><i class="fas fa-camera"></i></div>
                        <div class="label">截图</div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.modal);
        
        // 绑定事件
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
            
            const option = e.target.closest('.share-option');
            if (option) {
                const platform = option.dataset.platform;
                this.share(platform);
            }
        });
    }
    
    /**
     * 打开分享
     */
    open(content) {
        this.currentContent = content;
        this.modal.classList.add('active');
    }
    
    /**
     * 关闭分享
     */
    close() {
        this.modal.classList.remove('active');
        this.currentContent = null;
    }
    
    /**
     * 执行分享
     */
    share(platform) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent('视觉欺骗艺术馆 - 探索人类感知边界');
        const desc = encodeURIComponent('我发现了一个超有趣的视觉错觉！快来一起探索人类感知的边界吧~');
        
        switch (platform) {
            case 'wechat':
                // 微信需要用户手动分享
                alert('请长按右上角，选择"发送给朋友"或"分享到朋友圈"');
                break;
            case 'weibo':
                window.open(`http://service.weibo.com/share/share.php?url=${url}&title=${title} ${desc}`);
                break;
            case 'qq':
                window.open(`http://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&summary=${desc}`);
                break;
            case 'copy':
                navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('链接已复制到剪贴板！');
                });
                break;
            case 'screenshot':
                this.takeScreenshot();
                break;
        }
    }
    
    /**
     * 截图功能
     */
    async takeScreenshot() {
        try {
            // 这里可以使用 html2canvas 库
            // 如果没有安装，提示用户
            if (typeof html2canvas === 'undefined') {
                alert('截图功能需要安装 html2canvas 库。请手动截图 (Windows: Win+Shift+S, Mac: Cmd+Shift+4)');
                return;
            }
            
            const canvas = await html2canvas(document.querySelector('.illusion-detail'));
            canvas.toBlob(blob => {
                const item = new ClipboardItem({ 'image/png': blob });
                navigator.clipboard.write([item]).then(() => {
                    alert('截图已复制到剪贴板！');
                });
            });
        } catch (e) {
            console.error('Screenshot failed:', e);
            alert('截图失败，请手动截图');
        }
    }
}

// 导出单例
const creatorMode = new CreatorMode();
const shareSystem = new ShareSystem();

export { creatorMode, shareSystem };
export default {
    CreatorMode,
    ShareSystem,
    creatorMode,
    shareSystem
};
