/**
 * 新增视觉错觉效果模块
 * 扩展更多有趣的视觉错觉
 */

import { createSVGElement } from '../utils/helpers.js';

/**
 * 渲染弗雷泽螺旋错觉
 * @param {HTMLElement} container - 容器元素
 */
export function renderFraserSpiral(container) {
    container.innerHTML = '';
    const spiral = document.createElement('div');
    spiral.className = 'fraser-spiral';
    spiral.style.cssText = `
        position: relative;
        width: 300px;
        height: 300px;
        background: #0a0a12;
        border-radius: 50%;
        overflow: hidden;
    `;
    
    // 创建同心圆
    for (let i = 0; i < 20; i++) {
        const ring = document.createElement('div');
        ring.style.cssText = `
            position: absolute;
            border-radius: 50%;
            border: 2px dashed ${i % 2 === 0 ? '#00f5d4' : '#ff006e'};
            width: ${(i + 1) * 14}px;
            height: ${(i + 1) * 14}px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(${i * 10}deg);
        `;
        spiral.appendChild(ring);
    }
    
    container.appendChild(spiral);
}

/**
 * 渲染赫林错觉
 * @param {HTMLElement} container - 容器元素
 */
export function renderHering(container) {
    container.innerHTML = '';
    const hering = document.createElement('div');
    hering.className = 'hering-illusion';
    hering.style.cssText = `
        position: relative;
        width: 300px;
        height: 300px;
        background: #0a0a12;
        overflow: hidden;
    `;
    
    // 创建辐射线
    const centerX = 150;
    const centerY = 150;
    for (let i = 0; i < 18; i++) {
        const angle = (i / 18) * Math.PI;
        const line = document.createElement('div');
        line.style.cssText = `
            position: absolute;
            width: 2px;
            height: 300px;
            background: rgba(0, 245, 212, 0.3);
            left: ${centerX}px;
            top: ${centerY}px;
            transform-origin: top center;
            transform: rotate(${angle - Math.PI / 2}rad);
        `;
        hering.appendChild(line);
    }
    
    // 添加两条水平线
    const horizontalLine1 = document.createElement('div');
    horizontalLine1.style.cssText = `
        position: absolute;
        width: 280px;
        height: 3px;
        background: #fff;
        top: 100px;
        left: 10px;
    `;
    
    const horizontalLine2 = document.createElement('div');
    horizontalLine2.style.cssText = `
        position: absolute;
        width: 280px;
        height: 3px;
        background: #fff;
        top: 200px;
        left: 10px;
    `;
    
    hering.appendChild(horizontalLine1);
    hering.appendChild(horizontalLine2);
    
    container.appendChild(hering);
}

/**
 * 渲染文岑茨错觉
 * @param {HTMLElement} container - 容器元素
 */
export function renderWundt(container) {
    container.innerHTML = '';
    const wundt = document.createElement('div');
    wundt.className = 'wundt-illusion';
    wundt.style.cssText = `
        position: relative;
        width: 300px;
        height: 300px;
        background: #0a0a12;
        overflow: hidden;
    `;
    
    // 创建同心圆背景
    for (let i = 0; i < 10; i++) {
        const circle = document.createElement('div');
        circle.style.cssText = `
            position: absolute;
            border-radius: 50%;
            border: 2px solid rgba(131, 56, 236, 0.3);
            width: ${(i + 1) * 28}px;
            height: ${(i + 1) * 28}px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        `;
        wundt.appendChild(circle);
    }
    
    // 添加两条斜线
    const line1 = document.createElement('div');
    line1.style.cssText = `
        position: absolute;
        width: 3px;
        height: 200px;
        background: #00f5d4;
        top: 50px;
        left: 100px;
        transform: rotate(20deg);
        transform-origin: top center;
    `;
    
    const line2 = document.createElement('div');
    line2.style.cssText = `
        position: absolute;
        width: 3px;
        height: 200px;
        background: #ff006e;
        top: 50px;
        left: 200px;
        transform: rotate(-20deg);
        transform-origin: top center;
    `;
    
    wundt.appendChild(line1);
    wundt.appendChild(line2);
    
    container.appendChild(wundt);
}

/**
 * 渲染贾斯特罗错觉
 * @param {HTMLElement} container - 容器元素
 */
export function renderJastrow(container) {
    container.innerHTML = '';
    const jastrow = document.createElement('div');
    jastrow.className = 'jastrow-illusion';
    jastrow.style.cssText = `
        position: relative;
        width: 300px;
        height: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 40px;
    `;
    
    // 创建两个相同的弯曲形状
    const shape1 = document.createElement('div');
    shape1.style.cssText = `
        width: 200px;
        height: 60px;
        background: linear-gradient(90deg, #00f5d4, #8338ec);
        border-radius: 30px;
        transform: rotate(-5deg);
        clip-path: ellipse(50% 50% at 50% 50%);
    `;
    
    const shape2 = document.createElement('div');
    shape2.style.cssText = `
        width: 200px;
        height: 60px;
        background: linear-gradient(90deg, #ff006e, #ffbe0b);
        border-radius: 30px;
        transform: rotate(5deg);
        clip-path: ellipse(50% 50% at 50% 50%);
    `;
    
    jastrow.appendChild(shape1);
    jastrow.appendChild(shape2);
    
    container.appendChild(jastrow);
}

/**
 * 渲染波根多夫错觉变体
 * @param {HTMLElement} container - 容器元素
 */
