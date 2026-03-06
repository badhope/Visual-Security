/**
 * 视觉资源管理器
 * 管理静态图片、2D/3D 模型资源的加载和渲染
 */

/**
 * 资源加载管理器
 */
export class ResourceManager {
    constructor() {
        this.loadedResources = new Map();
        this.loadingQueue = [];
        this.isLoading = false;
        this.basePath = './assets/';
    }

    /**
     * 加载单个资源
     */
    async loadResource(type, id, path) {
        const cacheKey = `${type}:${id}`;
        
        // 检查缓存
        if (this.loadedResources.has(cacheKey)) {
            return this.loadedResources.get(cacheKey);
        }

        try {
            let resource;
            
            switch (type) {
                case 'image':
                    resource = await this.loadImage(path);
                    break;
                case 'model2d':
                    resource = await this.loadSVG(path);
                    break;
                case 'model3d':
                    resource = await this.loadGLTF(path);
                    break;
                case 'texture':
                    resource = await this.loadTexture(path);
                    break;
                default:
                    throw new Error(`Unknown resource type: ${type}`);
            }

            // 缓存资源
            this.loadedResources.set(cacheKey, resource);
            return resource;
        } catch (error) {
            console.error(`Failed to load resource ${cacheKey}:`, error);
            return null;
        }
    }

    /**
     * 加载图片
     */
    loadImage(path) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = path;
        });
    }

    /**
     * 加载 SVG
     */
    async loadSVG(path) {
        const response = await fetch(path);
        const svgText = await response.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        return svgDoc.documentElement;
    }

    /**
     * 加载 GLTF 3D 模型
     */
    async loadGLTF(path) {
        // 需要 Three.js GLTFLoader
        if (typeof THREE === 'undefined' || !THREE.GLTFLoader) {
            throw new Error('GLTFLoader not available');
        }
        
        return new Promise((resolve, reject) => {
            const loader = new THREE.GLTFLoader();
            loader.load(path, (gltf) => {
                resolve(gltf);
            }, undefined, reject);
        });
    }

    /**
     * 加载纹理
     */
    loadTexture(path) {
        return new Promise((resolve, reject) => {
            const texture = new THREE.TextureLoader().load(path, resolve, undefined, reject);
        });
    }

    /**
     * 批量加载资源
     */
    async loadResources(resources) {
        const results = [];
        
        for (const resource of resources) {
            try {
                const loaded = await this.loadResource(resource.type, resource.id, resource.path);
                results.push({ ...resource, data: loaded, success: true });
            } catch (error) {
                results.push({ ...resource, error: error.message, success: false });
            }
        }
        
        return results;
    }

    /**
     * 预加载资源
     */
    async preloadResources(resourceList) {
        console.log(`📦 Preloading ${resourceList.length} resources...`);
        
        const startTime = performance.now();
        const results = await this.loadResources(resourceList);
        const endTime = performance.now();
        
        const successCount = results.filter(r => r.success).length;
        console.log(`✅ Preloaded ${successCount}/${resourceList.length} resources in ${(endTime - startTime).toFixed(2)}ms`);
        
        return results;
    }

    /**
     * 清除缓存
     */
    clearCache(type) {
        if (type) {
            // 清除特定类型的缓存
            for (const [key, value] of this.loadedResources.entries()) {
                if (key.startsWith(type + ':')) {
                    this.loadedResources.delete(key);
                }
            }
        } else {
            // 清除所有缓存
            this.loadedResources.clear();
        }
    }

    /**
     * 获取资源
     */
    getResource(type, id) {
        const cacheKey = `${type}:${id}`;
        return this.loadedResources.get(cacheKey);
    }
}

/**
 * 2D 图形渲染器
 */
export class Graphics2DRenderer {
    constructor(container) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.container.innerHTML = '';
        this.container.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * 绘制错觉图形 - 增强版
     */
    drawIllusion(type, options = {}) {
        this.clear();
        
        const methods = {
            'hermann-grid': () => this.drawHermannGrid(options),
            'cafe-wall': () => this.drawCafeWall(options),
            'rotating-snakes': () => this.drawRotatingSnakes(options),
            'fraser-spiral': () => this.drawFraserSpiral(options),
            'kanizsa-triangle': () => this.drawKanizsaTriangle(options)
        };

        if (methods[type]) {
            methods[type]();
        }
    }

