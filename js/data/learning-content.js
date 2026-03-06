/**
 * 学习模块内容
 * 包含所有学习模块的详细内容
 */

export const learningModules = {
    neuroscience: {
        id: 'neuroscience',
        title: '神经科学基础',
        icon: 'fa-brain',
        color: 'neon-cyan',
        content: `
            <h3 class="text-xl font-bold mb-4 text-white">视觉系统的工作原理</h3>
            <p class="text-gray-300 mb-4">
                人眼是一个复杂的光学系统，而视觉感知则是大脑对视觉信息的解释过程。当光线进入眼睛后，会经过角膜、瞳孔、晶状体，最终投射到视网膜上。视网膜上约有 1.2 亿个视杆细胞和 600 万个视锥细胞，它们将光信号转换为神经电信号。
            </p>
            
            <div class="quote">
                <p class="text-gray-300">
                    "我们看到的不是世界的本来面目，而是我们自己的面目。"
                </p>
                <p class="text-neon-cyan text-sm mt-2">— 阿奈·宁</p>
            </div>
            
            <h3 class="text-xl font-bold mb-4 mt-6 text-white">视觉处理通路</h3>
            <p class="text-gray-300 mb-4">
                视觉信息从视网膜出发，经过视神经、视交叉、外侧膝状体，最终到达大脑皮层的视觉中枢（V1-V5 区域）。这个过程涉及两个主要通路：
            </p>
            
            <div class="grid md:grid-cols-2 gap-4 mb-6">
                <div class="bg-neon-cyan/10 rounded-xl p-4">
                    <h4 class="font-bold text-neon-cyan mb-2">腹侧通路（"是什么"通路）</h4>
                    <p class="text-sm text-gray-300">负责物体识别、颜色感知、形状识别，从 V1 延伸到颞叶。</p>
                </div>
                <div class="bg-neon-pink/10 rounded-xl p-4">
                    <h4 class="font-bold text-neon-pink mb-2">背侧通路（"在哪里"通路）</h4>
                    <p class="text-sm text-gray-300">负责空间定位、运动感知、深度判断，从 V1 延伸到顶叶。</p>
                </div>
            </div>
            
            <h3 class="text-xl font-bold mb-4 text-white">为什么会产生视觉错觉？</h3>
            <p class="text-gray-300 mb-4">
                视觉错觉的产生源于大脑处理信息的方式。大脑不是被动地接收信息，而是主动地解释和预测。这种"自上而下"的处理方式虽然通常能帮助我们快速理解世界，但在某些特殊情况下会导致错误。
            </p>
            
            <div class="timeline">
                <div class="timeline-item">
                    <h4 class="font-bold text-neon-cyan mb-2">侧抑制</h4>
                    <p class="text-sm text-gray-300">当某个神经元被激活时，它会抑制周围神经元的活动。这是赫尔曼栅格等错觉的神经基础。</p>
                </div>
                <div class="timeline-item">
                    <h4 class="font-bold text-neon-cyan mb-2">填充效应</h4>
                    <p class="text-sm text-gray-300">大脑会自动"填补"缺失的信息，这是卡尼莎三角等主观轮廓错觉的原因。</p>
                </div>
                <div class="timeline-item">
                    <h4 class="font-bold text-neon-cyan mb-2">深度线索冲突</h4>
                    <p class="text-sm text-gray-300">当不同的深度线索给出矛盾信息时，大脑无法正确解释三维结构，产生不可能图形。</p>
                </div>
            </div>
            
            <h3 class="text-xl font-bold mb-4 mt-6 text-white">互动实验：盲点测试</h3>
            <p class="text-gray-300 mb-4">
                每只眼睛都有一个盲点，那里没有感光细胞。但我们在日常生活中从未注意到这个"洞"，因为大脑会用周围的信息来填充它。
            </p>
            <div class="bg-black/30 rounded-xl p-6 text-center">
                <p class="text-sm text-gray-400 mb-4">闭上右眼，用左眼注视右边的十字，慢慢靠近屏幕...</p>
                <div class="flex justify-center items-center gap-20">
                    <div class="w-8 h-8 bg-neon-cyan rounded-full"></div>
                    <div class="text-4xl text-white">+</div>
                </div>
                <p class="text-sm text-gray-400 mt-4">在某个距离，圆点会消失！</p>
            </div>
        `
    },
    
    mathematics: {
        id: 'mathematics',
        title: '数学原理',
        icon: 'fa-calculator',
        color: 'neon-pink',
        content: `
            <h3 class="text-xl font-bold mb-4 text-white">投影几何与不可能图形</h3>
            <p class="text-gray-300 mb-4">
                不可能图形的数学基础在于投影几何。当三维物体被投影到二维平面时，会丢失深度信息。彭罗斯三角等图形利用了这种信息丢失，创造了局部合理但全局矛盾的投影。
            </p>
            
            <div class="formula">
                <p class="text-center text-lg">
                    投影变换：(x, y, z) → (x/z, y/z)
                </p>
                <p class="text-center text-sm text-gray-400 mt-2">
                    三维坐标到二维平面的透视投影
                </p>
            </div>
            
            <h3 class="text-xl font-bold mb-4 mt-6 text-white">拓扑学与莫比乌斯环</h3>
            <p class="text-gray-300 mb-4">
                莫比乌斯环是拓扑学中最著名的对象之一。它只有一个面和一条边界，这可以通过数学严格证明。
            </p>
            
            <div class="formula">
                <p class="text-center text-lg">
                    参数方程：x(u,v) = (1 + v/2 · cos(u/2)) · cos(u)
                </p>
                <p class="text-center text-lg">
                    y(u,v) = (1 + v/2 · cos(u/2)) · sin(u)
                </p>
                <p class="text-center text-lg">
                    z(u,v) = v/2 · sin(u/2)
                </p>
                <p class="text-center text-sm text-gray-400 mt-2">
                    u ∈ [0, 2π], v ∈ [-1, 1]
                </p>
            </div>
            
            <h3 class="text-xl font-bold mb-4 mt-6 text-white">分形与视觉错觉</h3>
            <p class="text-gray-300 mb-4">
                某些视觉错觉与分形几何有关。分形是自相似的几何结构，在不同尺度上呈现相同的模式。这种特性可以用来创造无限重复的视觉图案。
            </p>
            
            <div class="formula">
                <p class="text-center text-lg">
                    分形维度：D = log(N) / log(S)
                </p>
                <p class="text-center text-sm text-gray-400 mt-2">
                    N = 自相似片数，S = 缩放因子
                </p>
            </div>
            
            <h3 class="text-xl font-bold mb-4 mt-6 text-white">几何错觉的数学分析</h3>
            <p class="text-gray-300 mb-4">
                许多几何错觉可以用数学方法分析。例如，穆勒 - 莱耶错觉中，箭头的角度会影响感知长度的偏差程度。
            </p>
            
            <div class="formula">
                <p class="text-center text-lg">
                    感知偏差 ≈ k · tan(θ/2)
                </p>
                <p class="text-center text-sm text-gray-400 mt-2">
                    θ = 箭头角度，k = 常数
                </p>
            </div>
        `
    },
    
    physics: {
        id: 'physics',
        title: '物理学解释',
        icon: 'fa-atom',
        color: 'neon-purple',
        content: `
            <h3 class="text-xl font-bold mb-4 text-white">光学基础</h3>
            <p class="text-gray-300 mb-4">
                视觉错觉与光学原理密切相关。光的传播、反射、折射等基本现象为许多错觉提供了物理基础。
            </p>
            
            <div class="grid md:grid-cols-2 gap-4 mb-6">
                <div class="bg-neon-purple/10 rounded-xl p-4">
                    <h4 class="font-bold text-neon-purple mb-2">光的传播</h4>
                    <p class="text-sm text-gray-300">光在均匀介质中沿直线传播，这解释了为什么我们可以用几何光学来分析视觉系统。</p>
                </div>
                <div class="bg-neon-cyan/10 rounded-xl p-4">
                    <h4 class="font-bold text-neon-cyan mb-2">成像原理</h4>
                    <p class="text-sm text-gray-300">眼睛的成像遵循凸透镜成像规律：1/u + 1/v = 1/f</p>
                </div>
            </div>
            
            <h3 class="text-xl font-bold mb-4 mt-6 text-white">时间与运动错觉</h3>
            <p class="text-gray-300 mb-4">
                旋转蛇等运动错觉可以用视觉处理的时间延迟来解释。当不同亮度的区域刺激视网膜时，视觉系统处理它们需要不同的时间，这种时间差被大脑解释为运动。
            </p>
            
            <div class="formula">
                <p class="text-center text-lg">
                    处理时间差：Δt = t_bright - t_dark
                </p>
                <p class="text-center text-sm text-gray-400 mt-2">
                    亮区域处理更快，暗区域处理更慢
                </p>
            </div>
            
            <h3 class="text-xl font-bold mb-4 mt-6 text-white">色彩与感知</h3>
            <p class="text-gray-300 mb-4">
                色彩感知涉及物理和生理两个方面。光的波长决定了颜色，但大脑的解释会影响我们看到的色彩。
            </p>
            
            <div class="quote">
                <p class="text-gray-300">
                    "颜色不是物体的属性，而是光与物质相互作用的结果，以及大脑对这种作用的解释。"
                </p>
                <p class="text-neon-purple text-sm mt-2">— 艾萨克·牛顿</p>
            </div>
            
            <h3 class="text-xl font-bold mb-4 mt-6 text-white">量子力学与视觉</h3>
            <p class="text-gray-300 mb-4">
                在最基础的层面上，视觉始于光子与视网膜上感光分子的量子相互作用。单个光子就足以激活视杆细胞，这展示了视觉系统的惊人灵敏度。
            </p>
        `
    },
    
    art: {
        id: 'art',
        title: '艺术应用',
        icon: 'fa-palette',
        color: 'neon-yellow',
        content: `
            <h3 class="text-xl font-bold mb-4 text-white">M.C. 埃舍尔：不可能世界的建筑师</h3>
            <p class="text-gray-300 mb-4">
                荷兰艺术家 M.C.埃舍尔（Maurits Cornelis Escher）是将数学概念与视觉艺术完美结合的大师。他的作品深入探索了不可能图形、对称性、无限循环等主题。
            </p>
            
            <div class="grid md:grid-cols-2 gap-4 mb-6">
                <div class="bg-neon-yellow/10 rounded-xl p-4">
                    <h4 class="font-bold text-neon-yellow mb-2">《上升与下降》(1960)</h4>
                    <p class="text-sm text-gray-300">基于彭罗斯阶梯创作，展示了一群僧侣在不可能的楼梯上无限循环行走的场景。</p>
                </div>
                <div class="bg-neon-cyan/10 rounded-xl p-4">
                    <h4 class="font-bold text-neon-cyan mb-2">《瀑布》(1961)</h4>
                    <p class="text-sm text-gray-300">利用彭罗斯三角的原理，创造了永动机般的瀑布幻象。</p>
                </div>
            </div>
            
            <h3 class="text-xl font-bold mb-4 mt-6 text-white">欧普艺术（Op Art）</h3>
            <p class="text-gray-300 mb-4">
                欧普艺术是 20 世纪 60 年代兴起的艺术运动，专注于创造视觉错觉和运动感。代表艺术家包括维克多·瓦萨雷利和布里奇特·赖利。
            </p>
            
            <div class="quote">
                <p class="text-gray-300">
                    "艺术不是你所看到的，而是你让别人看到的。"
                </p>
                <p class="text-neon-yellow text-sm mt-2">— 埃德加·德加</p>
            </div>
            
            <h3 class="text-xl font-bold mb-4 mt-6 text-white">现代应用</h3>
            <p class="text-gray-300 mb-4">
                视觉错觉原理在现代设计中有广泛应用：
            </p>
            
            <div class="timeline">
                <div class="timeline-item">
                    <h4 class="font-bold text-neon-yellow mb-2">建筑设计</h4>
                    <p class="text-sm text-gray-300">利用透视和比例创造空间错觉，使建筑看起来更大或更有趣。</p>
                </div>
                <div class="timeline-item">
                    <h4 class="font-bold text-neon-yellow mb-2">平面设计</h4>
                    <p class="text-sm text-gray-300">在标志、海报和包装设计中使用错觉原理吸引注意力。</p>
                </div>
                <div class="timeline-item">
                    <h4 class="font-bold text-neon-yellow mb-2">电影特效</h4>
                    <p class="text-sm text-gray-300">强迫透视等技术用于创造视觉奇观，如《指环王》中的霍比特人。</p>
                </div>
                <div class="timeline-item">
                    <h4 class="font-bold text-neon-yellow mb-2">虚拟现实</h4>
                    <p class="text-sm text-gray-300">VR 技术依赖于对视觉系统的理解，创造沉浸式体验。</p>
                </div>
            </div>
        `
    }
};

export default learningModules;
