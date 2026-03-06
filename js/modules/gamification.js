/**
 * 游戏化系统模块
 * 包含成就系统、积分系统、排行榜系统
 */

import { storage } from '../utils/helpers.js';

/**
 * 成就配置
 */
const achievements = {
    // 探索类成就
    'first_exploration': {
        id: 'first_exploration',
        title: '初次探索',
        description: '首次访问视觉欺骗艺术馆',
        icon: 'fa-flag',
        points: 10,
        condition: (state) => state.exploredCount >= 1
    },
    'curious_visitor': {
        id: 'curious_visitor',
        title: '好奇访客',
        description: '探索 5 个不同的视觉错觉',
        icon: 'fa-eye',
        points: 50,
        condition: (state) => state.exploredCount >= 5
    },
    'dedicated_explorer': {
        id: 'dedicated_explorer',
        title: '专注探索者',
        description: '探索 15 个不同的视觉错觉',
        icon: 'fa-compass',
        points: 150,
        condition: (state) => state.exploredCount >= 15
    },
    'master_explorer': {
        id: 'master_explorer',
        title: '大师级探索者',
        description: '探索所有视觉错觉',
        icon: 'fa-trophy',
        points: 500,
        condition: (state) => state.exploredCount >= state.totalIllusions
    },
    
    // 学习类成就
    'knowledge_seeker': {
        id: 'knowledge_seeker',
        title: '知识追求者',
        description: '首次访问学习中心',
        icon: 'fa-book',
        points: 20,
        condition: (state) => state.visitedLearning
    },
    'neuroscience_fan': {
        id: 'neuroscience_fan',
        title: '神经科学爱好者',
        description: '完整阅读神经科学模块',
        icon: 'fa-brain',
        points: 100,
        condition: (state) => state.learningProgress.neuroscience >= 100
    },
    'math_enthusiast': {
        id: 'math_enthusiast',
        title: '数学爱好者',
        description: '完整阅读数学原理模块',
        icon: 'fa-calculator',
        points: 100,
        condition: (state) => state.learningProgress.mathematics >= 100
    },
    'physics_lover': {
        id: 'physics_lover',
        title: '物理学爱好者',
        description: '完整阅读物理学模块',
        icon: 'fa-atom',
        points: 100,
        condition: (state) => state.learningProgress.physics >= 100
    },
    'art_appreciator': {
        id: 'art_appreciator',
        title: '艺术鉴赏家',
        description: '完整阅读艺术应用模块',
        icon: 'fa-palette',
        points: 100,
        condition: (state) => state.learningProgress.art >= 100
    },
    'scholar': {
        id: 'scholar',
        title: '学者',
        description: '完成所有学习模块',
        icon: 'fa-graduation-cap',
        points: 500,
        condition: (state) => {
            const progress = state.learningProgress;
            return progress.neuroscience >= 100 && 
                   progress.mathematics >= 100 && 
                   progress.physics >= 100 && 
                   progress.art >= 100;
        }
    },
    
    // 互动类成就
    'interactive_user': {
        id: 'interactive_user',
        title: '互动达人',
        description: '与 10 个错觉进行互动',
        icon: 'fa-hand-pointer',
        points: 80,
        condition: (state) => state.interactionCount >= 10
    },
    'speed_demon': {
        id: 'speed_demon',
        title: '速度恶魔',
        description: '在 1 分钟内探索 5 个错觉',
        icon: 'fa-bolt',
        points: 200,
        condition: (state) => state.speedChallenge
    },
    'night_owl': {
        id: 'night_owl',
        title: '夜猫子',
        description: '在深夜 (23:00-5:00) 访问',
        icon: 'fa-moon',
        points: 50,
        condition: (state) => state.isNightVisit
    },
    
    // 特殊成就
    'perfectionist': {
        id: 'perfectionist',
        title: '完美主义者',
        description: '所有错觉评分都查看过原理',
        icon: 'fa-star',
        points: 300,
        condition: (state) => state.viewedAllPrinciples
    },
    'scientist': {
        id: 'scientist',
        title: '科学家',
        description: '查看所有错觉的数学和物理解释',
        icon: 'fa-flask',
        points: 1000,
        condition: (state) => state.viewedAllExplanations
    }
};

/**
 * 等级配置
 */
const levels = [
    { level: 1, title: '新手访客', minExp: 0, maxExp: 100 },
    { level: 2, title: '好奇探索者', minExp: 100, maxExp: 300 },
    { level: 3, title: '进阶学习者', minExp: 300, maxExp: 600 },
    { level: 4, title: '资深研究员', minExp: 600, maxExp: 1000 },
    { level: 5, title: '视觉大师', minExp: 1000, maxExp: 1500 },
    { level: 6, title: '感知专家', minExp: 1500, maxExp: 2200 },
    { level: 7, title: '错觉学者', minExp: 2200, maxExp: 3000 },
    { level: 8, title: '幻觉导师', minExp: 3000, maxExp: 4000 },
    { level: 9, title: '视觉传奇', minExp: 4000, maxExp: 5000 },
    { level: 10, title: '感知之神', minExp: 5000, maxExp: Infinity }
];

/**
 * 游戏化系统类
 */
class GamificationSystem {
    constructor() {
        this.state = {
            exp: 0,
            level: 1,
            totalPoints: 0,
            unlockedAchievements: [],
            exploredIllusions: new Set(),
            interactionCount: 0,
            visitedLearning: false,
            learningProgress: {
                neuroscience: 0,
                mathematics: 0,
                physics: 0,
                art: 0
            },
            viewedAllPrinciples: false,
            viewedAllExplanations: false,
            speedChallenge: false,
            isNightVisit: false,
            visitHistory: []
        };
        
        this.onAchievementUnlocked = null;
        this.onLevelUp = null;
        this.onExpChange = null;
    }
    
