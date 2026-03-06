/**
 * 高级视觉错觉渲染器
 * 包含 10 个新增错觉的渲染函数和交互增强效果
 */

import { createSVGElement } from '../utils/helpers.js';

/**
 * 渲染弗雷泽螺旋
 */
export function renderFraserSpiral(container) {
    container.innerHTML = '';
    const svg = createSVGElement('svg', {
        viewBox: '0 0 400 400',
        class: 'fraser-spiral-svg'
    });
    
    const centerX = 200;
    const centerY = 200;
    const numCircles = 8;
    const maxRadius = 180;
    
    // 绘制同心圆，但添加倾斜线段
    for (let i = 0; i < numCircles; i++) {
        const radius = (maxRadius / numCircles) * (i + 1);
        const circle = createSVGElement('circle', {
            cx: centerX,
            cy: centerY,
            r: radius,
            fill: 'none',
            stroke: `hsl(${i * 45}, 70%, 60%)`,
            'stroke-width': '2'
        });
        svg.appendChild(circle);
        
        // 添加倾斜的分割线段
        const numSegments = 12;
        for (let j = 0; j < numSegments; j++) {
            const angle = (j / numSegments) * Math.PI * 2;
            const tiltAngle = Math.PI / 8; // 倾斜角度
            
            const x1 = centerX + Math.cos(angle + tiltAngle) * (radius - 10);
            const y1 = centerY + Math.sin(angle + tiltAngle) * (radius - 10);
            const x2 = centerX + Math.cos(angle - tiltAngle) * (radius + 10);
            const y2 = centerY + Math.sin(angle - tiltAngle) * (radius + 10);
            
            const line = createSVGElement('line', {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                stroke: '#fff',
                'stroke-width': '1.5',
                opacity: '0.6'
            });
            svg.appendChild(line);
        }
    }
    
    container.appendChild(svg);
}

/**
 * 渲染黑林错觉
 */
export function renderHering(container) {
    container.innerHTML = '';
    const svg = createSVGElement('svg', {
        viewBox: '0 0 500 400',
        class: 'hering-svg'
    });
    
    const centerX = 250;
    const centerY = 200;
    
    // 绘制放射线
    const numLines = 24;
    for (let i = 0; i < numLines; i++) {
        const angle = (i / numLines) * Math.PI * 2;
        const length = 300;
        const x1 = centerX + Math.cos(angle) * 10;
        const y1 = centerY + Math.sin(angle) * 10;
        const x2 = centerX + Math.cos(angle) * length;
        const y2 = centerY + Math.sin(angle) * length;
        
        const line = createSVGElement('line', {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            stroke: 'rgba(255, 255, 255, 0.3)',
            'stroke-width': '1'
        });
        svg.appendChild(line);
    }
    
    // 绘制两条平行线 (实际上是直的)
    const line1Y = 150;
    const line2Y = 250;
    
    const line1 = createSVGElement('line', {
        x1: 50,
        y1: line1Y,
        x2: 450,
        y2: line1Y,
        stroke: '#00f5d4',
        'stroke-width': '3'
    });
    
    const line2 = createSVGElement('line', {
        x1: 50,
        y1: line2Y,
        x2: 450,
        y2: line2Y,
        stroke: '#ff006e',
        'stroke-width': '3'
    });
    
    svg.appendChild(line1);
    svg.appendChild(line2);
    
    container.appendChild(svg);
}

/**
 * 渲染冯特错觉
 */
