/**
 * Three.js 3D 错觉渲染引擎
 * 使用 WebGL 实现高性能 3D 视觉错觉渲染
 */

import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

/**
 * 3D 渲染器基类
 */
export class IllusionRenderer3D {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.animationId = null;
        this.isAnimating = false;
        
        this.init();
    }
    
    /**
     * 初始化 Three.js 场景
     */
    init() {
        // 创建场景
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a12);
        
        // 创建相机
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;
        
        // 创建渲染器
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true 
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        
        // 清除容器并添加渲染器
        this.container.innerHTML = '';
        this.container.appendChild(this.renderer.domElement);
        
        // 添加光源
        this.setupLights();
        
        // 监听窗口大小变化
        window.addEventListener('resize', this.onResize.bind(this));
        
        // 开始渲染循环
        this.animate();
    }
    
    /**
     * 设置光源
     */
    setupLights() {
        // 环境光
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        // 方向光
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
        
        // 点光源
        const pointLight = new THREE.PointLight(0x00f5d4, 0.5);
        pointLight.position.set(-5, 3, 5);
        this.scene.add(pointLight);
    }
    
    /**
     * 渲染循环
     */
    animate() {
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        
        if (this.isAnimating) {
            this.update();
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    /**
     * 更新动画 (由子类实现)
     */
    update() {
        // 子类重写
    }
    
    /**
     * 处理窗口大小变化
     */
    onResize() {
        if (!this.container) return;
        
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    
    /**
     * 清理资源
     */
    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        window.removeEventListener('resize', this.onResize.bind(this));
    }
}

/**
 * 彭罗斯三角 3D 渲染器
 */
export class PenroseTriangleRenderer extends IllusionRenderer3D {
    constructor(container) {
        super(container);
        this.rotationSpeed = 0.01;
        this.autoRotate = true;
    }
    
    /**
     * 创建彭罗斯三角
     */
    createPenroseTriangle() {
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x00f5d4,
            shininess: 100,
            side: THREE.DoubleSide
        });
        
        // 创建三个长方体
        const barLength = 3;
        const barWidth = 0.5;
        const barDepth = 0.3;
        
        // 底部横条
        const bottomGeom = new THREE.BoxGeometry(barLength, barWidth, barDepth);
        const bottom = new THREE.Mesh(bottomGeom, material);
        bottom.position.set(0, -1.5, 0);
        this.scene.add(bottom);
        
        // 右侧竖条
        const rightGeom = new THREE.BoxGeometry(barDepth, barLength, barWidth);
        const right = new THREE.Mesh(rightGeom, material);
        right.position.set(1.5, 0, 0);
        right.rotation.z = -Math.PI / 2;
        this.scene.add(right);
        
        // 左侧斜条 (关键：制造错觉)
        const leftGeom = new THREE.BoxGeometry(barLength, barWidth, barDepth);
        const left = new THREE.Mesh(leftGeom, material);
        left.position.set(-0.75, 0.75, 0);
        left.rotation.z = -Math.PI / 4;
        this.scene.add(left);
        
        return { bottom, right, left };
    }
    
    /**
     * 更新动画
     */
    update() {
        if (this.autoRotate) {
            this.scene.rotation.y += this.rotationSpeed;
            this.scene.rotation.x += this.rotationSpeed * 0.5;
        }
    }
    
    /**
     * 切换颜色
     */
    setColor(color) {
        this.scene.traverse((object) => {
            if (object.isMesh) {
                object.material.color.set(color);
            }
        });
    }
    
    /**
     * 切换旋转
     */
    toggleRotation() {
        this.autoRotate = !this.autoRotate;
    }
}

/**
 * 内克尔方块 3D 渲染器
 */
export class NeckerCubeRenderer extends IllusionRenderer3D {
    constructor(container) {
        super(container);
        this.flipInterval = 3000;
        this.lastFlip = 0;
    }
    
    /**
     * 创建内克尔方块
     */
    createNeckerCube() {
        const material = new THREE.LineBasicMaterial({ 
            color: 0x00f5d4,
            linewidth: 2
        });
        
        // 创建立方体线框
        const geometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(2, 2, 2));
        const cube = new THREE.LineSegments(geometry, material);
        this.scene.add(cube);
        
        return cube;
    }
    
    /**
     * 更新动画 - 自动翻转
     */
    update() {
        const now = Date.now();
        if (now - this.lastFlip > this.flipInterval) {
            this.scene.rotation.y += Math.PI;
            this.lastFlip = now;
        }
    }
    
    /**
     * 手动翻转
     */
    flip() {
        this.scene.rotation.y += Math.PI;
        this.lastFlip = Date.now();
    }
}

