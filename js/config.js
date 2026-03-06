/**
 * 应用配置文件
 * 包含应用的所有配置项
 */

export const config = {
    // 应用基本信息
    app: {
        name: '视觉欺骗艺术馆',
        version: '2.0.0',
        description: '探索人类感知边界的科幻科普互动空间站',
        author: 'Visual Security Team'
    },
    
    // 主题配置
    theme: {
        colors: {
            void: '#0a0a12',
            abyss: '#12121f',
            neonCyan: '#00f5d4',
            neonPink: '#ff006e',
            neonPurple: '#8338ec',
            neonYellow: '#ffbe0b',
            glass: 'rgba(255, 255, 255, 0.05)',
            glassBorder: 'rgba(255, 255, 255, 0.1)'
        },
        fonts: {
            display: 'Orbitron',
            body: 'Inter'
        }
    },
    
    // 动画配置
    animation: {
        duration: {
            fast: 200,
            normal: 400,
            slow: 600
        },
        easing: {
            default: 'ease',
            easeInOut: 'ease-in-out',
            easeOut: 'ease-out',
            easeIn: 'ease-in'
        }
    },
    
    // 页面配置
    pages: {
        home: {
            title: '首页',
            path: '/',
            enabled: true
        },
        gallery: {
            title: '图库',
            path: '/gallery',
            enabled: true
        },
        learn: {
            title: '学习中心',
            path: '/learn',
            enabled: true
        },
        about: {
            title: '关于',
            path: '/about',
            enabled: true
        },
        detail: {
            title: '详情',
            path: '/detail',
            enabled: true
        }
    },
    
    // 学习模块配置
    learningModules: {
        neuroscience: {
            id: 'neuroscience',
            title: '神经科学基础',
            icon: 'fa-brain',
            color: 'neonCyan',
            order: 1
        },
        mathematics: {
            id: 'mathematics',
            title: '数学原理',
            icon: 'fa-calculator',
            color: 'neonPink',
            order: 2
        },
        physics: {
            id: 'physics',
            title: '物理学解释',
            icon: 'fa-atom',
            color: 'neonPurple',
            order: 3
        },
        art: {
            id: 'art',
            title: '艺术应用',
            icon: 'fa-palette',
            color: 'neonYellow',
            order: 4
        }
    },
    
    // 分类配置
    categories: {
        impossible: {
            id: 'impossible',
            title: '不可能图形',
            icon: 'fa-cube',
            description: '挑战三维空间认知边界的图形'
        },
        geometric: {
            id: 'geometric',
            title: '几何错觉',
            icon: 'fa-shapes',
            description: '基于几何形状的视觉错觉'
        },
        motion: {
            id: 'motion',
            title: '运动错觉',
            icon: 'fa-sync-alt',
            description: '产生运动幻觉的静态图像'
        },
        cognitive: {
            id: 'cognitive',
            title: '认知错觉',
            icon: 'fa-brain',
            description: '涉及认知处理的视觉错觉'
        }
    },
    
    // 性能配置
    performance: {
        lazyLoading: true,
        cacheEnabled: true,
        particleEffect: {
            enabled: true,
            density: 0.05 // 鼠标移动时产生粒子的概率
        }
    },
    
    // 本地存储键名
    storageKeys: {
        exploredIllusions: 'explored_illusions',
        userPreferences: 'user_preferences',
        learningProgress: 'learning_progress'
    }
};

export default config;
