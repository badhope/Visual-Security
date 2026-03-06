/**
 * GSAP 高级动画系统
 * 提供流畅的交互动画和时间线控制
 */

import gsap from 'https://cdn.skypack.dev/gsap@3.12.2';
import { Elastic, Back, Expo } from 'https://cdn.skypack.dev/gsap@3.12.2/EasePack';

/**
 * 动画管理器
 */
export class AnimationManager {
    constructor() {
        this.timelines = new Map();
        this.defaults = {
            duration: 0.6,
            ease: 'power3.out'
        };
    }
    
    /**
     * 页面过渡动画
     */
    static pageTransition(fromElement, toElement) {
        const tl = gsap.timeline();
        
        tl.to(fromElement, {
            opacity: 0,
            y: -30,
            duration: 0.4,
            ease: 'power2.in'
        })
        .set(fromElement, { display: 'none' })
        .set(toElement, { display: 'block' })
        .from(toElement, {
            opacity: 0,
            y: 30,
            duration: 0.4,
            ease: 'power2.out'
        });
        
        return tl;
    }
    
    /**
     * 卡片入场动画
     */
    static staggerCards(selector, options = {}) {
        const {
            delay = 0,
            duration = 0.5,
            scale = 0.8,
            opacity = 0
        } = options;
        
        return gsap.from(selector, {
            scrollTrigger: {
                trigger: selector,
                start: 'top 80%',
            },
            scale,
            opacity,
            y: 50,
            duration,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            delay
        });
    }
    
    /**
     * 文本揭示动画
     */
    static revealText(selector) {
        const element = document.querySelector(selector);
        if (!element) return;
        
        const text = element.textContent;
        element.innerHTML = '';
        
        // 分割成字符
        const chars = text.split('').map(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            return span;
        });
        
        chars.forEach(char => element.appendChild(char));
        
        return gsap.to(chars, {
            opacity: 1,
            y: 0,
            duration: 0.05,
            stagger: 0.03,
            ease: 'power2.out'
        });
    }
    
    /**
     * 按钮点击波纹动画
     */
    static buttonRipple(button, event) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        gsap.fromTo(ripple, 
            { scale: 0, opacity: 1 },
            { 
                scale: 2, 
                opacity: 0, 
                duration: 0.6, 
                ease: 'power2.out',
                onComplete: () => ripple.remove()
            }
        );
    }
    
    /**
     * 数字增长动画
     */
    static countUp(element, end, duration = 2) {
        const obj = { value: 0 };
        
        return gsap.to(obj, {
            value: end,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
                element.textContent = Math.floor(obj.value);
            }
        });
    }
    
    /**
     * 进度条动画
     */
    static progressBar(selector, percentage) {
        return gsap.to(selector, {
            width: percentage + '%',
            duration: 1,
            ease: 'power3.out'
        });
    }
    
    /**
     * 悬浮动画
     */
    static float(element, options = {}) {
        const {
            y = 10,
            duration = 2,
            repeat: yoyo = true
        } = options;
        
        return gsap.to(element, {
            y,
            duration: duration / 2,
            yoyo,
            repeat: -1,
            ease: 'sine.inOut'
        });
    }
    
    /**
     * 粒子爆发动画
     */
    static particleBurst(x, y, count = 20) {
        const particles = [];
        const container = document.getElementById('particle-container');
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 8 + 4;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
            particle.style.position = 'absolute';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            container.appendChild(particle);
            particles.push(particle);
        }
        
        const tl = gsap.timeline();
        
        particles.forEach((particle, i) => {
            const angle = (Math.PI * 2 / count) * i;
            const velocity = Math.random() * 100 + 50;
            
            tl.to(particle, {
                x: Math.cos(angle) * velocity,
                y: Math.sin(angle) * velocity,
                opacity: 0,
                scale: 0,
                duration: 1,
                ease: 'power2.out'
            }, 0);
        });
        
        tl.add(() => {
            particles.forEach(p => p.remove());
        });
        
        return tl;
    }
    
    /**
     * 缩放进入动画
     */
    static zoomIn(element) {
        return gsap.fromTo(element,
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
        );
    }
    
    /**
     * 旋转进入动画
     */
    static rotateIn(element) {
        return gsap.fromTo(element,
            { rotation: -180, scale: 0, opacity: 0 },
            { rotation: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
        );
    }
    
    /**
     * 淡入上移动画
     */
    static fadeInUp(element) {
        return gsap.fromTo(element,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        );
    }
    
    /**
     * 手风琴展开动画
     */
    static accordionExpand(element, isOpen) {
        return gsap.to(element, {
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0,
            duration: 0.4,
            ease: 'power2.out'
        });
    }
    
    /**
     * 加载动画
     */
    static loadingPulse(selector) {
        return gsap.to(selector, {
            scale: 1.1,
            opacity: 0.7,
            duration: 1,
            yoyo: true,
            repeat: -1,
            ease: 'power2.inOut'
        });
    }
    
    /**
     * 成功勾选动画
     */
    static successCheck(element) {
        const tl = gsap.timeline();
        
        tl.from(element, {
            scale: 0,
            rotation: -180,
            duration: 0.5,
            ease: 'back.out(1.7)'
        })
        .to(element, {
            scale: 1.1,
            duration: 0.2
        })
        .to(element, {
            scale: 1,
            duration: 0.2
        });
        
        return tl;
    }
    
    /**
     * 错误抖动动画
     */
    static errorShake(element) {
        return gsap.to(element, {
            x: [-10, 10, -10, 10, 0],
            duration: 0.4,
            ease: 'power1.inOut'
        });
    }
    
    /**
     * 创建时间线
     */
    static createTimeline() {
        return gsap.timeline();
    }
    
    /**
     * 杀死指定元素的所有动画
     */
    static killTweens(selector) {
        gsap.killTweensOf(selector);
    }
    
    /**
     * 全局缓动配置
     */
    static setDefaults(ease, duration) {
        gsap.defaults({
            ease,
            duration
        });
    }
}