export function renderWundt(container) {
    container.innerHTML = '';
    const svg = createSVGElement('svg', {
        viewBox: '0 0 500 400',
        class: 'wundt-svg'
    });
    
    // 绘制交叉斜线
    const numDiagonals = 15;
    for (let i = 0; i < numDiagonals; i++) {
        const x = 50 + (i / numDiagonals) * 400;
        const slope = Math.PI / 6;
        
        const line = createSVGElement('line', {
            x1: x - 30,
            y1: 200 + 30 * Math.tan(slope),
            x2: x + 30,
            y2: 200 - 30 * Math.tan(slope),
            stroke: 'rgba(255, 255, 255, 0.4)',
            'stroke-width': '2'
        });
        svg.appendChild(line);
    }
    
    // 绘制两条弧线 (实际上是向内弯的)
    const arc1 = createSVGElement('path', {
        d: 'M 50 150 Q 250 130 450 150',
        fill: 'none',
        stroke: '#00f5d4',
        'stroke-width': '3'
    });
    
    const arc2 = createSVGElement('path', {
        d: 'M 50 250 Q 250 270 450 250',
        fill: 'none',
        stroke: '#ff006e',
        'stroke-width': '3'
    });
    
    svg.appendChild(arc1);
    svg.appendChild(arc2);
    
    container.appendChild(svg);
}

/**
 * 渲染贾斯特罗错觉
 */
export function renderJastrow(container) {
    container.innerHTML = '';
    const svg = createSVGElement('svg', {
        viewBox: '0 0 400 400',
        class: 'jastrow-svg'
    });
    
    // 创建两个相同的弯曲形状
    const shapeWidth = 200;
    const shapeHeight = 80;
    const curvature = 40;
    
    // 上面的形状
    const shape1 = createSVGElement('path', {
        d: `M 100 150 
            L ${100 + shapeWidth} 150 
            Q ${100 + shapeWidth + curvature} ${150 + shapeHeight/2} ${100 + shapeWidth} ${150 + shapeHeight}
            L 100 ${150 + shapeHeight}
            Q ${100 - curvature} ${150 + shapeHeight/2} 100 150`,
        fill: 'rgba(0, 245, 212, 0.6)',
        stroke: '#00f5d4',
        'stroke-width': '2'
    });
    
    // 下面的形状 (相同大小，但位置不同)
    const shape2 = createSVGElement('path', {
        d: `M 100 220 
            L ${100 + shapeWidth} 220 
            Q ${100 + shapeWidth + curvature} ${220 + shapeHeight/2} ${100 + shapeWidth} ${220 + shapeHeight}
            L 100 ${220 + shapeHeight}
            Q ${100 - curvature} ${220 + shapeHeight/2} 100 220`,
        fill: 'rgba(255, 0, 110, 0.6)',
        stroke: '#ff006e',
        'stroke-width': '2'
    });
    
    svg.appendChild(shape1);
    svg.appendChild(shape2);
    
    container.appendChild(svg);
}

/**
 * 渲染庞佐错觉
 */
export function renderPonzo(container) {
    container.innerHTML = '';
    const svg = createSVGElement('svg', {
        viewBox: '0 0 400 400',
        class: 'ponzo-svg'
    });
    
    // 绘制 converging lines (类似铁轨)
    const perspectiveLines = [
        { x1: 50, y1: 350, x2: 200, y2: 50 },
        { x1: 350, y1: 350, x2: 200, y2: 50 }
    ];
    
    perspectiveLines.forEach(line => {
        const persLine = createSVGElement('line', {
            ...line,
            stroke: 'rgba(255, 255, 255, 0.4)',
            'stroke-width': '2'
        });
        svg.appendChild(persLine);
    });
    
    // 添加横向的"枕木"
    for (let i = 0; i < 10; i++) {
        const y = 100 + i * 25;
        const width = 50 + i * 20;
        const x1 = 200 - width / 2;
        const x2 = 200 + width / 2;
        
        const sleeper = createSVGElement('line', {
            x1: x1,
            y1: y,
            x2: x2,
            y2: y,
            stroke: 'rgba(255, 255, 255, 0.2)',
            'stroke-width': '1'
        });
        svg.appendChild(sleeper);
    }
    
    // 绘制两条等长的横线
    const topLine = createSVGElement('line', {
        x1: 130,
        y1: 120,
        x2: 270,
        y2: 120,
        stroke: '#00f5d4',
        'stroke-width': '4'
    });
    
    const bottomLine = createSVGElement('line', {
        x1: 130,
        y1: 280,
        x2: 270,
        y2: 280,
        stroke: '#ff006e',
        'stroke-width': '4'
    });
    
    svg.appendChild(topLine);
    svg.appendChild(bottomLine);
    
    container.appendChild(svg);
}

