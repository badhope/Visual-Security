/**
 * 视觉错觉渲染器模块
 * 负责渲染所有视觉错觉效果
 */

import { createSVGElement } from '../utils/helpers.js';

/**
 * 渲染彭罗斯三角
 * @param {HTMLElement} container - 容器元素
 */
export function renderPenroseTriangle(container) {
    container.innerHTML = '';
    const svg = createSVGElement('svg', {
        viewBox: '0 0 200 200',
        class: 'penrose-svg'
    });
    
    const defs = createSVGElement('defs');
    
    // 创建渐变
    const gradients = [
        { id: 'grad1', colors: ['#00f5d4', '#00b4a0'] },
        { id: 'grad2', colors: ['#ff006e', '#c0005a'] },
        { id: 'grad3', colors: ['#8338ec', '#6020c0'] }
    ];
    
    gradients.forEach(grad => {
        const linearGradient = createSVGElement('linearGradient', {
            id: grad.id,
            x1: '0%',
            y1: '0%',
            x2: '100%',
            y2: '100%'
        });
        
        grad.colors.forEach((color, index) => {
            const stop = createSVGElement('stop', {
                offset: index === 0 ? '0%' : '100%',
                style: `stop-color:${color}`
            });
            linearGradient.appendChild(stop);
        });
        
        defs.appendChild(linearGradient);
    });
    
    svg.appendChild(defs);
    
    // 创建彭罗斯三角的三个边
    const polygons = [
        { points: '30,170 30,100 100,100 100,130 60,130 60,170', fill: 'url(#grad1)' },
        { points: '170,170 170,100 100,100 100,130 140,130 140,170', fill: 'url(#grad2)' },
        { points: '100,30 100,100 130,100 130,60 170,60 170,30', fill: 'url(#grad3)' }
    ];
    
    polygons.forEach(poly => {
        const polygon = createSVGElement('polygon', {
            points: poly.points,
            fill: poly.fill
        });
        svg.appendChild(polygon);
    });
    
    container.appendChild(svg);
}

/**
 * 渲染内克尔方块
 * @param {HTMLElement} container - 容器元素
 */
export function renderNeckerCube(container) {
    container.innerHTML = '';
    const cube = document.createElement('div');
    cube.className = 'necker-cube';
    
    // 前面
    const front = document.createElement('div');
    front.className = 'face front';
    cube.appendChild(front);
    
    // 后面
    const back = document.createElement('div');
    back.className = 'face back';
    cube.appendChild(back);
    
    // 连接器
    const connectors = document.createElement('div');
    connectors.className = 'connectors';
    for (let i = 0; i < 4; i++) {
        const connector = document.createElement('span');
        connectors.appendChild(connector);
    }
    cube.appendChild(connectors);
    
    container.appendChild(cube);
}

/**
 * 渲染赫尔曼栅格
 * @param {HTMLElement} container - 容器元素
 */
export function renderHermannGrid(container) {
    container.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'hermann-grid';
    
    // 创建 8x8 网格
    for (let i = 0; i < 64; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        grid.appendChild(cell);
    }
    
    container.appendChild(grid);
}

/**
 * 渲染穆勒 - 莱耶错觉
 * @param {HTMLElement} container - 容器元素
 */
export function renderMullerLyer(container) {
    container.innerHTML = '';
    const mullerLyer = document.createElement('div');
    mullerLyer.className = 'muller-lyer';
    
    // 第一条线（向外箭头）
    const lineGroup1 = document.createElement('div');
    lineGroup1.className = 'line-group';
    
    const arrowOutLeft1 = document.createElement('div');
    arrowOutLeft1.className = 'arrow outward-left';
    
    const line1 = document.createElement('div');
    line1.className = 'line';
    
    const arrowOutRight1 = document.createElement('div');
    arrowOutRight1.className = 'arrow outward-right';
    
    lineGroup1.appendChild(arrowOutLeft1);
    lineGroup1.appendChild(line1);
    lineGroup1.appendChild(arrowOutRight1);
    
    // 第二条线（向内箭头）
    const lineGroup2 = document.createElement('div');
    lineGroup2.className = 'line-group';
    
    const arrowInLeft2 = document.createElement('div');
    arrowInLeft2.className = 'arrow inward-left';
    
    const line2 = document.createElement('div');
    line2.className = 'line';
    
    const arrowInRight2 = document.createElement('div');
    arrowInRight2.className = 'arrow inward-right';
    
    lineGroup2.appendChild(arrowInLeft2);
    lineGroup2.appendChild(line2);
    lineGroup2.appendChild(arrowInRight2);
    
    mullerLyer.appendChild(lineGroup1);
    mullerLyer.appendChild(lineGroup2);
    
    container.appendChild(mullerLyer);
}