/**
 * 页面过渡管理器
 */
export class PageTransitionManager {
    constructor() {
        this.currentTransition = null;
    }
    
    /**
     * 执行页面切换
     */
    transition(fromPage, toPage, options = {}) {
        const {
            type = 'fade',
            duration = 0.5
        } = options;
        
        // 取消之前的过渡
        if (this.currentTransition) {
            this.currentTransition.kill();
        }
        
        const tl = gsap.timeline();
        
        switch (type) {
            case 'fade':
                this.fadeTransition(tl, fromPage, toPage, duration);
                break;
            case 'slide':
                this.slideTransition(tl, fromPage, toPage, duration);
                break;
            case 'zoom':
                this.zoomTransition(tl, fromPage, toPage, duration);
                break;
            case 'flip':
                this.flipTransition(tl, fromPage, toPage, duration);
                break;
        }
        
        this.currentTransition = tl;
        return tl;
    }
    
    fadeTransition(tl, fromPage, toPage, duration) {
        tl.to(fromPage, {
            opacity: 0,
            duration: duration / 2,
            ease: 'power2.in'
        })
        .set(fromPage, { display: 'none' })
        .set(toPage, { display: 'block' })
        .from(toPage, {
            opacity: 0,
            duration: duration / 2,
            ease: 'power2.out'
        });
    }
    
    slideTransition(tl, fromPage, toPage, duration) {
        tl.to(fromPage, {
            x: -100,
            opacity: 0,
            duration,
            ease: 'power3.inOut'
        })
        .set(fromPage, { display: 'none', x: 0 })
        .set(toPage, { display: 'block', x: 100 })
        .to(toPage, {
            x: 0,
            opacity: 1,
            duration,
            ease: 'power3.inOut'
        }, '-=0.3');
    }
    
    zoomTransition(tl, fromPage, toPage, duration) {
        tl.to(fromPage, {
            scale: 1.5,
            opacity: 0,
            duration,
            ease: 'power3.inOut'
        })
        .set(fromPage, { display: 'none', scale: 1 })
        .set(toPage, { display: 'block', scale: 0.5 })
        .to(toPage, {
            scale: 1,
            opacity: 1,
            duration,
            ease: 'power3.inOut'
        }, '-=0.3');
    }
    
    flipTransition(tl, fromPage, toPage, duration) {
        tl.to(fromPage, {
            rotationY: 90,
            opacity: 0,
            duration,
            ease: 'power2.in'
        })
        .set(fromPage, { display: 'none', rotationY: 0 })
        .set(toPage, { display: 'block', rotationY: -90 })
        .to(toPage, {
            rotationY: 0,
            opacity: 1,
            duration,
            ease: 'power2.out'
        }, '-=0.3');
    }
}

/**
 * 滚动动画管理器
 */
export class ScrollAnimationManager {
    constructor() {
        this.observer = null;
        this.init();
    }
    
    init() {
        // 使用 Intersection Observer
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateOnScroll(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );
    }
    
    observe(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => this.observer.observe(el));
    }
    
    animateOnScroll(element) {
        const animation = element.dataset.animation;
        
        switch (animation) {
            case 'fade-up':
                gsap.fromTo(element,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
                );
                break;
            case 'fade-down':
                gsap.fromTo(element,
                    { y: -50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
                );
                break;
            case 'zoom-in':
                gsap.fromTo(element,
                    { scale: 0.5, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
                );
                break;
            case 'slide-left':
                gsap.fromTo(element,
                    { x: 100, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
                );
                break;
            case 'slide-right':
                gsap.fromTo(element,
                    { x: -100, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
                );
                break;
        }
    }
}

// 导出单例
const animationManager = new AnimationManager();
const pageTransitionManager = new PageTransitionManager();
const scrollAnimationManager = new ScrollAnimationManager();

export { animationManager, pageTransitionManager, scrollAnimationManager };
export default {
    AnimationManager,
    PageTransitionManager,
    ScrollAnimationManager,
    animationManager,
    pageTransitionManager,
    scrollAnimationManager
};