/**
 * 渲染奥比森错觉
 */
export function renderOrbison(container) {
    container.innerHTML = '';
    const svg = createSVGElement('svg', {
        viewBox: '0 0 400 400',
        class: 'orbison-svg'
    });
    
    const centerX = 200;
    const centerY = 200;
    
    // 绘制放射线
    const numRays = 16;
    for (let i = 0; i < numRays * 2; i++) {
        const angle = (i / (numRays * 2)) * Math.PI * 2;
        const line = createSVGElement('line', {
            x1: centerX,
            y1: centerY,
            x2: centerX + Math.cos(angle) * 200,
            y2: centerY + Math.sin(angle) * 200,
            stroke: 'rgba(255, 255, 255, 0.2)',
            'stroke-width': '1'
        });
        svg.appendChild(line);
    }
    
    // 绘制同心圆
    for (let i = 1; i <= 5; i++) {
        const circle = createSVGElement('circle', {
            cx: centerX,
            cy: centerY,
            r: i * 35,
            fill: 'none',
            stroke: 'rgba(255, 255, 255, 0.15)',
            'stroke-width': '1'
        });
        svg.appendChild(circle);
    }
    
    // 绘制正方形
    const square = createSVGElement('rect', {
        x: 125,
        y: 125,
        width: 150,
        height: 150,
        fill: 'none',
        stroke: '#00f5d4',
        'stroke-width': '3'
    });
    svg.appendChild(square);
    
    container.appendChild(svg);
}

/**
 * 渲染艾姆斯房间 (简化 2D 版本)
 */
export function renderAmesRoom(container) {
    container.innerHTML = '';
    const svg = createSVGElement('svg', {
        viewBox: '0 0 500 400',
        class: 'ames-room-svg'
    });
    
    // 绘制梯形房间 (从特定视角看是矩形)
    const room = createSVGElement('path', {
        d: 'M 100 100 L 400 100 L 450 300 L 50 300 Z',
        fill: 'rgba(131, 56, 236, 0.2)',
        stroke: '#8338ec',
        'stroke-width': '2'
    });
    svg.appendChild(room);
    
    // 地板格子
    for (let i = 1; i < 10; i++) {
        const x1 = 100 + (i / 10) * 300;
        const x2 = 50 + (i / 10) * 400;
        const line = createSVGElement('line', {
            x1: x1,
            y1: 100,
            x2: x2,
            y2: 300,
            stroke: 'rgba(131, 56, 236, 0.3)',
            'stroke-width': '1'
        });
        svg.appendChild(line);
    }
    
    // 添加两个人形 (表示大小变化)
    const person1 = createSVGElement('circle', {
        cx: 150,
        cy: 250,
        r: 15,
        fill: '#00f5d4'
    });
    
    const person2 = createSVGElement('circle', {
        cx: 350,
        cy: 250,
        r: 30,
        fill: '#ff006e'
    });
    
    svg.appendChild(person1);
    svg.appendChild(person2);
    
    container.appendChild(svg);
}

/**
 * 渲染鲁宾之杯
 */
export function renderRubinVase(container) {
    container.innerHTML = '';
    const svg = createSVGElement('svg', {
        viewBox: '0 0 300 400',
        class: 'rubin-vase-svg'
    });
    
    // 绘制花瓶/脸的轮廓
    const vasePath = createSVGElement('path', {
        d: 'M 150 50 
            C 100 50, 80 150, 80 200 
            C 80 250, 100 350, 150 350 
            C 200 350, 220 250, 220 200 
            C 220 150, 200 50, 150 50',
        fill: 'rgba(0, 245, 212, 0.3)',
        stroke: '#00f5d4',
        'stroke-width': '2'
    });
    svg.appendChild(vasePath);
    
    // 添加辅助线帮助看到脸
    const faceOutline = createSVGElement('path', {
        d: 'M 150 50 
            C 100 50, 80 150, 80 200 
            C 100 180, 120 160, 150 150',
        fill: 'none',
        stroke: 'rgba(255, 0, 110, 0.5)',
        'stroke-width': '2',
        'stroke-dasharray': '5,5'
    });
    svg.appendChild(faceOutline);
    
    container.appendChild(svg);
}

