/**
 * 高级错觉数据 - 深度内容版
 * 包含历史背景、应用场景、研究数据等丰富信息
 */

export const advancedIllusionData = [
    {
        id: 'penrose-triangle',
        name: '彭罗斯三角',
        subtitle: '不可能图形的经典代表',
        category: ['impossible', 'geometric'],
        discoverer: {
            name: '罗杰·彭罗斯',
            year: 1958,
            nationality: '英国',
            profession: '数学物理学家',
            bio: '罗杰·彭罗斯爵士是英国数学物理学家，以其在广义相对论和宇宙学方面的贡献闻名。他与父亲列奥尼尔·彭罗斯共同设计了彭罗斯三角。'
        },
        tags: ['不可能图形', '几何错觉', '三维悖论'],
        rating: 5,
        difficulty: '中等',
        viewTime: '2-3 分钟',
        principle: {
            summary: '彭罗斯三角是最著名的不可能图形之一。它看起来像一个立体的三角形，但实际上在三维空间中无法构造。',
            detailed: '彭罗斯三角由三个截面为正方形的长方体组成，这三个长方体两两互相垂直，形成一个三角形的三个边。问题在于，这种结构在三维空间中是不可能存在的——每条边看起来都同时朝向和远离观察者，创造了一个视觉悖论。这种错觉源于大脑对三维物体的自动解释机制，我们假设每条边都是连续的，但实际上图形的不同部分使用了不同的深度线索。',
            keyPoints: [
                '每条边都呈现正确的透视关系',
                '整体组合产生物理矛盾',
                '大脑无法同时处理所有深度线索',
                '局部合理但整体不可能'
            ]
        },
        history: {
            origin: '彭罗斯三角最早由瑞典艺术家奥斯卡·路透斯沃德在 1934 年创作，但直到 1958 年罗杰·彭罗斯在《英国心理学杂志》上发表文章后才广为人知。',
            evolution: '荷兰艺术家 M.C.埃舍尔在其著名版画《瀑布》(1961) 中使用了彭罗斯三角原理，描绘了一个永动机般的水流系统，使这个不可能图形闻名世界。',
            culturalImpact: '彭罗斯三角已成为"不可能"的代名词，出现在无数艺术作品、电影场景和科学教材中。'
        },
        science: {
            mathPrinciple: '彭罗斯三角可以用投影几何和拓扑学来分析。在三维欧几里得空间中，三角形的三个顶点不能同时满足"每个角都是 90°"的条件。但在二维投影中，通过巧妙安排各部分的深度线索，可以创造出看似合理的假象。数学上，这涉及到了非欧几里得几何的概念，以及投影变换中的信息丢失问题。',
            physicsPrinciple: '从物理学角度，彭罗斯三角揭示了我们的视觉系统如何处理深度信息。大脑使用多种线索(如遮挡、透视、阴影) 来判断物体的三维结构。当这些线索相互矛盾时，就会产生不可能的感知。神经科学研究表明，V2 和 V4 视觉皮层的神经元在整合局部信息为全局结构时遇到了冲突。',
            neuroscience: 'fMRI 研究显示，当观察彭罗斯三角时，大脑的侧枕叶皮层 (LOC) 显示出异常活动模式。这个区域负责物体识别，但在处理不可能图形时，它无法形成一致的三维表征。'
        },
        applications: {
            art: '埃舍尔的《瀑布》、《上升与下降》等作品',
            architecture: '日本名古屋的"彭罗斯三角"雕塑、澳大利亚珀斯的 Impossible Architecture 博物馆',
            psychology: '用于研究视觉感知和认知冲突的经典实验材料',
            education: '几何学、透视法、认知心理学的教学案例'
        },
        research: {
            studies: [
                {
                    title: 'Impossible figures in human vision',
                    authors: 'Penrose & Penrose',
                    year: 1958,
                    journal: 'British Journal of Psychology'
                },
                {
                    title: 'The perception of impossible objects',
                    authors: 'Hochberg',
                    year: 1968,
                    journal: 'Perception'
                }
            ],
            findings: '研究表明，即使知道彭罗斯三角是不可能的，大脑仍然无法"关闭"错觉效应。这说明视觉处理是自动化的，不受意识控制。'
        },
        hint: '点击图形可以切换颜色方案和旋转方向，尝试追踪边缘看看会发生什么！',
        interactiveElements: [
            '旋转视角观察不同角度的矛盾',
            '切换颜色模式增强错觉效果',
            '显示/隐藏辅助线理解构造原理',
            '3D 模式体验空间悖论'
        ],
        relatedIllusions: ['necker-cube', 'penrose-stairs', 'impossible-cube'],
        funFacts: [
            '彭罗斯三角在 1961 年被 M.C.埃舍尔用于其著名版画《瀑布》',
            '在特定角度下，可以用 3D 打印制作出"看起来像"彭罗斯三角的物体',
            '彭罗斯三角启发了电影《盗梦空间》中"不可能阶梯"的设计'
        ]
    },
    // 可以继续扩展其他错觉的详细数据...
];