    /**
     * 绘制赫尔曼栅格（增强版）
     */
    drawHermannGrid(options = {}) {
        const {
            gridSize = 10,
            cellSize = 50,
            gapSize = 10,
            bgColor = '#000000',
            gridColor = '#ffffff'
        } = options;

        const ctx = this.ctx;
        const centerX = this.canvas.width / 2 / window.devicePixelRatio;
        const centerY = this.canvas.height / 2 / window.devicePixelRatio;
        const totalSize = gridSize * (cellSize + gapSize);
        const startX = centerX - totalSize / 2;
        const startY = centerY - totalSize / 2;

        // 绘制背景
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制网格
        ctx.fillStyle = gridColor;
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const x = startX + i * (cellSize + gapSize);
                const y = startY + j * (cellSize + gapSize);
                ctx.fillRect(x, y, cellSize, cellSize);
            }
        }
    }

    /**
     * 绘制咖啡墙错觉（增强版）
     */
    drawCafeWall(options = {}) {
        const {
            rows = 8,
            cols = 12,
            tileSize = 40,
            mortarSize = 4,
            colors = ['#000000', '#ffffff', '#808080']
        } = options;

        const ctx = this.ctx;
        const centerX = this.canvas.width / 2 / window.devicePixelRatio;
        const centerY = this.canvas.height / 2 / window.devicePixelRatio;
        const totalWidth = cols * tileSize;
        const totalHeight = rows * (tileSize + mortarSize);
        const startX = centerX - totalWidth / 2;
        const startY = centerY - totalHeight / 2;

        // 绘制背景（砂浆颜色）
        ctx.fillStyle = colors[2];
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制瓷砖
        for (let row = 0; row < rows; row++) {
            const offset = (row % 2) * (tileSize / 2);
            
            for (let col = 0; col < cols; col++) {
                const x = startX + col * tileSize + offset;
                const y = startY + row * (tileSize + mortarSize);
                
                ctx.fillStyle = (row + col) % 2 === 0 ? colors[0] : colors[1];
                ctx.fillRect(x, y, tileSize - 1, tileSize);
            }
        }
    }

    /**
     * 绘制旋转蛇错觉（增强版）
     */
    drawRotatingSnakes(options = {}) {
        const {
            rings = 4,
            segments = 12,
            baseRadius = 50,
            colors = ['#000000', '#00f5d4', '#ffffff', '#ff006e']
        } = options;

        const ctx = this.ctx;
        const centerX = this.canvas.width / 2 / window.devicePixelRatio;
        const centerY = this.canvas.height / 2 / window.devicePixelRatio;

        for (let ring = 0; ring < rings; ring++) {
            const radius = baseRadius + ring * baseRadius;
            
            for (let i = 0; i < segments; i++) {
                const startAngle = (i / segments) * Math.PI * 2;
                const endAngle = ((i + 1) / segments) * Math.PI * 2;
                
                const colorIndex = (ring + i) % colors.length;
                ctx.fillStyle = colors[colorIndex];
                
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                ctx.closePath();
                ctx.fill();
            }
        }
    }

    /**
     * 绘制弗雷泽螺旋（增强版）
     */
    drawFraserSpiral(options = {}) {
        const {
            circles = 8,
            segments = 24,
            baseRadius = 30,
            colors = ['#00f5d4', '#ff006e', '#8338ec', '#ffffff']
        } = options;

        const ctx = this.ctx;
        const centerX = this.canvas.width / 2 / window.devicePixelRatio;
        const centerY = this.canvas.height / 2 / window.devicePixelRatio;

        for (let circle = 0; circle < circles; circle++) {
            const radius = baseRadius + circle * baseRadius;
            
            for (let i = 0; i < segments; i++) {
                const angle = (i / segments) * Math.PI * 2;
                const tiltAngle = angle + (circle % 2) * 0.3; // 倾斜线段创造螺旋假象
                
                const x1 = centerX + Math.cos(tiltAngle) * (radius - baseRadius / 2);
                const y1 = centerY + Math.sin(tiltAngle) * (radius - baseRadius / 2);
                const x2 = centerX + Math.cos(tiltAngle) * (radius + baseRadius / 2);
                const y2 = centerY + Math.sin(tiltAngle) * (radius + baseRadius / 2);
                
                ctx.strokeStyle = colors[i % colors.length];
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        }
    }

    /**
     * 绘制卡尼莎三角（增强版）
     */
    drawKanizsaTriangle(options = {}) {
        const {
            triangleSize = 150,
            pacmanSize = 50,
            colors = { background: '#000000', pacman: '#ff006e' }
        } = options;

        const ctx = this.ctx;
        const centerX = this.canvas.width / 2 / window.devicePixelRatio;
        const centerY = this.canvas.height / 2 / window.devicePixelRatio;

        // 绘制背景
        ctx.fillStyle = colors.background;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 三个"吃豆人"的位置
        const angles = [Math.PI / 2, Math.PI * 7 / 6, Math.PI * 11 / 6];
        const positions = angles.map(angle => ({
            x: centerX + Math.cos(angle) * triangleSize,
            y: centerY + Math.sin(angle) * triangleSize
        }));

        // 绘制吃豆人
        ctx.fillStyle = colors.pacman;
        positions.forEach((pos, index) => {
            const wedgeAngle = Math.PI / 3; // 60 度缺口
            const startAngle = angles[index] + Math.PI + wedgeAngle / 2;
            const endAngle = angles[index] + Math.PI - wedgeAngle / 2;
            
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            ctx.arc(pos.x, pos.y, pacmanSize, startAngle, endAngle);
            ctx.closePath();
            ctx.fill();
        });

        // 主观三角形会被大脑自动"填补"
    }
}

