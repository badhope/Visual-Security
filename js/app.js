/**
 * 视觉欺骗艺术馆 - 主应用入口
 * 初始化并启动应用
 */

import illusions from './data/illusions.js';
import renderer from './modules/renderer.js';
import router from './modules/router.js';
import gallery from './components/gallery.js';
import { createParticle } from './utils/helpers.js';

/**
 * 应用主类
 */
class App {
    constructor() {
        this.initialized = false;
    }
    
    /**
     * 初始化应用
     */
    init() {
        if (this.initialized) {
            console.log('App already initialized');
            return;
        }
        
        console.log('Initializing Visual Illusion Art Gallery...');
        
        // 将模块挂载到全局 window 对象以便 HTML 事件处理器访问
        window.illusions = illusions;
        window.renderer = renderer;
        window.router = router;
        window.gallery = gallery;
        
        // 初始化各个模块
        router.init();
        gallery.init();
        
        // 设置全局事件监听
        this.setupGlobalEventListeners();
        
        // 添加页面加载动画
        this.addPageLoadAnimation();
        
        this.initialized = true;
        console.log('App initialized successfully!');
    }
    
    /**
     * 设置全局事件监听
     */
    setupGlobalEventListeners() {
        // DOM 加载完成
        document.addEventListener('DOMContentLoaded', () => {
            this.init();
        });
        
        // 窗口大小变化时
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
        
        // 键盘事件
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
        
        // 鼠标移动产生粒子效果（可选）
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.95) { // 5% 的概率产生粒子
                createParticle(e.clientX, e.clientY);
            }
        });
    }
    
    /**
     * 处理窗口大小变化
     */
    handleResize() {
        // 可以在这里添加响应式处理逻辑
        console.log('Window resized');
    }
    
    /**
     * 处理键盘事件
     * @param {KeyboardEvent} e - 键盘事件对象
     */
    handleKeyboard(e) {
        // ESC 键返回首页
        if (e.key === 'Escape') {
            const currentPage = router.getCurrentPage();
            if (currentPage !== 'home') {
                router.navigateTo('home');
            }
        }
        
        // 方向键导航
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const currentPage = router.getCurrentPage();
            if (currentPage === 'detail') {
                const currentIndex = router.currentIllusionIndex;
                if (e.key === 'ArrowLeft' && currentIndex > 0) {
                    router.showIllusionDetail(currentIndex - 1);
                } else if (e.key === 'ArrowRight' && currentIndex < illusions.length - 1) {
                    router.showIllusionDetail(currentIndex + 1);
                }
            }
        }
    }
    
    /**
     * 添加页面加载动画
     */
    addPageLoadAnimation() {
        document.querySelectorAll('.page').forEach(page => {
            page.style.opacity = '0';
            page.style.transform = 'translateY(20px)';
        });
        
        setTimeout(() => {
            const activePage = document.querySelector('.page.active');
            if (activePage) {
                activePage.style.transition = 'all 0.5s ease';
                activePage.style.opacity = '1';
                activePage.style.transform = 'translateY(0)';
            }
        }, 100);
    }
    
    /**
     * 防抖函数
     * @param {Function} func - 要防抖的函数
     * @param {number} wait - 等待时间
     * @returns {Function} 防抖后的函数
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    /**
     * 获取应用状态
     * @returns {Object} 应用状态对象
     */
    getState() {
        return {
            initialized: this.initialized,
            currentPage: router.getCurrentPage(),
            exploredCount: router.getExploredIllusions().size,
            totalIllusions: illusions.length
        };
    }
}

// 创建应用实例
const app = new App();

// 导出
export { app, illusions, renderer, router, gallery };
export default app;
