/**
 * 复杂概念模拟模块
 * 模拟抽象的哲学、数学和物理学概念
 */

/**
 * 菲欧吉利空间模拟器
 * 基于非欧几里得几何的可视化模拟
 */
export class FeaginSpaceSimulator {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.objects = [];
        this.currentGeometry = 'hyperbolic';
        this.init();
    }

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
        
        this.container.innerHTML = '';
        this.container.appendChild(this.renderer.domElement);

        // 添加光源
        this.addLights();

        // 创建非欧几何可视化
        this.createNonEuclideanVisualization();

        // 添加说明文字
        this.addDescription();

        // 启动动画
        this.animate();
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x00f5d4, 1, 100);
        pointLight.position.set(5, 5, 5);
        this.scene.add(pointLight);
    }

    /**
     * 创建非欧几里得几何可视化
     */
    createNonEuclideanVisualization() {
        // 双曲几何模型（庞加莱圆盘）
        if (this.currentGeometry === 'hyperbolic') {
            this.createHyperbolicModel();
        }
        // 椭圆几何模型
        else if (this.currentGeometry === 'elliptic') {
            this.createEllipticModel();
        }
    }

    /**
     * 创建双曲几何模型
     */
    createHyperbolicModel() {
        const group = new THREE.Group();

        // 创建庞加莱圆盘边界
        const boundaryGeometry = new THREE.RingGeometry(2.9, 3, 64);
        const boundaryMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00f5d4,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8
        });
        const boundary = new THREE.Mesh(boundaryGeometry, boundaryMaterial);
        group.add(boundary);

        // 创建双曲网格
        for (let r = 0.5; r < 3; r += 0.3) {
            const points = [];
            for (let i = 0; i <= 64; i++) {
                const theta = (i / 64) * Math.PI * 2;
                const hyperbolicR = this.hyperbolicRadius(r, theta);
                const x = hyperbolicR * Math.cos(theta);
                const y = hyperbolicR * Math.sin(theta);
                points.push(new THREE.Vector3(x, y, 0));
            }

            const curve = new THREE.CatmullRomCurve3(points);
            const tubeGeometry = new THREE.TubeGeometry(curve, 64, 0.02, 8, false);
            const material = new THREE.MeshBasicMaterial({ 
                color: 0xff006e,
                transparent: true,
                opacity: 0.6
            });
            const tube = new THREE.Mesh(tubeGeometry, material);
            group.add(tube);
        }

        // 添加径向线
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const points = [];
            for (let r = 0; r < 3; r += 0.1) {
                const x = r * Math.cos(angle);
                const y = r * Math.sin(angle);
                points.push(new THREE.Vector3(x, y, 0));
            }

            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const lineMaterial = new THREE.LineBasicMaterial({ 
                color: 0x8338ec,
                transparent: true,
                opacity: 0.5
            });
            const line = new THREE.Line(lineGeometry, lineMaterial);
            group.add(line);
        }

        this.scene.add(group);
        this.objects.push(group);
    }

    /**
     * 双曲半径计算
     */
    hyperbolicRadius(r, theta) {
        // 简化的双曲几何模型
        return r * (1 - Math.pow(r / 3, 2));
    }

    /**
     * 创建椭圆几何模型
     */
    createEllipticModel() {
        const group = new THREE.Group();

        // 创建球面
        const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
        const sphereMaterial = new THREE.MeshPhongMaterial({
            color: 0x00f5d4,
            transparent: true,
            opacity: 0.3,
            wireframe: true
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        group.add(sphere);

        // 创建大圆（测地线）
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI;
            const curve = new THREE.EllipseCurve(
                0, 0,
                2, 2,
                0, Math.PI * 2,
                false,
                0
            );
            const points = curve.getPoints(64);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ 
                color: 0xff006e 
            });
            const ellipse = new THREE.Line(geometry, material);
            ellipse.rotation.x = angle;
            group.add(ellipse);
        }

        this.scene.add(group);
        this.objects.push(group);
    }

    /**
     * 添加说明文字
     */
    addDescription() {
        const infoDiv = document.createElement('div');
        infoDiv.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            text-align: center;
            max-width: 600px;
            background: rgba(0, 0, 0, 0.7);
            padding: 15px 25px;
            border-radius: 10px;
            border: 1px solid rgba(0, 245, 212, 0.3);
        `;

        infoDiv.innerHTML = `
            <h3 style="margin: 0 0 10px 0; color: #00f5d4; font-family: 'Orbitron', sans-serif;">
                菲欧吉利空间（非欧几里得几何）
            </h3>
            <p style="margin: 0; line-height: 1.6;">
                在这个空间中，欧几里得第五公设（平行公设）不再成立。
                <br>
                <strong style="color: #ff006e;">双曲几何：</strong> 过直线外一点可以作无数条平行线
                <br>
                <strong style="color: #8338ec;">椭圆几何：</strong> 过直线外一点不能作任何平行线
                <br>
                这挑战了我们对"直线"和"平面"的直觉理解。
            </p>
        `;

        this.container.style.position = 'relative';
        this.container.appendChild(infoDiv);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // 旋转整个场景
        this.objects.forEach(obj => {
            obj.rotation.z += 0.002;
        });

        this.renderer.render(this.scene, this.camera);
    }

    /**
     * 切换几何类型
     */
    switchGeometry(type) {
        // 清除现有对象
        this.objects.forEach(obj => {
            this.scene.remove(obj);
        });
        this.objects = [];

        this.currentGeometry = type;
        this.createNonEuclideanVisualization();
    }

    dispose() {
        this.objects.forEach(obj => {
            this.scene.remove(obj);
        });
        this.renderer.dispose();
    }
}

/**
 * 克莱因瓶模拟器
 * 四维空间物体在三维的投影
 */
export class KleinBottleSimulator {
    constructor(container) {
        this.container = container;
        this.init();
    }

    init() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a12);

        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        
        this.container.innerHTML = '';
        this.container.appendChild(this.renderer.domElement);

        this.createKleinBottle();
        this.addDescription();
        this.animate();
    }

    createKleinBottle() {
        // 克莱因瓶参数方程
        const createKleinBottleGeometry = () => {
            const geometry = new THREE.BufferGeometry();
            const vertices = [];
            const indices = [];

            const uSteps = 100;
            const vSteps = 50;

            for (let u = 0; u <= uSteps; u++) {
                const uParam = (u / uSteps) * Math.PI * 2;
                
                for (let v = 0; v <= vSteps; v++) {
                    const vParam = (v / vSteps) * Math.PI * 2;
                    
                    // 克莱因瓶参数方程
                    let x, y, z;
                    
                    if (uParam < Math.PI) {
                        // 第一部分：圆环的一部分
                        const r = 2 + Math.cos(uParam);
                        x = r * Math.cos(vParam);
                        y = r * Math.sin(vParam);
                        z = Math.sin(uParam);
                    } else {
                        // 第二部分：自相交的部分
                        const r = 2 + Math.cos(uParam);
                        x = r * Math.cos(vParam);
                        y = -r * Math.sin(vParam);
                        z = Math.sin(uParam) * Math.cos(vParam);
                    }

                    vertices.push(x, y, z);
                }
            }

            // 创建索引
            for (let u = 0; u < uSteps; u++) {
                for (let v = 0; v < vSteps; v++) {
                    const a = u * (vSteps + 1) + v;
                    const b = a + 1;
                    const c = (u + 1) * (vSteps + 1) + v;
                    const d = c + 1;

                    indices.push(a, b, d);
                    indices.push(a, d, c);
                }
            }

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            geometry.setIndex(indices);
            geometry.computeVertexNormals();

            return geometry;
        };

        const geometry = createKleinBottleGeometry();
        const material = new THREE.MeshPhongMaterial({
            color: 0x00f5d4,
            shininess: 100,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide,
            wireframe: false
        });

        const kleinBottle = new THREE.Mesh(geometry, material);
        this.scene.add(kleinBottle);
    }

    addDescription() {
        const infoDiv = document.createElement('div');
        infoDiv.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            text-align: center;
            max-width: 600px;
            background: rgba(0, 0, 0, 0.7);
            padding: 15px 25px;
            border-radius: 10px;
            border: 1px solid rgba(0, 245, 212, 0.3);
        `;

        infoDiv.innerHTML = `
            <h3 style="margin: 0 0 10px 0; color: #00f5d4; font-family: 'Orbitron', sans-serif;">
                克莱因瓶（Klein Bottle）
            </h3>
            <p style="margin: 0; line-height: 1.6;">
                克莱因瓶是一个不可定向的曲面，没有"内部"和"外部"之分。
                <br>
                它是四维空间中的物体，在三维空间中的投影必然自相交。
                <br>
                想象一个瓶子，它的瓶颈穿过瓶身与瓶底相连——这就是克莱因瓶。
            </p>
        `;

        this.container.style.position = 'relative';
        this.container.appendChild(infoDiv);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        const bottle = this.scene.children[0];
        if (bottle) {
            bottle.rotation.x += 0.005;
            bottle.rotation.y += 0.005;
        }

        this.renderer.render(this.scene, this.camera);
    }

    dispose() {
        this.renderer.dispose();
    }
}

