/**
 * 性能优化模块
 * 包含懒加载、缓存策略、资源预加载等功能
 */

/**
 * 图片懒加载器
 */
export class LazyLoader {
    constructor(options = {}) {
        this.options = {
            rootMargin: options.rootMargin || '50px',
            threshold: options.threshold || 0.01,
            placeholder: options.placeholder || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9zdmc+'
        };
        
        this.observer = null;
        this.loadingElements = new Set();
        this.loadedElements = new Set();
    }
    
    /**
     * 初始化观察器
     */
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                this.handleIntersection.bind(this),
                {
                    rootMargin: this.options.rootMargin,
                    threshold: this.options.threshold
                }
            );
        } else {
            // 降级处理：直接加载所有图片
            this.loadAll();
        }
    }
    
    /**
     * 观察元素
     */
    observe(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (!this.loadedElements.has(element)) {
                if (this.observer) {
                    this.observer.observe(element);
                } else {
                    this.loadElement(element);
                }
            }
        });
    }
    
    /**
     * 处理交叉观察
     */
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (!this.loadingElements.has(element)) {
                    this.loadingElements.add(element);
                    this.loadElement(element);
                }
            }
        });
    }
    
    /**
     * 加载单个元素
     */
    loadElement(element) {
        const src = element.dataset.src;
        const srcset = element.dataset.srcset;
        
        if (!src) return;
        
        // 创建临时图片预加载
        const img = new Image();
        
        img.onload = () => {
            if (element.tagName === 'IMG') {
                element.src = src;
                if (srcset) {
                    element.srcset = srcset;
                }
                element.classList.add('loaded');
                element.classList.remove('lazy');
            } else {
                element.style.backgroundImage = `url(${src})`;
                element.classList.add('loaded');
            }
            
            this.loadedElements.add(element);
            this.loadingElements.delete(element);
            
            // 触发懒加载完成事件
            element.dispatchEvent(new CustomEvent('lazyloaded', {
                bubbles: false,
                detail: { element }
            }));
        };
        
        img.onerror = () => {
            console.error('Failed to load image:', src);
            this.loadingElements.delete(element);
        };
        
        img.src = src;
        if (srcset) {
            img.srcset = srcset;
        }
    }
    
    /**
     * 加载所有元素 (降级方案)
     */
    loadAll() {
        const lazyElements = document.querySelectorAll('[data-src]');
        lazyElements.forEach(element => {
            this.loadElement(element);
        });
    }
    
    /**
     * 销毁观察器
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }
}

/**
 * 缓存管理器
 */
export class CacheManager {
    constructor(options = {}) {
        this.options = {
            maxSize: options.maxSize || 50,
            ttl: options.ttl || 3600000, // 1 小时
            storageType: options.storageType || 'memory' // 'memory' or 'localStorage'
        };
        
        this.cache = new Map();
        this.hits = 0;
        this.misses = 0;
        
        if (this.options.storageType === 'localStorage') {
            this.loadFromStorage();
        }
        
        // 定期清理过期缓存
        this.startCleanup();
    }
    
    /**
     * 设置缓存
     */
    set(key, value, ttl = null) {
        if (this.cache.size >= this.options.maxSize) {
            this.evictOldest();
        }
        
        const item = {
            value,
            timestamp: Date.now(),
            ttl: ttl || this.options.ttl
        };
        
        this.cache.set(key, item);
        
        if (this.options.storageType === 'localStorage') {
            this.saveToStorage();
        }
    }
    
    /**
     * 获取缓存
     */
    get(key) {
        const item = this.cache.get(key);
        
        if (!item) {
            this.misses++;
            return null;
        }
        
        // 检查是否过期
        if (Date.now() - item.timestamp > item.ttl) {
            this.cache.delete(key);
            this.misses++;
            return null;
        }
        
        this.hits++;
        return item.value;
    }
    
    /**
     * 删除缓存
     */
    delete(key) {
        return this.cache.delete(key);
    }
    
    /**
     * 清除所有缓存
     */
    clear() {
        this.cache.clear();
        if (this.options.storageType === 'localStorage') {
            localStorage.removeItem('illusion_cache');
        }
    }
    
    /**
     * 获取缓存统计
     */
    getStats() {
        const total = this.hits + this.misses;
        return {
            size: this.cache.size,
            hits: this.hits,
            misses: this.misses,
            hitRate: total > 0 ? ((this.hits / total) * 100).toFixed(2) : 0
        };
    }
    
    /**
     * 清除最旧的缓存项
     */
    evictOldest() {
        let oldestKey = null;
        let oldestTime = Infinity;
        
        for (const [key, item] of this.cache.entries()) {
            if (item.timestamp < oldestTime) {
                oldestTime = item.timestamp;
                oldestKey = key;
            }
        }
        
        if (oldestKey) {
            this.cache.delete(oldestKey);
        }
    }
    
    /**
     * 开始定期清理
     */
    startCleanup() {
        this.cleanupInterval = setInterval(() => {
            this.cleanup();
        }, 60000); // 每分钟清理一次
    }
    