/**
 * 3D 场景管理器
 */
export class SceneManager {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.animationId = null;
        this.init();
    }

    init() {
        // 创建 Three.js 场景
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

        this.container.innerHTML = '';
        this.container.appendChild(this.renderer.domElement);

        // 添加光源
        this.addLights();

        // 启动渲染循环
        this.animate();

        // 监听窗口大小变化
        window.addEventListener('resize', () => this.onResize());
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
    }

    onResize() {
        if (!this.container) return;
        
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // 自动旋转
        if (this.scene.rotation) {
            this.scene.rotation.y += 0.005;
        }

        this.renderer.render(this.scene, this.camera);
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    dispose() {
        this.stop();
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

/**
 * 视觉错觉模型库
 */
export const IllusionModels = {
    /**
     * 创建彭罗斯三角
     */
    createPenroseTriangle(scene) {
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x00f5d4,
            shininess: 100
        });

        // 创建三个长方体
        const barLength = 3;
        const barWidth = 0.5;
        const barHeight = 0.5;

        const geometry = new THREE.BoxGeometry(barLength, barWidth, barHeight);
        
        const bar1 = new THREE.Mesh(geometry, material);
        const bar2 = new THREE.Mesh(geometry, material);
        const bar3 = new THREE.Mesh(geometry, material);

        // 排列成不可能的三角形
        bar1.position.set(0, 1.5, 0);
        bar1.rotation.z = Math.PI / 2;

        bar2.position.set(1.5, 0, 0);
        bar2.rotation.z = Math.PI / 6;

        bar3.position.set(-1.5, 0, 0);
        bar3.rotation.z = -Math.PI / 6;

        const triangle = new THREE.Group();
        triangle.add(bar1, bar2, bar3);
        
        scene.add(triangle);
        return triangle;
    },

    /**
     * 创建内克尔方块
     */
    createNeckerCube(scene) {
        const material = new THREE.LineBasicMaterial({ 
            color: 0xff006e,
            linewidth: 2
        });

        const geometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(2, 2, 2));
        const cube = new THREE.LineSegments(geometry, material);
        
        scene.add(cube);
        return cube;
    },

    /**
     * 创建莫比乌斯环
     */
    createMobiusStrip(scene) {
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x8338ec,
            shininess: 100,
            side: THREE.DoubleSide
        });

        const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16, 2, 3);
        const strip = new THREE.Mesh(geometry, material);
        
        scene.add(strip);
        return strip;
    }
};

// 导出单例
export const resourceManager = new ResourceManager();