/**
 * 渲染旋转蛇错觉
 * @param {HTMLElement} container - 容器元素
 */
export function renderRotatingSnakes(container) {
    container.innerHTML = '';
    const snakes = document.createElement('div');
    snakes.className = 'rotating-snakes';
    
    // 创建 4 个环
    for (let i = 0; i < 4; i++) {
        const ring = document.createElement('div');
        ring.className = 'snake-ring';
        snakes.appendChild(ring);
    }
    
    container.appendChild(snakes);
}

/**
 * 渲染卡尼莎三角
 * @param {HTMLElement} container - 容器元素
 */
export function renderKanizsaTriangle(container) {
    container.innerHTML = '';
    const kanizsa = document.createElement('div');
    kanizsa.className = 'kanizsa-triangle';
    
    // 创建三个"吃豆人"
    for (let i = 0; i < 3; i++) {
        const pacman = document.createElement('div');
        pacman.className = 'pacman';
        kanizsa.appendChild(pacman);
    }
    
    // 中心三角形
    const centerTriangle = document.createElement('div');
    centerTriangle.className = 'center-triangle';
    kanizsa.appendChild(centerTriangle);
    
    container.appendChild(kanizsa);
}

/**
 * 渲染艾宾浩斯错觉
 * @param {HTMLElement} container - 容器元素
 */
export function renderEbbinghaus(container) {
    container.innerHTML = '';
    const ebbinghaus = document.createElement('div');
    ebbinghaus.className = 'ebbinghaus';
    
    // 左侧组（小圆包围）
    const groupLeft = document.createElement('div');
    groupLeft.className = 'group left';
    
    const centerCircleLeft = document.createElement('div');
    centerCircleLeft.className = 'center-circle';
    groupLeft.appendChild(centerCircleLeft);
    
    // 添加 8 个小圆
    for (let i = 0; i < 8; i++) {
        const surround = document.createElement('div');
        surround.className = 'surround';
        groupLeft.appendChild(surround);
    }
    
    // 右侧组（大圆包围）
    const groupRight = document.createElement('div');
    groupRight.className = 'group right';
    
    const centerCircleRight = document.createElement('div');
    centerCircleRight.className = 'center-circle';
    groupRight.appendChild(centerCircleRight);
    
    // 添加 4 个大圆
    for (let i = 0; i < 4; i++) {
        const surround = document.createElement('div');
        surround.className = 'surround';
        groupRight.appendChild(surround);
    }
    
    ebbinghaus.appendChild(groupLeft);
    ebbinghaus.appendChild(groupRight);
    
    container.appendChild(ebbinghaus);
}

/**
 * 渲染咖啡墙错觉
 * @param {HTMLElement} container - 容器元素
 */
export function renderCafeWall(container) {
    container.innerHTML = '';
    const cafeWall = document.createElement('div');
    cafeWall.className = 'cafe-wall';
    
    // 创建 6 行
    for (let row = 0; row < 6; row++) {
        const rowEl = document.createElement('div');
        rowEl.className = 'row';
        
        // 每行 10 个瓷砖
        for (let col = 0; col < 10; col++) {
            const tile = document.createElement('div');
            tile.className = `tile ${(row + col) % 2 === 0 ? 'black' : 'white'}`;
            rowEl.appendChild(tile);
        }
        
        cafeWall.appendChild(rowEl);
    }
    
    container.appendChild(cafeWall);
}

/**
 * 渲染彭罗斯阶梯
 * @param {HTMLElement} container - 容器元素
 */
export function renderPenroseStairs(container) {
    container.innerHTML = '';
    const stairs = document.createElement('div');
    stairs.className = 'penrose-stairs';
    
    // 创建 8 个台阶
    for (let i = 0; i < 8; i++) {
        const step = document.createElement('div');
        step.className = 'step';
        stairs.appendChild(step);
    }
    
    container.appendChild(stairs);
}

/**
 * 渲染 3D 立方体
 * @param {HTMLElement} container - 容器元素
 */
export function renderCube3D(container) {
    container.innerHTML = '';
    const cube = document.createElement('div');
    cube.className = 'cube-3d';
    
    // 创建 6 个面
    const faces = ['front', 'back', 'top', 'bottom', 'left', 'right'];
    faces.forEach(face => {
        const faceEl = document.createElement('div');
        faceEl.className = `face ${face}`;
        cube.appendChild(faceEl);
    });
    
    container.appendChild(cube);
}