export function renderPonzo(container) {
    container.innerHTML = '';
    const ponzo = document.createElement('div');
    ponzo.className = 'ponzo-illusion';
    ponzo.style.cssText = `
        position: relative;
        width: 300px;
        height: 300px;
        background: #0a0a12;
        overflow: hidden;
    `;
    
    // 创建透视线条（铁轨效果）
    const railLeft = document.createElement('div');
    railLeft.style.cssText = `
        position: absolute;
        width: 4px;
        height: 250px;
        background: linear-gradient(to top, #00f5d4, transparent);
        left: 100px;
        top: 25px;
        transform: skewX(15deg);
    `;
    
    const railRight = document.createElement('div');
    railRight.style.cssText = `
        position: absolute;
        width: 4px;
        height: 250px;
        background: linear-gradient(to top, #ff006e, transparent);
        right: 100px;
        top: 25px;
        transform: skewX(-15deg);
    `;
    
    // 添加两条水平线
    const horizontalLine1 = document.createElement('div');
    horizontalLine1.style.cssText = `
        position: absolute;
        width: 120px;
        height: 4px;
        background: #fff;
        top: 100px;
        left: 90px;
    `;
    
    const horizontalLine2 = document.createElement('div');
    horizontalLine2.style.cssText = `
        position: absolute;
        width: 200px;
        height: 4px;
        background: #fff;
        top: 200px;
        left: 50px;
    `;
    
    ponzo.appendChild(railLeft);
    ponzo.appendChild(railRight);
    ponzo.appendChild(horizontalLine1);
    ponzo.appendChild(horizontalLine2);
    
    container.appendChild(ponzo);
}

/**
 * 渲染奥比森错觉
 * @param {HTMLElement} container - 容器元素
 */
export function renderOrbison(container) {
    container.innerHTML = '';
    const orbison = document.createElement('div');
    orbison.className = 'orbison-illusion';
    orbison.style.cssText = `
        position: relative;
        width: 300px;
        height: 300px;
        background: #0a0a12;
        overflow: hidden;
    `;
    
    // 创建辐射背景
    for (let i = 0; i < 36; i++) {
        const angle = (i / 36) * 360;
        const line = document.createElement('div');
        line.style.cssText = `
            position: absolute;
            width: 2px;
            height: 300px;
            background: rgba(0, 245, 212, 0.2);
            left: 150px;
            top: 150px;
            transform-origin: top center;
            transform: rotate(${angle}deg);
        `;
        orbison.appendChild(line);
    }
    
    // 添加中心正方形
    const square = document.createElement('div');
    square.style.cssText = `
        position: absolute;
        width: 100px;
        height: 100px;
        border: 3px solid #ff006e;
        background: rgba(255, 0, 110, 0.1);
        top: 100px;
        left: 100px;
    `;
    
    orbison.appendChild(square);
    
    container.appendChild(orbison);
}

/**
 * 渲染艾姆斯房间错觉
 * @param {HTMLElement} container - 容器元素
 */
export function renderAmesRoom(container) {
    container.innerHTML = '';
    const svg = createSVGElement('svg', {
        viewBox: '0 0 400 300',
        width: '400',
        height: '300'
    });
    
    // 创建房间轮廓（梯形）
    const room = createSVGElement('polygon', {
        points: '50,250 350,250 380,50 20,50',
        fill: 'rgba(131, 56, 236, 0.1)',
        stroke: '#8338ec',
        'stroke-width': '2'
    });
    
    // 后墙
    const backWall = createSVGElement('line', {
        x1: '100',
        y1: '80',
        x2: '300',
        y2: '80',
        stroke: '#00f5d4',
        'stroke-width': '2',
        'stroke-dasharray': '5,5'
    });
    
    // 地板线条
    const floorLine = createSVGElement('line', {
        x1: '50',
        y1: '250',
        x2: '350',
        y2: '250',
        stroke: '#ff006e',
        'stroke-width': '2'
    });
    
    // 添加两个人形（不同大小）
    const person1 = createSVGElement('circle', {
        cx: '120',
        cy: '200',
        r: '30',
        fill: 'rgba(0, 245, 212, 0.6)'
    });
    
    const person2 = createSVGElement('circle', {
        cx: '280',
        cy: '120',
        r: '15',
        fill: 'rgba(255, 0, 110, 0.6)'
    });
    
    svg.appendChild(room);
    svg.appendChild(backWall);
    svg.appendChild(floorLine);
    svg.appendChild(person1);
    svg.appendChild(person2);
    
    container.appendChild(svg);
}

/**
 * 渲染鲁宾之杯
 * @param {HTMLElement} container - 容器元素
 */
export function renderRubinVase(container) {
    container.innerHTML = '';
    const svg = createSVGElement('svg', {
        viewBox: '0 0 200 300',
        width: '200',
        height: '300'
    });
    
    // 创建鲁宾之杯（花瓶/人脸双关图）
    const vase = createSVGElement('path', {
        d: 'M 60,280 L 60,200 Q 40,150 60,100 Q 80,50 100,50 Q 120,50 140,100 Q 160,150 140,200 L 140,280 Z',
        fill: '#0a0a12',
        stroke: '#fff',
        'stroke-width': '2'
    });
    
    // 背景
    const background = createSVGElement('rect', {
        x: '0',
        y: '0',
        width: '200',
        height: '300',
        fill: 'rgba(0, 245, 212, 0.1)'
    });
    
    svg.appendChild(background);
    svg.appendChild(vase);
    
    container.appendChild(svg);
}

// 导出所有渲染函数
export default {
    renderFraserSpiral,
    renderHering,
    renderWundt,
    renderJastrow,
    renderPonzo,
    renderOrbison,
    renderAmesRoom,
    renderRubinVase
};