    /**
     * 初始化系统
     */
    init() {
        this.loadState();
        this.checkNightVisit();
        this.startSpeedChallenge();
        console.log('Gamification System initialized');
    }
    
    /**
     * 加载保存的状态
     */
    loadState() {
        const saved = storage.get('gamification_state');
        if (saved) {
            this.state = { ...this.state, ...saved };
            this.state.exploredIllusions = new Set(saved.exploredIllusions || []);
            this.state.unlockedAchievements = saved.unlockedAchievements || [];
        }
    }
    
    /**
     * 保存状态
     */
    saveState() {
        const toSave = {
            ...this.state,
            exploredIllusions: Array.from(this.state.exploredIllusions)
        };
        storage.set('gamification_state', toSave);
    }
    
    /**
     * 添加经验值
     */
    addExp(amount, reason = '') {
        const oldLevel = this.state.level;
        this.state.exp += amount;
        this.state.totalPoints += amount;
        
        // 检查升级
        const currentLevel = levels.find(l => l.level === this.state.level);
        if (this.state.exp >= currentLevel.maxExp) {
            this.state.level++;
            if (this.onLevelUp && this.state.level > oldLevel) {
                this.onLevelUp(this.state.level);
            }
        }
        
        if (this.onExpChange) {
            this.onExpChange(this.state.exp, this.state.level);
        }
        
        this.saveState();
        this.checkAchievements();
    }
    
    /**
     * 记录错觉探索
     */
    exploreIllusion(illusionId) {
        const isNew = !this.state.exploredIllusions.has(illusionId);
        this.state.exploredIllusions.add(illusionId);
        
        if (isNew) {
            this.addExp(20, `探索新错觉：${illusionId}`);
        }
        
        this.addInteraction();
        this.checkAchievements();
    }
    
    /**
     * 增加互动计数
     */
    addInteraction() {
        this.state.interactionCount++;
        this.saveState();
    }
    
    /**
     * 更新学习进度
     */
    updateLearningProgress(module, progress) {
        this.state.visitedLearning = true;
        this.state.learningProgress[module] = Math.min(100, progress);
        this.addExp(10, `学习进度：${module}`);
        this.saveState();
        this.checkAchievements();
    }
    
    /**
     * 检查成就解锁
     */
    checkAchievements() {
        const state = this.getState();
        
        Object.values(achievements).forEach(achievement => {
            if (!this.state.unlockedAchievements.includes(achievement.id)) {
                if (achievement.condition(state)) {
                    this.unlockAchievement(achievement);
                }
            }
        });
    }
    
    /**
     * 解锁成就
     */
    unlockAchievement(achievement) {
        this.state.unlockedAchievements.push(achievement.id);
        this.addExp(achievement.points, `成就解锁：${achievement.title}`);
        
        if (this.onAchievementUnlocked) {
            this.onAchievementUnlocked(achievement);
        }
        
        this.saveState();
        console.log(`🏆 成就解锁：${achievement.title}`);
    }
    
    /**
     * 获取当前状态
     */
    getState() {
        const totalIllusions = window.illusions?.length || 25;
        return {
            ...this.state,
            exploredCount: this.state.exploredIllusions.size,
            totalIllusions,
            nextLevelExp: levels[this.state.level - 1]?.maxExp || Infinity,
            expProgress: (this.state.exp / levels[this.state.level - 1]?.maxExp) * 100
        };
    }
    
    /**
     * 获取等级信息
     */
    getLevelInfo() {
        return levels[this.state.level - 1] || levels[levels.length - 1];
    }
    
    /**
     * 获取所有成就
     */
    getAllAchievements() {
        return Object.values(achievements).map(achievement => ({
            ...achievement,
            unlocked: this.state.unlockedAchievements.includes(achievement.id)
        }));
    }
    
    /**
     * 获取已解锁成就
     */
    getUnlockedAchievements() {
        return this.getAllAchievements().filter(a => a.unlocked);
    }
    
    /**
     * 检查夜间访问
     */
    checkNightVisit() {
        const hour = new Date().getHours();
        this.state.isNightVisit = (hour >= 23 || hour < 5);
    }
    
    /**
     * 开始速度挑战
     */
    startSpeedChallenge() {
        const startTime = Date.now();
        let count = 0;
        
        const originalExplore = this.exploreIllusion.bind(this);
        this.exploreIllusion = (illusionId) => {
            originalExplore(illusionId);
            count++;
            
            if (Date.now() - startTime < 60000 && count >= 5) {
                this.state.speedChallenge = true;
            }
        };
    }
    
    /**
     * 重置进度 (用于测试)
     */
    reset() {
        this.state = {
            exp: 0,
            level: 1,
            totalPoints: 0,
            unlockedAchievements: [],
            exploredIllusions: new Set(),
            interactionCount: 0,
            visitedLearning: false,
            learningProgress: {
                neuroscience: 0,
                mathematics: 0,
                physics: 0,
                art: 0
            },
            viewedAllPrinciples: false,
            viewedAllExplanations: false,
            speedChallenge: false,
            isNightVisit: false,
            visitHistory: []
        };
        this.saveState();
    }
}

// 导出单例
const gamification = new GamificationSystem();
export default gamification;
export { achievements, levels };
