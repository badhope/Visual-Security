/**
 * 工具函数库
 * 提供通用的辅助函数
 */

/**
 * 创建粒子效果
 * @param {number} x - X 坐标
 * @param {number} y - Y 坐标
 */
export function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
export function debounce(func, wait) {
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
 * 节流函数
 * @param {Function} func - 要节流的函数
 * @param {number} limit - 时间限制（毫秒）
 * @returns {Function} 节流后的函数
 */
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * 平滑滚动到元素
 * @param {string} selector - CSS 选择器
 * @param {number} offset - 偏移量
 */
export function scrollToElement(selector, offset = 0) {
    const element = document.querySelector(selector);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * 格式化数字，添加千位分隔符
 * @param {number} num - 要格式化的数字
 * @returns {string} 格式化后的字符串
 */
export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 检查元素是否在视口中
 * @param {Element} element - 要检查的元素
 * @returns {boolean} 是否在视口中
 */
export function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * 获取随机整数
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} 随机整数
 */
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 切换类名
 * @param {Element} element - DOM 元素
 * @param {string} className - 类名
 * @param {boolean} force - 强制添加或移除
 */
export function toggleClass(element, className, force) {
    if (force !== undefined) {
        if (force) {
            element.classList.add(className);
        } else {
            element.classList.remove(className);
        }
    } else {
        element.classList.toggle(className);
    }
}

/**
 * 创建 SVG 元素
 * @param {string} tagName - SVG 标签名
 * @param {Object} attributes - 属性对象
 * @returns {SVGElement} 创建的 SVG 元素
 */
export function createSVGElement(tagName, attributes = {}) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tagName);
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    return element;
}

/**
 * 深度克隆对象
 * @param {Object} obj - 要克隆的对象
 * @returns {Object} 克隆后的对象
 */
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * 获取 URL 参数
 * @param {string} param - 参数名
 * @returns {string|null} 参数值
 */
export function getUrlParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * 本地存储辅助函数
 */
export const storage = {
    /**
     * 存储数据
     * @param {string} key - 键
     * @param {any} value - 值
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    },
    
    /**
     * 获取数据
     * @param {string} key - 键
     * @returns {any} 值
     */
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },
    
    /**
     * 移除数据
     * @param {string} key - 键
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    },
    
    /**
     * 清空所有数据
     */
    clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }
};

export default {
    createParticle,
    debounce,
    throttle,
    scrollToElement,
    formatNumber,
    isInViewport,
    getRandomInt,
    toggleClass,
    createSVGElement,
    deepClone,
    getUrlParameter,
    storage
};
