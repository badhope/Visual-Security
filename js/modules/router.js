/**
 * 路由和导航模块
 * 管理页面切换和导航状态
 */

import { illusions } from '../data/illusions.js';

/**
 * 路由管理器类
 */
class Router {
    constructor() {
        this.currentPage = 'home';
        this.exploredIllusions = new Set();
        this.currentIllusionIndex = 0;
    }
    
    /**
     * 初始化路由
     */
    init() {
        this.setupNavigation();
        this.updateExploredCount();
        this.updateTotalCount();
    }
    
    /**
     * 设置导航事件
     */
    setupNavigation() {
        // 导航链接点击事件
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const pageName = e.target.dataset.page;
                if (pageName) {
                    this.navigateTo(pageName);
                }
            });
        });
        
        // 移动端菜单切换
        const mobileMenuBtn = document.querySelector('button[onclick*="toggleMobileMenu"]');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                    mobileMenu.classList.toggle('hidden');
                }
            });
        }
        
        // 分类筛选按钮
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.closest('.category-btn').dataset.category;
                this.filterGallery(category);
            });
        });
        
        // 学习模块导航
        document.querySelectorAll('.learn-nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const module = e.target.closest('.learn-nav-btn').dataset.module;
                if (module) {
                    this.switchLearningModule(module);
                }
            });
        });
    }
    
    /**
     * 导航到指定页面
     * @param {string} pageName - 页面名称
     */
    navigateTo(pageName) {
        // 更新导航链接状态
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageName) {
                link.classList.add('active');
            }
        });
        
        // 切换页面
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        const targetPage = document.getElementById(`page-${pageName}`);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // 更新当前页面
        this.currentPage = pageName;
        
        // 隐藏移动端菜单
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
    
    /**
     * 显示错觉详情
     * @param {number} index - 错觉索引
     */
    showIllusionDetail(index) {
        this.currentIllusionIndex = index;
        const illusion = illusions[index];
        
        // 标记为已探索
        this.exploredIllusions.add(index);
        this.updateExploredCount();
        
        // 生成详情页面内容
        const detailPage = document.getElementById('page-detail');
        if (!detailPage) return;
        
        detailPage.innerHTML = this.generateDetailHTML(illusion, index);
        
        // 渲染错觉图形
        this.renderIllusionDetail(illusion, index);
        
        // 导航到详情页
        this.navigateTo('detail');
    }
    
    /**
     * 生成详情页 HTML
     * @param {Object} illusion - 错觉对象
     * @param {number} index - 索引
     * @returns {string} HTML 字符串
     */
    generateDetailHTML(illusion, index) {
        const relatedIllusions = this.getRelatedIllusions(index);
        
        return `
            <div class="mb-6">
                <button onclick="window.router.navigateTo('gallery')" class="text-gray-400 hover:text-white transition-colors">
                    <i class="fas fa-arrow-left mr-2"></i>返回图库
                </button>
            </div>
            
            <div class="grid lg:grid-cols-2 gap-8">
                <!-- 图形展示区 -->
                <div class="glass-card rounded-3xl p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-purple/5"></div>
                    <div id="illusion-container" class="perspective-container relative z-10 flex items-center justify-center">
                        <!-- 动态内容将在这里渲染 -->
                    </div>
                    <h2 class="font-display text-2xl font-bold mt-6 text-center relative z-10">${illusion.name}</h2>
                </div>
                
                <!-- 信息面板 -->
                <div class="space-y-6">
                    <!-- 基本信息卡片 -->
                    <div class="info-card">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center">
                                <i class="fas fa-info-circle text-neon-cyan"></i>
                            </div>
                            <h3 class="font-display font-bold text-lg">基本信息</h3>
                        </div>
                        <div class="space-y-3">
                            <div class="flex items-start gap-3">
                                <span class="text-gray-500 w-24 shrink-0">发现者</span>
                                <span class="text-gray-300">${illusion.discoverer}</span>
                            </div>
                            <div class="flex items-start gap-3">
                                <span class="text-gray-500 w-24 shrink-0">类型</span>
                                <div class="flex flex-wrap">
                                    ${illusion.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                </div>
                            </div>
                            <div class="flex items-start gap-3">
                                <span class="text-gray-500 w-24 shrink-0">趣味度</span>
                                <div class="flex gap-1">
                                    ${Array(5).fill(0).map((_, i) => 
                                        `<i class="fas fa-star ${i < illusion.rating ? 'text-neon-yellow' : 'text-gray-600'}"></i>`
                                    ).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 原理说明 -->
                    <div class="info-card">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-pink/20 to-neon-yellow/20 flex items-center justify-center">
                                <i class="fas fa-lightbulb text-neon-pink"></i>
                            </div>
                            <h3 class="font-display font-bold text-lg">原理解析</h3>
                        </div>
                        <p class="text-gray-300 leading-relaxed">${illusion.principle}</p>
                    </div>
                    
                    <!-- 数学原理 -->
                    <div class="info-card">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 flex items-center justify-center">
                                <i class="fas fa-calculator text-neon-purple"></i>
                            </div>
                            <h3 class="font-display font-bold text-lg">数学原理</h3>
                        </div>
                        <p class="text-gray-300 leading-relaxed">${illusion.mathPrinciple}</p>
                    </div>
                    
                    <!-- 物理学解释 -->
                    <div class="info-card">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-pink/20 flex items-center justify-center">
                                <i class="fas fa-atom text-neon-cyan"></i>
                            </div>
                            <h3 class="font-display font-bold text-lg">物理学解释</h3>
                        </div>
                        <p class="text-gray-300 leading-relaxed">${illusion.physicsPrinciple}</p>
                    </div>
                    
                    <!-- 互动提示 -->
                    <div class="info-card bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10">
                        <div class="flex items-center gap-3 mb-3">
                            <i class="fas fa-magic text-neon-cyan"></i>
                            <h3 class="font-display font-bold">互动提示</h3>
                        </div>
                        <p class="text-gray-300 text-sm">${illusion.hint}</p>
                    </div>
                </div>
            </div>
            
            <!-- 相关错觉推荐 -->
            <div class="mt-12">
                <h3 class="font-display text-xl font-bold mb-6">
                    <i class="fas fa-layer-group mr-2 text-neon-cyan"></i>
                    相关错觉推荐
                </h3>
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    ${relatedIllusions.map(relIllusion => `
                        <div class="glass-card rounded-2xl p-4 cursor-pointer hover:border-neon-cyan/50 transition-all" onclick="window.router.showIllusionDetail(${relIllusion.index})">
                            <div class="h-24 flex items-center justify-center mb-3">
                                <div class="mini-preview" data-id="${relIllusion.id}"></div>
                            </div>
                            <h4 class="font-display text-sm font-bold text-center">${relIllusion.name}</h4>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    /**
     * 渲染错觉详情
     * @param {Object} illusion - 错觉对象
     * @param {number} index - 索引
     */
    renderIllusionDetail(illusion, index) {
        const container = document.getElementById('illusion-container');
        if (!container) return;
        
        // 根据错觉 ID 调用对应的渲染函数
        const renderFunctions = {
            'penrose-triangle': () => window.renderer.renderPenroseTriangle(container),
            'necker-cube': () => window.renderer.renderNeckerCube(container),
            'hermann-grid': () => window.renderer.renderHermannGrid(container),
            'muller-lyer': () => window.renderer.renderMullerLyer(container),
            'rotating-snakes': () => window.renderer.renderRotatingSnakes(container),
            'kanizsa-triangle': () => window.renderer.renderKanizsaTriangle(container),
            'ebbinghaus': () => window.renderer.renderEbbinghaus(container),
            'cafe-wall': () => window.renderer.renderCafeWall(container),
            'penrose-stairs': () => window.renderer.renderPenroseStairs(container),
            'cube-3d': () => window.renderer.renderCube3D(container),
            'delboeuf': () => window.renderer.renderDelboeuf(container),
            'zollner': () => window.renderer.renderZollner(container),
            'poggendorff': () => window.renderer.renderPoggendorff(container),
            'mobius': () => window.renderer.renderMobius(container),
            'sargent': () => window.renderer.renderSargent(container)
        };
        
        const renderFn = renderFunctions[illusion.id];
        if (renderFn) {
            renderFn();
        }
    }
    
    /**
     * 获取相关错觉
     * @param {number} currentIndex - 当前索引
     * @returns {Array} 相关错觉数组
     */
    getRelatedIllusions(currentIndex) {
        const currentIllusion = illusions[currentIndex];
        const related = [];
        
        // 找到有相同分类的错觉
        illusions.forEach((illusion, index) => {
            if (index !== currentIndex) {
                const hasCommonCategory = illusion.category.some(cat =>
                    currentIllusion.category.includes(cat)
                );
                if (hasCommonCategory) {
                    related.push({ ...illusion, index });
                }
            }
        });
        
        // 如果相关错觉不足 4 个，添加其他错觉
        if (related.length < 4) {
            illusions.forEach((illusion, index) => {
                if (index !== currentIndex && !related.find(r => r.index === index)) {
                    related.push({ ...illusion, index });
                }
                if (related.length >= 4) return;
            });
        }
        
        return related.slice(0, 4);
    }
    
    /**
     * 过滤图库
     * @param {string} category - 分类
     */
    filterGallery(category) {
        // 更新按钮状态
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            }
        });
        
        // 过滤卡片
        const cards = document.querySelectorAll('.illusion-card');
        cards.forEach(card => {
            const cardCategory = card.dataset.category;
            if (category === 'all' || cardCategory.includes(category)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    /**
     * 切换学习模块
     * @param {string} module - 模块名称
     */
    switchLearningModule(module) {
        // 更新按钮状态
        document.querySelectorAll('.learn-nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.module === module) {
                btn.classList.add('active');
            }
        });
        
        // 切换模块内容
        document.querySelectorAll('.learn-module').forEach(mod => {
            mod.classList.add('hidden');
        });
        
        const targetModule = document.getElementById(`module-${module}`);
        if (targetModule) {
            targetModule.classList.remove('hidden');
        }
        
        // 更新进度
        this.updateLearningProgress(module);
    }
    
    /**
     * 更新学习进度
     * @param {string} module - 模块名称
     */
    updateLearningProgress(module) {
        const modules = ['neuroscience', 'mathematics', 'physics', 'art'];
        const currentIndex = modules.indexOf(module);
        const progress = ((currentIndex + 1) / modules.length) * 100;
        
        const progressBar = document.querySelector('.progress-bar .progress');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        const progressText = document.querySelector('.progress-bar + p');
        if (progressText) {
            progressText.textContent = `已完成 ${currentIndex + 1}/${modules.length} 模块`;
        }
    }
    
    /**
     * 更新已探索数量
     */
    updateExploredCount() {
        const countEl = document.getElementById('explored-count');
        if (countEl) {
            countEl.textContent = this.exploredIllusions.size;
        }
    }
    
    /**
     * 更新总数量
     */
    updateTotalCount() {
        const totalEl = document.getElementById('total-count');
        if (totalEl) {
            totalEl.textContent = illusions.length;
        }
    }
    
    /**
     * 获取当前页面
     * @returns {string} 当前页面名称
     */
    getCurrentPage() {
        return this.currentPage;
    }
    
    /**
     * 获取已探索的错觉集合
     * @returns {Set} 已探索的错觉集合
     */
    getExploredIllusions() {
        return this.exploredIllusions;
    }
}

// 创建并导出路由器实例
export const router = new Router();
export default router;