    /**
     * 清理过期缓存
     */
    cleanup() {
        const now = Date.now();
        for (const [key, item] of this.cache.entries()) {
            if (now - item.timestamp > item.ttl) {
                this.cache.delete(key);
            }
        }
        
        if (this.options.storageType === 'localStorage') {
            this.saveToStorage();
        }
    }
    
    /**
     * 保存到 localStorage
     */
    saveToStorage() {
        try {
            const data = Array.from(this.cache.entries()).map(([key, item]) => ({
                key,
                item
            }));
            localStorage.setItem('illusion_cache', JSON.stringify(data));
        } catch (e) {
            console.warn('Failed to save cache to localStorage:', e);
        }
    }
    
    /**
     * 从 localStorage 加载
     */
    loadFromStorage() {
        try {
            const data = localStorage.getItem('illusion_cache');
            if (data) {
                const parsed = JSON.parse(data);
                parsed.forEach(({ key, item }) => {
                    this.cache.set(key, item);
                });
            }
        } catch (e) {
            console.warn('Failed to load cache from localStorage:', e);
        }
    }
    
    /**
     * 停止清理定时器
     */
    destroy() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
    }
}

/**
 * 资源预加载器
 */
export class Preloader {
    constructor() {
        this.queue = [];
        this.loading = new Set();
        this.loaded = new Set();
        this.maxConcurrent = 3;
    }
    
    /**
     * 添加预加载任务
     */
    add(sources) {
        if (!Array.isArray(sources)) {
            sources = [sources];
        }
        
        sources.forEach(src => {
            if (!this.loaded.has(src) && !this.loading.has(src)) {
                this.queue.push(src);
            }
        });
        
        this.processQueue();
    }
    
    /**
     * 处理队列
     */
    processQueue() {
        while (this.loading.size < this.maxConcurrent && this.queue.length > 0) {
            const src = this.queue.shift();
            this.loadResource(src);
        }
    }
    
    /**
     * 加载资源
     */
    loadResource(src) {
        this.loading.add(src);
        
        return new Promise((resolve, reject) => {
            const img = new Image();
            
            img.onload = () => {
                this.loading.delete(src);
                this.loaded.add(src);
                this.processQueue();
                resolve({ src, type: 'image' });
            };
            
            img.onerror = () => {
                this.loading.delete(src);
                reject({ src, error: 'Failed to load' });
                this.processQueue();
            };
            
            img.src = src;
        });
    }
    
    /**
     * 预加载页面
     */
    preloadPage(pageName) {
        // 根据页面名称预加载相关资源
        const pageResources = {
            'gallery': this.getGalleryResources(),
            'detail': this.getDetailResources(),
            'learn': this.getLearningResources()
        };
        
        const resources = pageResources[pageName] || [];
        this.add(resources);
    }
    
    /**
     * 获取图库资源
     */
    getGalleryResources() {
        // 返回图库页面需要的资源 URL 列表
        return [];
    }
    
    /**
     * 获取详情页资源
     */
    getDetailResources() {
        // 返回详情页需要的资源 URL 列表
        return [];
    }
    
    /**
     * 获取学习资源
     */
    getLearningResources() {
        // 返回学习页面需要的资源 URL 列表
        return [];
    }
}

/**
 * 性能监控器
 */
export class PerformanceMonitor {
    constructor() {
        this.metrics = {
            fps: 0,
            frameCount: 0,
            lastTime: performance.now()
        };
        
        this.listeners = [];
    }
    
    /**
     * 开始监控
     */
    start() {
        this.measureFPS();
    }
    
    /**
     * 测量 FPS
     */
    measureFPS() {
        const now = performance.now();
        this.metrics.frameCount++;
        
        if (now - this.metrics.lastTime >= 1000) {
            this.metrics.fps = this.metrics.frameCount;
            this.metrics.frameCount = 0;
            this.metrics.lastTime = now;
            
            this.notifyListeners();
        }
        
        requestAnimationFrame(this.measureFPS.bind(this));
    }
    
    /**
     * 添加监听器
     */
    addListener(callback) {
        this.listeners.push(callback);
    }
    
    /**
     * 通知监听器
     */
    notifyListeners() {
        this.listeners.forEach(callback => {
            callback(this.metrics);
        });
    }
    
    /**
     * 获取性能指标
     */
    getMetrics() {
        return this.metrics;
    }
    
    /**
     * 测量函数执行时间
     */
    static measureExecutionTime(fn, label = 'Function') {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        console.log(`${label} executed in ${(end - start).toFixed(2)}ms`);
        return result;
    }
}

// 导出单例
const cacheManager = new CacheManager({ maxSize: 100, ttl: 1800000 }); // 30 分钟
const preloader = new Preloader();
const performanceMonitor = new PerformanceMonitor();

export { cacheManager, preloader, performanceMonitor };
export default {
    LazyLoader,
    CacheManager,
    Preloader,
    PerformanceMonitor,
    cacheManager,
    preloader,
    performanceMonitor
};