/**
 * 渲染德尔伯夫错觉
 * @param {HTMLElement} container - 容器元素
 */
export function renderDelboeuf(container) {
    container.innerHTML = '';
    const delboeuf = document.createElement('div');
    delboeuf.className = 'delboeuf';
    
    // 左侧（小环）
    const ringSmall = document.createElement('div');
    ringSmall.className = 'ring small';
    const dotSmall = document.createElement('div');
    dotSmall.className = 'dot';
    ringSmall.appendChild(dotSmall);
    
    // 右侧（大环）
    const ringLarge = document.createElement('div');
    ringLarge.className = 'ring large';
    const dotLarge = document.createElement('div');
    dotLarge.className = 'dot';
    ringLarge.appendChild(dotLarge);
    
    delboeuf.appendChild(ringSmall);
    delboeuf.appendChild(ringLarge);
    
    container.appendChild(delboeuf);
}

/**
 * 渲染佐尔纳错觉
 * @param {HTMLElement} container - 容器元素
 */
export function renderZollner(container) {
    container.innerHTML = '';
    const zollner = document.createElement('div');
    zollner.className = 'zollner';
    
    // 创建 5 组线
    for (let i = 0; i < 5; i++) {
        const lineGroup = document.createElement('div');
        lineGroup.className = 'line-group';
        
        const mainLine = document.createElement('div');
        mainLine.className = 'main-line';
        
        // 添加短斜线
        for (let j = 0; j < 5; j++) {
            const tick = document.createElement('div');
            tick.className = 'tick';
            tick.style.top = `${j * 40}px`;
            mainLine.appendChild(tick);
        }
        
        lineGroup.appendChild(mainLine);
        zollner.appendChild(lineGroup);
    }
    
    container.appendChild(zollner);
}

/**
 * 渲染波根多夫错觉
 * @param {HTMLElement} container - 容器元素
 */
export function renderPoggendorff(container) {
    container.innerHTML = '';
    const poggendorff = document.createElement('div');
    poggendorff.className = 'poggendorff';
    
    // 左侧斜线
    const obliqueLeft = document.createElement('div');
    obliqueLeft.className = 'oblique left';
    poggendorff.appendChild(obliqueLeft);
    
    // 右侧斜线
    const obliqueRight = document.createElement('div');
    obliqueRight.className = 'oblique right';
    poggendorff.appendChild(obliqueRight);
    
    // 遮挡矩形
    const block = document.createElement('div');
    block.className = 'block';
    poggendorff.appendChild(block);
    
    // 延续线
    const continuation1 = document.createElement('div');
    continuation1.className = 'continuation c1';
    poggendorff.appendChild(continuation1);
    
    const continuation2 = document.createElement('div');
    continuation2.className = 'continuation c2';
    poggendorff.appendChild(continuation2);
    
    container.appendChild(poggendorff);
}

/**
 * 渲染莫比乌斯环
 * @param {HTMLElement} container - 容器元素
 */
export function renderMobius(container) {
    container.innerHTML = '';
    const mobius = document.createElement('div');
    mobius.className = 'mobius-strip';
    
    // 创建 12 个片段
    for (let i = 0; i < 12; i++) {
        const segment = document.createElement('div');
        segment.className = 'segment';
        segment.style.left = `${i * 25}px`;
        segment.style.transform = `rotateY(${i * 30}deg)`;
        mobius.appendChild(segment);
    }
    
    container.appendChild(mobius);
}

/**
 * 渲染萨金特错觉
 * @param {HTMLElement} container - 容器元素
 */
export function renderSargent(container) {
    container.innerHTML = '';
    const sargent = document.createElement('div');
    sargent.className = 'sargent-illusion';
    
    // 水平条
    const horizontalBar = document.createElement('div');
    horizontalBar.className = 'bar horizontal';
    sargent.appendChild(horizontalBar);
    
    // 垂直条
    const verticalBar = document.createElement('div');
    verticalBar.className = 'bar vertical';
    sargent.appendChild(verticalBar);
    
    // 叠加层
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    sargent.appendChild(overlay);
    
    container.appendChild(sargent);
}

// 导出所有渲染函数
export default {
    renderPenroseTriangle,
    renderNeckerCube,
    renderHermannGrid,
    renderMullerLyer,
    renderRotatingSnakes,
    renderKanizsaTriangle,
    renderEbbinghaus,
    renderCafeWall,
    renderPenroseStairs,
    renderCube3D,
    renderDelboeuf,
    renderZollner,
    renderPoggendorff,
    renderMobius,
    renderSargent
};