// 错觉分类系统
export const illusionCategories = {
    impossible: {
        name: '不可能图形',
        description: '这些图形在二维平面上看起来合理，但在三维空间中无法存在',
        characteristics: ['局部合理', '整体矛盾', '挑战空间认知'],
        examples: ['彭罗斯三角', '彭罗斯阶梯', '不可能立方体'],
        science: '涉及投影几何、拓扑学和视觉系统的深度处理机制'
    },
    geometric: {
        name: '几何错觉',
        description: '基于几何形状和空间关系产生的错觉',
        characteristics: ['线条扭曲', '大小误判', '方向错觉'],
        examples: ['穆勒 - 莱耶错觉', '赫尔曼栅格', '咖啡墙错觉'],
        science: '与视网膜神经节细胞的侧抑制和视觉皮层的方向选择性有关'
    },
    motion: {
        name: '运动错觉',
        description: '静止图像产生运动幻觉',
        characteristics: ['动态感知', '眼睛微动触发', '亮度对比驱动'],
        examples: ['旋转蛇', '闪光延迟', '运动诱导盲'],
        science: '涉及 V5/MT 运动皮层的激活和时间 - 空间频谱分析'
    },
    cognitive: {
        name: '认知错觉',
        description: '高级认知过程导致的错觉',
        characteristics: ['双稳态感知', '主观轮廓', '图形 - 背景'],
        examples: ['卡尼莎三角', '鲁宾之杯', '内克尔方块'],
        science: '反映大脑的预测编码和贝叶斯推断机制'
    }
};

// 学习路径系统
export const learningPaths = {
    beginner: {
        title: '入门路径',
        description: '适合初次接触视觉错觉的学习者',
        duration: '30 分钟',
        illusions: ['hermann-grid', 'muller-lyer', 'kanizsa-triangle'],
        modules: ['neuroscience-basics', 'perception-101'],
        goals: ['理解基本错觉类型', '认识视觉系统工作原理']
    },
    intermediate: {
        title: '进阶路径',
        description: '有一定基础的学习者',
        duration: '1 小时',
        illusions: ['penrose-triangle', 'necker-cube', 'rotating-snakes'],
        modules: ['cognitive-neuroscience', 'geometry-of-vision'],
        goals: ['深入理解神经机制', '掌握数学原理']
    },
    advanced: {
        title: '高级路径',
        description: '深入研究视觉科学',
        duration: '2 小时',
        illusions: ['all-impossible', 'all-cognitive'],
        modules: ['predictive-coding', 'consciousness-studies'],
        goals: ['理解意识与感知关系', '探索前沿研究']
    }
};

// 应用场景数据库
export const applicationScenarios = {
    art: {
        title: '艺术创作',
        examples: [
            {
                artist: 'M.C.埃舍尔',
                works: ['瀑布', '上升与下降', '相对性'],
                techniques: ['不可能图形', '平面密铺', '视错觉']
            },
            {
                artist: '萨尔瓦多·达利',
                works: ['记忆的永恒', '十字架上的基督'],
                techniques: ['超现实主义', '双重影像']
            }
        ]
    },
    architecture: {
        title: '建筑设计',
        examples: [
            {
                building: 'Impossible Architecture Museum',
                location: '澳大利亚珀斯',
                features: ['彭罗斯三角结构', '不可能空间']
            },
            {
                building: '颠倒屋',
                location: '世界各地',
                features: ['重力错觉', '空间定向障碍']
            }
        ]
    },
    psychology: {
        title: '心理学研究',
        applications: [
            '感知机制研究',
            '注意力实验',
            '意识研究',
            '认知发展评估'
        ]
    },
    technology: {
        title: '技术应用',
        fields: [
            '虚拟现实 (VR) 深度渲染',
            '增强现实 (AR) 空间定位',
            '计算机视觉算法',
            'UI/UX 设计优化'
        ]
    }
};

export default advancedIllusionData;
