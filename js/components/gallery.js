/**
 * 图库组件模块
 * 负责渲染和管理图库显示
 */

import { illusions } from '../data/illusions.js';

/**
 * 图库管理器类
 */
class GalleryManager {
    constructor() {
        this.container = null;
    }
    
    /**
     * 初始化图库
     */
    init() {
        this.container = document.getElementById('gallery-grid');
        if (this.container) {
            this.render();
        }
    }
    
    /**
     * 渲染图库
     */
    render() {
        if (!this.container) return;
        
        this.container.innerHTML = illusions.map((illusion, index) => `
            <div class="glass-card rounded-3xl p-6 illusion-card cursor-pointer" 
                 data-index="${index}" 
                 data-category="${illusion.category.join(' ')}"
                 onclick="window.gallery.showIllusionDetail(${index})">
                <div class="h-48 flex items-center justify-center mb-4">
                    <div class="mini-preview" data-id="${illusion.id}"></div>
                </div>
                <h3 class="font-display text-xl font-bold mb-2">${illusion.name}</h3>
                <p class="text-gray-400 text-sm mb-4 line-clamp-2">${illusion.principle.substring(0, 80)}...</p>
                <div class="flex items-center justify-between">
                    <div class="flex gap-1">
                        ${this.renderStars(illusion.rating)}
                    </div>
                    <span class="text-neon-cyan text-sm">探索 <i class="fas fa-arrow-right ml-1"></i></span>
                </div>
            </div>
        `).join('');
        
        // 渲染迷你预览
        this.renderMiniPreviews();
    }
    
    /**
     * 渲染星星评分
     * @param {number} rating - 评分
     * @returns {string} HTML 字符串
     */
    renderStars(rating) {
        return Array(5).fill(0).map((_, i) => 
            `<i class="fas fa-star text-sm ${i < rating ? 'text-neon-yellow' : 'text-gray-600'}"></i>`
        ).join('');
    }
    
    /**
     * 渲染迷你预览
     */
    renderMiniPreviews() {
        document.querySelectorAll('.mini-preview').forEach(preview => {
            const id = preview.dataset.id;
            const styles = this.getMiniPreviewStyle(id);
            preview.style.cssText = styles;
            
            // 为某些错觉添加额外元素
            this.addMiniPreviewElements(preview, id);
        });
    }
    
    /**
     * 获取迷你预览样式
     * @param {string} id - 错觉 ID
     * @returns {string} CSS 样式字符串
     */
    getMiniPreviewStyle(id) {
        const styles = {
            'penrose-triangle': 'width: 80px; height: 80px; border: 3px solid #00f5d4; border-radius: 0; clip-path: polygon(50% 0%, 0% 100%, 100% 100%);',
            'necker-cube': 'width: 70px; height: 70px; border: 2px solid #00f5d4; transform: rotate(45deg);',
            'hermann-grid': 'display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; width: 70px; height: 70px;',
            'muller-lyer': 'width: 80px; height: 4px; background: #fff; position: relative;',
            'rotating-snakes': 'width: 80px; height: 80px; border-radius: 50%; background: conic-gradient(from 0deg, #000, #8338ec, #fff, #ff006e, #000); animation: snakeRotate 20s linear infinite;',
            'kanizsa-triangle': 'width: 0; height: 0; border-left: 40px solid transparent; border-right: 40px solid transparent; border-bottom: 70px solid rgba(255,255,255,0.3);',
            'ebbinghaus': 'width: 40px; height: 40px; border-radius: 50%; background: #00f5d4; box-shadow: 0 0 0 12px rgba(255,0,110,0.3);',
            'cafe-wall': 'display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px; width: 70px; height: 56px;',
            'penrose-stairs': 'width: 70px; height: 70px; background: linear-gradient(135deg, #00f5d4 25%, transparent 25%); background-size: 14px 14px;',
            'cube-3d': 'width: 60px; height: 60px; border: 2px solid #00f5d4; transform: rotateX(45deg) rotateY(45deg);',
            'delboeuf': 'width: 35px; height: 35px; border-radius: 50%; background: #00f5d4; border: 4px solid #ff006e;',
            'zollner': 'width: 70px; height: 70px; background: repeating-linear-gradient(45deg, transparent, transparent 7px, #00f5d4 7px, #00f5d4 10px);',
            'poggendorff': 'width: 60px; height: 4px; background: #00f5d4; transform: rotate(-20deg);',
            'mobius': 'width: 80px; height: 30px; border: 4px solid #8338ec; border-radius: 50%;',
            'sargent': 'width: 70px; height: 50px; background: repeating-linear-gradient(90deg, #1a1a2e, #1a1a2e 7px, #3a3a4e 7px, #3a3a4e 14px);'
        };
        
        return styles[id] || 'width: 60px; height: 60px; background: linear-gradient(135deg, #00f5d4, #8338ec); border-radius: 12px;';
    }
    
    /**
     * 为迷你预览添加额外元素
     * @param {HTMLElement} preview - 预览元素
     * @param {string} id - 错觉 ID
     */
    addMiniPreviewElements(preview, id) {
        if (id === 'hermann-grid') {
            for (let i = 0; i < 16; i++) {
                const cell = document.createElement('div');
                cell.style.cssText = 'width: 14px; height: 14px; background: #fff;';
                preview.appendChild(cell);
            }
        } else if (id === 'cafe-wall') {
            for (let i = 0; i < 10; i++) {
                const tile = document.createElement('div');
                tile.style.cssText = `width: 12px; height: 10px; background: ${i % 2 === 0 ? '#1a1a2e' : '#e0e0e0'};`;
                preview.appendChild(tile);
            }
        }
    }
    
    /**
     * 显示错觉详情
     * @param {number} index - 错觉索引
     */
    showIllusionDetail(index) {
        if (window.router) {
            window.router.showIllusionDetail(index);
        }
    }
    
    /**
     * 刷新图库
     */
    refresh() {
        this.render();
    }
}

// 创建并导出图库管理器实例
export const gallery = new GalleryManager();
export default gallery;