/**
 * 渲染水彩错觉
 */
export function renderWatercolor(container) {
    container.innerHTML = '';
    const svg = createSVGElement('svg', {
        viewBox: '0 0 400 400',
        class: 'watercolor-svg'
    });
    
    // 创建波浪形轮廓
    const waveShape = createSVGElement('path', {
        d: 'M 100 100 
            Q 150 80, 200 100 
            Q 250 120, 300 100 
            L 300 300 
            Q 250 320, 200 300 
            Q 150 280, 100 300 Z',
        fill: 'none',
        stroke: '#8338ec',
        'stroke-width': '8'
    });
    svg.appendChild(waveShape);
    
    // 内侧浅色线
    const innerShape = createSVGElement('path', {
        d: 'M 104 105 
            Q 150 88, 200 105 
            Q 250 122, 300 105 
            L 296 295 
            Q 250 312, 200 295 
            Q 150 278, 104 295 Z',
        fill: 'none',
        stroke: 'rgba(131, 56, 236, 0.4)',
        'stroke-width': '4'
    });
    svg.appendChild(innerShape);
    
    // 模拟颜色扩散效果
    const fillShape = createSVGElement('path', {
        d: 'M 104 105 
            Q 150 88, 200 105 
            Q 250 122, 300 105 
            L 296 295 
            Q 250 312, 200 295 
            Q 150 278, 104 295 Z',
        fill: 'rgba(131, 56, 236, 0.15)',
        stroke: 'none'
    });
    svg.appendChild(fillShape);
    
    container.appendChild(svg);
}

/**
 * 渲染闪光延迟错觉
 */
export function renderFlashLag(container) {
    container.innerHTML = '';
    const svg = createSVGElement('svg', {
        viewBox: '0 0 500 300',
        class: 'flash-lag-svg',
        id: 'flash-lag-svg'
    });
    
    // 绘制运动轨迹
    const track = createSVGElement('line', {
        x1: 50,
        y1: 150,
        x2: 450,
        y2: 150,
        stroke: 'rgba(255, 255, 255, 0.3)',
        'stroke-width': '2'
    });
    svg.appendChild(track);
    
    // 中心闪光标记
    const flashMarker = createSVGElement('line', {
        x1: 250,
        y1: 100,
        x2: 250,
        y2: 200,
        stroke: '#ffbe0b',
        'stroke-width': '3',
        'stroke-dasharray': '5,5'
    });
    svg.appendChild(flashMarker);
    
    // 运动的圆 (初始位置)
    const movingCircle = createSVGElement('circle', {
        id: 'moving-circle',
        cx: 250,
        cy: 150,
        r: 20,
        fill: '#00f5d4'
    });
    svg.appendChild(movingCircle);
    
    // 添加运动轨迹尾迹
    const trail = createSVGElement('ellipse', {
        id: 'motion-trail',
        cx: 240,
        cy: 150,
        rx: 15,
        ry: 10,
        fill: 'rgba(0, 245, 212, 0.3)'
    });
    svg.appendChild(trail);
    
    container.appendChild(svg);
    
    // 添加动画
    const animateMotion = () => {
        const circle = document.getElementById('moving-circle');
        const trail = document.getElementById('motion-trail');
        if (!circle || !trail) return;
        
        const time = Date.now() / 1000;
        const position = 250 + 150 * Math.sin(time * 2);
        
        circle.setAttribute('cx', position);
        trail.setAttribute('cx', position - 10);
        
        requestAnimationFrame(animateMotion);
    };
    
    setTimeout(animateMotion, 100);
}

// 导出所有渲染函数
export const advancedRenderers = {
    renderFraserSpiral,
    renderHering,
    renderWundt,
    renderJastrow,
    renderPonzo,
    renderOrbison,
    renderAmesRoom,
    renderRubinVase,
    renderWatercolor,
    renderFlashLag
};

export default advancedRenderers;