/**
 * 超立方体（Tesseract）模拟器
 * 四维立方体在三维空间的投影
 */
export class TesseractSimulator {
    constructor(container) {
        this.container = container;
        this.init();
    }

    init() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a12);

        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        
        this.container.innerHTML = '';
        this.container.appendChild(this.renderer.domElement);

        this.createTesseract();
        this.addDescription();
        this.animate();
    }

    createTesseract() {
        // 创建超立方体的顶点（4D）
        const points4D = [];
        for (let i = 0; i < 16; i++) {
            points4D.push([
                (i & 1) ? 1 : -1,
                (i & 2) ? 1 : -1,
                (i & 4) ? 1 : -1,
                (i & 8) ? 1 : -1
            ]);
        }

        // 4D 到 3D 的立体投影
        const project4Dto3D = (point4D, angle) => {
            const [x, y, z, w] = point4D;
            
            // 4D 旋转
            const cosA = Math.cos(angle);
            const sinA = Math.sin(angle);
            
            const x1 = x * cosA - w * sinA;
            const w1 = x * sinA + w * cosA;
            const y1 = y;
            const z1 = z;
            
            // 立体投影到 3D
            const distance = 3;
            const scale = distance / (distance - w1);
            
            return [
                x1 * scale,
                y1 * scale,
                z1 * scale
            ];
        };

        // 创建边
        const edges = [];
        for (let i = 0; i < 16; i++) {
            for (let j = i + 1; j < 16; j++) {
                const diff = i ^ j; // XOR 找出不同的位
                if ((diff & (diff - 1)) === 0) { // 只有一位不同
                    edges.push([i, j]);
                }
            }
        }

        // 创建 Three.js 对象
        this.tesseractGroup = new THREE.Group();
        this.points3D = [];

        // 创建顶点
        const vertexGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const vertexMaterial = new THREE.MeshPhongMaterial({ color: 0xff006e });

        for (let i = 0; i < 16; i++) {
            const vertex = new THREE.Mesh(vertexGeometry, vertexMaterial);
            this.tesseractGroup.add(vertex);
            this.points3D.push(vertex);
        }

        // 创建边
        const edgeMaterial = new THREE.LineBasicMaterial({ 
            color: 0x00f5d4,
            transparent: true,
            opacity: 0.8
        });

        this.edgeLines = [];
        edges.forEach(([i, j]) => {
            const geometry = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 0, 0)
            ]);
            const line = new THREE.Line(geometry, edgeMaterial);
            this.tesseractGroup.add(line);
            this.edgeLines.push({ line, indices: [i, j] });
        });

        this.scene.add(this.tesseractGroup);
    }

    updateTesseract(angle) {
        const project4Dto3D = (point4D) => {
            const [x, y, z, w] = point4D;
            const cosA = Math.cos(angle);
            const sinA = Math.sin(angle);
            
            const x1 = x * cosA - w * sinA;
            const w1 = x * sinA + w * cosA;
            
            const distance = 3;
            const scale = distance / (distance - w1);
            
            return new THREE.Vector3(
                x1 * scale,
                y * scale,
                z * scale
            );
        };

        // 4D 顶点
        const points4D = [];
        for (let i = 0; i < 16; i++) {
            points4D.push([
                (i & 1) ? 1 : -1,
                (i & 2) ? 1 : -1,
                (i & 4) ? 1 : -1,
                (i & 8) ? 1 : -1
            ]);
        }

        // 更新顶点位置
        for (let i = 0; i < 16; i++) {
            const pos = project4Dto3D(points4D[i]);
            this.points3D[i].position.copy(pos);
        }

        // 更新边
        this.edgeLines.forEach(({ line, indices: [i, j] }) => {
            const positions = line.geometry.attributes.position.array;
            positions[0] = this.points3D[i].position.x;
            positions[1] = this.points3D[i].position.y;
            positions[2] = this.points3D[i].position.z;
            positions[3] = this.points3D[j].position.x;
            positions[4] = this.points3D[j].position.y;
            positions[5] = this.points3D[j].position.z;
            line.geometry.attributes.position.needsUpdate = true;
        });
    }

    addDescription() {
        const infoDiv = document.createElement('div');
        infoDiv.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            text-align: center;
            max-width: 600px;
            background: rgba(0, 0, 0, 0.7);
            padding: 15px 25px;
            border-radius: 10px;
            border: 1px solid rgba(0, 245, 212, 0.3);
        `;

        infoDiv.innerHTML = `
            <h3 style="margin: 0 0 10px 0; color: #00f5d4; font-family: 'Orbitron', sans-serif;">
                超立方体（Tesseract）
            </h3>
            <p style="margin: 0; line-height: 1.6;">
                超立方体是四维空间中的立方体，就像立方体是三维空间中的正方形。
                <br>
                我们看到的只是它在三维空间的投影，就像影子是 3D 物体在 2D 的投影。
                <br>
                旋转展示的是 4D 空间中的旋转，这在 3D 中看起来像是变形。
            </p>
        `;

        this.container.style.position = 'relative';
        this.container.appendChild(infoDiv);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        const angle = Date.now() * 0.0005;
        this.updateTesseract(angle);
        
        this.tesseractGroup.rotation.y += 0.002;

        this.renderer.render(this.scene, this.camera);
    }

    dispose() {
        this.renderer.dispose();
    }
}

// 导出工厂函数
export const createSimulator = {
    'feagin-space': FeaginSpaceSimulator,
    'klein-bottle': KleinBottleSimulator,
    'tesseract': TesseractSimulator
};