/**
 * 莫比乌斯环 3D 渲染器
 */
export class MobiusStripRenderer extends IllusionRenderer3D {
    constructor(container) {
        super(container);
        this.createMobiusStrip();
    }
    
    /**
     * 创建莫比乌斯环
     */
    createMobiusStrip() {
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x8338ec,
            shininess: 100,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8
        });
        
        // 参数化莫比乌斯环
        const geometry = new THREE.ParametricGeometry(
            (u, v, target) => {
                const a = 2; // 环的半径
                const b = 0.5; // 带的宽度
                
                const uRad = u * Math.PI * 2;
                const vRad = v * Math.PI;
                
                const x = (a + b * Math.cos(vRad) * Math.cos(uRad / 2)) * Math.cos(uRad);
                const y = (a + b * Math.cos(vRad) * Math.cos(uRad / 2)) * Math.sin(uRad);
                const z = b * Math.sin(vRad) * Math.cos(uRad / 2);
                
                target.set(x, y, z);
            },
            100, // u 分段数
            20   // v 分段数
        );
        
        const mobius = new THREE.Mesh(geometry, material);
        this.scene.add(mobius);
        
        return mobius;
    }
    
    /**
     * 更新动画
     */
    update() {
        this.scene.rotation.y += 0.01;
        this.scene.rotation.z += 0.005;
    }
}

/**
 * 不可能立方体 3D 渲染器
 */
export class ImpossibleCubeRenderer extends IllusionRenderer3D {
    constructor(container) {
        super(container);
        this.createImpossibleCube();
    }
    
    /**
     * 创建不可能立方体
     */
    createImpossibleCube() {
        const material = new THREE.LineBasicMaterial({ 
            color: 0xff006e,
            linewidth: 3
        });
        
        // 创建外层立方体
        const outerGeom = new THREE.EdgesGeometry(new THREE.BoxGeometry(3, 3, 3));
        const outer = new THREE.LineSegments(outerGeom, material);
        this.scene.add(outer);
        
        // 创建内层立方体 (错位)
        const innerGeom = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.5, 1.5, 1.5));
        const inner = new THREE.LineSegments(innerGeom, material);
        inner.position.set(0.5, 0.5, 0.5);
        this.scene.add(inner);
        
        // 添加矛盾的连接线
        this.addImpossibleConnections(material);
    }
    
    /**
     * 添加不可能的连接线
     */
    addImpossibleConnections(material) {
        const points = [
            new THREE.Vector3(-1.5, -1.5, -1.5),
            new THREE.Vector3(-0.25, -0.25, -0.25)
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        this.scene.add(line);
    }
    
    /**
     * 更新动画
     */
    update() {
        this.scene.rotation.y += 0.01;
        this.scene.rotation.x += 0.005;
    }
}

/**
 * 彭罗斯阶梯 3D 渲染器
 */
export class PenroseStairsRenderer extends IllusionRenderer3D {
    constructor(container) {
        super(container);
        this.createPenroseStairs();
    }
    
    /**
     * 创建彭罗斯阶梯
     */
    createPenroseStairs() {
        const material = new THREE.MeshPhongMaterial({ 
            color: 0xffbe0b,
            shininess: 50
        });
        
        const stairs = new THREE.Group();
        const numSteps = 12;
        const stepWidth = 2;
        const stepHeight = 0.3;
        const stepDepth = 0.5;
        const radius = 2;
        
        for (let i = 0; i < numSteps; i++) {
            const geometry = new THREE.BoxGeometry(stepWidth, stepHeight, stepDepth);
            const step = new THREE.Mesh(geometry, material);
            
            const angle = (i / numSteps) * Math.PI * 2;
            step.position.x = Math.cos(angle) * radius;
            step.position.z = Math.sin(angle) * radius;
            step.position.y = i * stepHeight;
            
            step.rotation.y = -angle;
            stairs.add(step);
        }
        
        this.scene.add(stairs);
        return stairs;
    }
    
    /**
     * 更新动画
     */
    update() {
        this.scene.rotation.y += 0.005;
    }
}

// 渲染器工厂
export const createRenderer = {
    'penrose-triangle': PenroseTriangleRenderer,
    'necker-cube': NeckerCubeRenderer,
    'mobius-strip': MobiusStripRenderer,
    'impossible-cube': ImpossibleCubeRenderer,
    'penrose-stairs': PenroseStairsRenderer
};

export default {
    IllusionRenderer3D,
    PenroseTriangleRenderer,
    NeckerCubeRenderer,
    MobiusStripRenderer,
    ImpossibleCubeRenderer,
    PenroseStairsRenderer,
    createRenderer
};
