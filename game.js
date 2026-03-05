// ========== بيانات اللعبة الأساسية ==========
let gameState = {
    currentScreen: 'loading',
    currentLevel: 1,
    maxLevel: 60,
    score: 0,
    coins: 0,
    hearts: 5,
    maxHearts: 5,
    lastHeartRegen: Date.now(),
    characters: [],
    selectedCharacter: 'pikachu',
    unlockedWorlds: [true, false, false],
    completedLevels: [],
    currentPower: null,
    activePowers: {
        brain: true,
        shadow: false,
        challenge: false
    },
    powerCooldowns: {
        intelligence: 0,
        focus: 0,
        memory: 0,
        quickDecision: 0,
        invisibility: 0,
        sneak: 0,
        shadowJump: 0,
        shadowClone: 0,
        courage: 0,
        speed: 0,
        balance: 0,
        luck: 0
    },
    gameSpeed: 5,
    obstacles: [],
    coins: [],
    powers: [],
    gameRunning: false,
    soundEnabled: true,
    musicEnabled: true,
    vibrateEnabled: true,
    currentMode: 'normal', // normal, night, rain, fire, ice, space
    dailyChallenges: [],
    weeklyChallenge: null,
    lastDailyReset: Date.now()
};

// ========== جميع الشخصيات (20 شخصية كاملة) ==========
const characters = [
    { id: 'pikachu', name: 'بيكاتشو', image: 'https://i.ibb.co/6J7X0qR/pikachu-running.gif', price: 0, unlocked: true, power: 'electric' },
    { id: 'pikachu-rock', name: 'بيكاتشو روك', image: 'https://i.ibb.co/6J7X0qR/pikachu-running.gif', price: 1000, unlocked: false, power: 'rock' },
    { id: 'alien-green', name: 'كائن فضائي أخضر', image: 'https://i.ibb.co/6J7X0qR/pikachu-running.gif', price: 500, unlocked: false, power: 'laser' },
    { id: 'space-robot', name: 'روبوت فضائي', image: 'https://i.ibb.co/6J7X0qR/pikachu-running.gif', price: 1500, unlocked: false, power: 'mech' },
    { id: 'space-cat', name: 'قط فضائي', image: 'https://i.ibb.co/6J7X0qR/pikachu-running.gif', price: 800, unlocked: false, power: 'speed' },
    { id: 'space-dino', name: 'ديناصور فضائي', image: 'https://i.ibb.co/6J7X0qR/pikachu-running.gif', price: 2000, unlocked: false, power: 'strength' },
    { id: 'pikachu-ninja', name: 'بيكاتشو نينجا', image: 'https://i.ibb.co/6J7X0qR/pikachu-running.gif', price: 2500, unlocked: false, power: 'stealth' },
    { id: 'ice-alien', name: 'كائن الثلج', image: 'https://i.ibb.co/6J7X0qR/pikachu-running.gif', price: 1200, unlocked: false, power: 'ice' },
    { id: 'fire-alien', name: 'كائن النار', image: 'https://i.ibb.co/6J7X0qR/pikachu-running.gif', price: 1200, unlocked: false, power: 'fire' },
    { id: 'space-princess', name: 'الأميرة الفضائية', image: 'https://i.ibb.co/6J7X0qR/pikachu-running.gif', price: 3000, unlocked: false, power: 'magic' },
    { id: 'masked-alien', name: 'الغامض المقنع', image: 'https://i.ibb.co/6J7X0qR/pikachu-running.gif', price: 1800, unlocked: false, power: 'mystery' },
    { id: 'cute-monster', name: 'الوحش اللطيف', image: 'https://i.ibb.co/6J7X0qR/pikachu-running.gif', price: 600, unlocked: false, power: 'cute' },
    { id: 'super-pikachu', name: 'سوبر بيكاتشو', image: 'https://i.ibb.co/6J7X0qR/pikachu-running.gif', price: 5000, unlocked: false, power: 'super' },
    { id: 'giant-alien', name: 'الفضائي العملاق', image: 'https://i.ibb.co/6J7X0qR/pikachu-running.gif', price: 4000, unlocked: false, power: 'giant' },
    { id: 'pikachu-zombie', name: 'بيكاتشو زومبي', image: 'https://i.ibb.co/6J7X0qR/pikachu-running.gif', price: 3500, unlocked: false, power: 'undead' },
    { id: 'ghost-alien', name: 'كائن الشبح', image: 'https://i.ibb.co/6J7X0qR/pikachu-running.gif', price: 2800, unlocked: false, power: 'ghost' },
    { id: 'silver-robot', name: 'الآلي الفضي', image: 'https://i.ibb.co/6J7X0qR/pikachu-running.gif', price: 2200, unlocked: false, power: 'tech' },
    { id: 'flying-alien', name: 'الكائن الطائر', image: 'https://i.ibb.co/6J7X0qR/pikachu-running.gif', price: 1600, unlocked: false, power: 'fly' },
    { id: 'winter-pikachu', name: 'بيكاتشو الشتاء', image: 'https://i.ibb.co/6J7X0qR/pikachu-running.gif', price: 2000, unlocked: false, power: 'snow' },
    { id: 'final-boss', name: 'الزعيم الأخير', image: 'https://i.ibb.co/6J7X0qR/pikachu-running.gif', price: 10000, unlocked: false, power: 'boss' }
];

// ========== جميع القوى (12 قوة كاملة) ==========
const powers = {
    // قوى العقل 🧠
    intelligence: {
        name: 'قوة الذكاء',
        icon: '🧠',
        group: 'brain',
        description: 'تطلع معادلة رياضية سريعة',
        cooldown: 30000, // 30 ثانية
        duration: 0
    },
    focus: {
        name: 'قوة التركيز',
        icon: '🎯',
        group: 'brain',
        description: 'نمط ألوان لازم تحفظيه',
        cooldown: 45000,
        duration: 5000
    },
    memory: {
        name: 'قوة الذاكرة',
        icon: '📝',
        group: 'brain',
        description: '3 بوابات، وحدة صح',
        cooldown: 40000,
        duration: 0
    },
    quickDecision: {
        name: 'قوة القرار السريع',
        icon: '⚡',
        group: 'brain',
        description: 'سؤال صح أو خطأ',
        cooldown: 35000,
        duration: 0
    },
    
    // قوى الظل 🌫️
    invisibility: {
        name: 'قوة الاختفاء',
        icon: '👻',
        group: 'shadow',
        description: 'تمرّي بدون ضرر',
        cooldown: 60000,
        duration: 5000
    },
    sneak: {
        name: 'قوة التسلل',
        icon: '🥷',
        group: 'shadow',
        description: 'تمرّي من جنب الحارس',
        cooldown: 55000,
        duration: 3000
    },
    shadowJump: {
        name: 'قفزة الظل',
        icon: '🌑',
        group: 'shadow',
        description: 'تنتقلي للجهة الثانية فوراً',
        cooldown: 70000,
        duration: 0
    },
    shadowClone: {
        name: 'نسخة الظل',
        icon: '👥',
        group: 'shadow',
        description: 'نسخة تختفي بدالك',
        cooldown: 120000,
        duration: 10000
    },
    
    // قوى التحدي ⚡
    courage: {
        name: 'قوة الشجاعة',
        icon: '🦁',
        group: 'challenge',
        description: 'تختاري طريق بسرعة',
        cooldown: 50000,
        duration: 0
    },
    speed: {
        name: 'السرعة الخارقة',
        icon: '💨',
        group: 'challenge',
        description: 'تجاوزي حواجز بسرعة',
        cooldown: 65000,
        duration: 7000
    },
    balance: {
        name: 'قوة التوازن',
        icon: '⚖️',
        group: 'challenge',
        description: 'تمشي على جسر ضيق',
        cooldown: 55000,
        duration: 4000
    },
    luck: {
        name: 'قوة الحظ',
        icon: '🍀',
        group: 'challenge',
        description: 'صندوق مفاجأة',
        cooldown: 90000,
        duration: 0
    }
};

// ========== جميع المراحل (60 مرحلة) ==========
const levels = [
    // المجموعة الأولى: البداية (1-20)
    { id: 1, world: 1, name: 'انطلاق', background: 'day', obstacles: ['spike'], coins: 10, speed: 3 },
    { id: 2, world: 1, name: 'غابة', background: 'forest', obstacles: ['spike', 'pit'], coins: 15, speed: 3.2 },
    { id: 3, world: 1, name: 'نهر', background: 'day', obstacles: ['pit'], coins: 12, speed: 3.3 },
    { id: 4, world: 1, name: 'جبل', background: 'forest', obstacles: ['spike', 'spike'], coins: 18, speed: 3.4 },
    { id: 5, world: 1, name: 'وادي', background: 'day', obstacles: ['pit', 'spike'], coins: 20, speed: 3.5 },
    { id: 6, world: 1, name: 'كهف', background: 'night', obstacles: ['laser'], coins: 22, speed: 3.6 },
    { id: 7, world: 1, name: 'شلال', background: 'forest', obstacles: ['spike', 'laser'], coins: 25, speed: 3.7 },
    { id: 8, world: 1, name: 'صحراء', background: 'desert', obstacles: ['pit', 'pit'], coins: 20, speed: 3.8 },
    { id: 9, world: 1, name: 'واحة', background: 'desert', obstacles: ['spike', 'guard'], coins: 30, speed: 3.9 },
    { id: 10, world: 1, name: 'هرم', background: 'desert', obstacles: ['guard', 'laser'], coins: 35, speed: 4 },
    { id: 11, world: 1, name: 'غابة مطيرة', background: 'forest', obstacles: ['spike', 'pit', 'laser'], coins: 28, speed: 4.1 },
    { id: 12, world: 1, name: 'نفق', background: 'night', obstacles: ['laser', 'guard'], coins: 32, speed: 4.2 },
    { id: 13, world: 1, name: 'جسر', background: 'day', obstacles: ['pit', 'spike', 'guard'], coins: 35, speed: 4.3 },
    { id: 14, world: 1, name: 'غروب', background: 'night', obstacles: ['laser', 'laser'], coins: 38, speed: 4.4 },
    { id: 15, world: 1, name: 'نجوم', background: 'night', obstacles: ['spike', 'pit', 'guard'], coins: 40, speed: 4.5 },
    { id: 16, world: 1, name: 'قمر', background: 'night', obstacles: ['guard', 'laser', 'spike'], coins: 42, speed: 4.6 },
    { id: 17, world: 1, name: 'مذنب', background: 'space', obstacles: ['laser', 'pit'], coins: 45, speed: 4.7 },
    { id: 18, world: 1, name: 'كوكب', background: 'space', obstacles: ['spike', 'guard', 'laser'], coins: 48, speed: 4.8 },
    { id: 19, world: 1, name: 'مجرة', background: 'space', obstacles: ['pit', 'laser', 'guard'], coins: 50, speed: 4.9 },
    { id: 20, world: 1, name: 'زعيم الغابة', background: 'forest', obstacles: ['boss'], coins: 100, speed: 5 },
    
    // المجموعة الثانية: الظل (21-40)
    { id: 21, world: 2, name: 'بداية الظل', background: 'night', obstacles: ['spike', 'ghost'], coins: 55, speed: 5.2 },
    { id: 22, world: 2, name: 'ضباب', background: 'night', obstacles: ['laser', 'ghost'], coins: 58, speed: 5.4 },
    { id: 23, world: 2, name: 'أشباح', background: 'night', obstacles: ['ghost', 'spike'], coins: 60, speed: 5.6 },
    { id: 24, world: 2, name: 'ظلام', background: 'night', obstacles: ['ghost', 'laser', 'pit'], coins: 62, speed: 5.8 },
    { id: 25, world: 2, name: 'صوت غامض', background: 'night', obstacles: ['guard', 'ghost'], coins: 65, speed: 6 },
    { id: 26, world: 2, name: 'مدينة الأشباح', background: 'city', obstacles: ['laser', 'ghost', 'guard'], coins: 68, speed: 6.2 },
    { id: 27, world: 2, name: 'مقبرة', background: 'night', obstacles: ['ghost', 'ghost', 'spike'], coins: 70, speed: 6.4 },
    { id: 28, world: 2, name: 'قلعة مهجورة', background: 'castle', obstacles: ['guard', 'laser', 'ghost'], coins: 72, speed: 6.6 },
    { id: 29, world: 2, name: 'غابة مسحورة', background: 'forest', obstacles: ['ghost', 'pit', 'spike'], coins: 75, speed: 6.8 },
    { id: 30, world: 2, name: 'بوابة الظل', background: 'night', obstacles: ['boss-shadow'], coins: 150, speed: 7 },
    
    // المجموعة الثالثة: التحدي (41-60)
    { id: 41, world: 3, name: 'نار', background: 'volcano', obstacles: ['fire', 'spike'], coins: 80, speed: 7.5 },
    { id: 42, world: 3, name: 'حمم', background: 'volcano', obstacles: ['fire', 'pit', 'laser'], coins: 82, speed: 7.7 },
    { id: 43, world: 3, name: 'دخان', background: 'volcano', obstacles: ['fire', 'guard'], coins: 85, speed: 7.9 },
    { id: 44, world: 3, name: 'بركان', background: 'volcano', obstacles: ['fire', 'fire', 'spike'], coins: 88, speed: 8.1 },
    { id: 45, world: 3, name: 'جليد', background: 'snow', obstacles: ['ice', 'pit'], coins: 90, speed: 8.3 },
    { id: 46, world: 3, name: 'عاصفة ثلجية', background: 'snow', obstacles: ['ice', 'laser', 'guard'], coins: 92, speed: 8.5 },
    { id: 47, world: 3, name: 'جبل جليدي', background: 'snow', obstacles: ['ice', 'spike', 'pit'], coins: 95, speed: 8.7 },
    { id: 48, world: 3, name: 'كهف ثلجي', background: 'snow', obstacles: ['ice', 'ghost'], coins: 98, speed: 8.9 },
    { id: 49, world: 3, name: 'فضاء', background: 'space', obstacles: ['meteor', 'laser'], coins: 100, speed: 9.1 },
    { id: 50, world: 3, name: 'ثقب أسود', background: 'space', obstacles: ['meteor', 'ghost', 'laser'], coins: 105, speed: 9.3 },
    { id: 51, world: 3, name: 'نيازك', background: 'space', obstacles: ['meteor', 'spike', 'pit'], coins: 110, speed: 9.5 },
    { id: 52, world: 3, name: 'محطة فضائية', background: 'space', obstacles: ['guard', 'laser', 'meteor'], coins: 115, speed: 9.7 },
    { id: 53, world: 3, name: 'كوكب ناري', background: 'volcano', obstacles: ['fire', 'meteor'], coins: 120, speed: 9.9 },
    { id: 54, world: 3, name: 'كوكب جليدي', background: 'snow', obstacles: ['ice', 'meteor'], coins: 125, speed: 10.1 },
    { id: 55, world: 3, name: 'كوكب غامض', background: 'night', obstacles: ['ghost', 'meteor', 'laser'], coins: 130, speed: 10.3 },
    { id: 56, world: 3, name: 'مجرة بعيدة', background: 'space', obstacles: ['meteor', 'meteor', 'laser'], coins: 135, speed: 10.5 },
    { id: 57, world: 3, name: 'نجم عملاق', background: 'space', obstacles: ['fire', 'meteor', 'guard'], coins: 140, speed: 10.7 },
    { id: 58, world: 3, name: 'سوبرنوفا', background: 'space', obstacles: ['meteor', 'fire', 'ghost'], coins: 145, speed: 10.9 },
    { id: 59, world: 3, name: 'نهاية الكون', background: 'space', obstacles: ['meteor', 'laser', 'fire', 'ice', 'ghost'], coins: 150, speed: 11.1 },
    { id: 60, world: 3, name: 'الزعيم الأخير', background: 'space', obstacles: ['boss-final'], coins: 500, speed: 12 }
];

// الأصوات (روابط مباشرة)
const sounds = {
    background: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coin: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    jump: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    powerup: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    gameover: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    win: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    correct: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    wrong: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    invisibility: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    speed: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    explosion: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    magic: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3'
};

// ========== التحديات اليومية والأسبوعية ==========
function generateDailyChallenges() {
    const challenges = [
        { id: 1, name: 'اجمع 100 عملة', target: 100, type: 'coins', reward: 50 },
        { id: 2, name: 'اكمل 5 مراحل', target: 5, type: 'levels', reward: 75 },
        { id: 3, name: 'استخدم قوة الذكاء 3 مرات', target: 3, type: 'power', power: 'intelligence', reward: 60 },
        { id: 4, name: 'تجاوز 50 عقبة', target: 50, type: 'obstacles', reward: 80 },
        { id: 5, name: 'العب 10 دقائق', target: 10, type: 'time', reward: 100 }
    ];
    
    // اختيار 3 تحديات عشوائية
    gameState.dailyChallenges = [];
    for (let i = 0; i < 3; i++) {
        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        gameState.dailyChallenges.push({
            ...randomChallenge,
            progress: 0,
            completed: false
        });
    }
}

function generateWeeklyChallenge() {
    const weeklyChallenges = [
        { name: 'أكمل 30 مرحلة', target: 30, type: 'levels', reward: 500 },
        { name: 'اجمع 1000 عملة', target: 1000, type: 'coins', reward: 750 },
        { name: 'استخدم كل القوى 10 مرات', target: 10, type: 'all-powers', reward: 1000 },
        { name: 'افتح 5 شخصيات', target: 5, type: 'characters', reward: 800 },
        { name: 'وصل للمرحلة 60', target: 60, type: 'level-reach', reward: 1500 }
    ];
    
    gameState.weeklyChallenge = {
        ...weeklyChallenges[Math.floor(Math.random() * weeklyChallenges.length)],
        progress: 0,
        completed: false
    };
}

// ========== تهيئة اللعبة ==========
window.onload = function() {
    // تجهيز الشخصيات
    gameState.characters = characters;
    
    // تجهيز التحديات
    generateDailyChallenges();
    generateWeeklyChallenge();
    
    // عرض شاشة التحميل لمدة 3 ثواني
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
        document.getElementById('start-screen').classList.remove('hidden');
        
        // تحميل الشخصيات في الشاشة
        loadCharactersGrid();
        
        // تحديث العملات والأرواح
        updateCoinsDisplay();
        updateHeartsDisplay();
        
        // بدء مؤقت تجديد الأرواح
        startHeartRegenTimer();
    }, 3000);
};

// ========== عرض الشخصيات ==========
function loadCharactersGrid() {
    const grid = document.getElementById('characters-grid');
    grid.innerHTML = '';
    
    gameState.characters.forEach(char => {
        const card = document.createElement('div');
        card.className = `character-card ${char.unlocked ? 'unlocked' : 'locked'} ${gameState.selectedCharacter === char.id ? 'selected' : ''}`;
        card.onclick = () => selectCharacter(char.id);
        
        card.innerHTML = `
            <img src="${char.image}" alt="${char.name}">
            <div class="character-name">${char.name}</div>
            ${!char.unlocked ? `<div class="character-locked">🔒 ${char.price}</div>` : ''}
        `;
        
        grid.appendChild(card);
    });
}

function selectCharacter(id) {
    const char = gameState.characters.find(c => c.id === id);
    
    if (char.unlocked) {
        gameState.selectedCharacter = id;
        document.getElementById('preview-character').src = char.image;
        loadCharactersGrid();
        playSound('magic');
    } else {
        if (gameState.coins >= char.price) {
            gameState.coins -= char.price;
            char.unlocked = true;
            updateCoinsDisplay();
            selectCharacter(id);
            playSound('powerup');
        } else {
            alert('💰 ما عندك عملات كافية!');
        }
    }
}

// ========== نظام الأرواح ==========
function startHeartRegenTimer() {
    setInterval(() => {
        if (gameState.hearts < gameState.maxHearts) {
            const now = Date.now();
            if (now - gameState.lastHeartRegen >= 900000) { // 15 دقيقة
                gameState.hearts++;
                gameState.lastHeartRegen = now;
                updateHeartsDisplay();
            }
        }
    }, 60000); // كل دقيقة
}

function updateHeartsDisplay() {
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        if (index < gameState.hearts) {
            heart.style.opacity = '1';
        } else {
            heart.style.opacity = '0.3';
        }
    });
}

function useHeart() {
    if (gameState.hearts > 0) {
        gameState.hearts--;
        updateHeartsDisplay();
        
        if (gameState.hearts === 0) {
            gameOver();
        }
        return true;
    }
    return false;
}

// ========== نظام العملات ==========
function updateCoinsDisplay() {
    document.getElementById('total-coins').textContent = gameState.coins;
    document.getElementById('game-coins').textContent = gameState.coins;
}

function addCoins(amount) {
    gameState.coins += amount;
    updateCoinsDisplay();
    playSound('coin');
}

// ========== بدء اللعبة ==========
function startGame() {
    hideAllScreens();
    document.getElementById('game-screen').classList.remove('hidden');
    document.getElementById('game-character').src = characters.find(c => c.id === gameState.selectedCharacter).image;
    
    gameState.gameRunning = true;
    gameState.currentLevel = 1;
    gameState.score = 0;
    
    loadLevel(gameState.currentLevel);
    startGameLoop();
    
    if (gameState.musicEnabled) {
        playBackgroundMusic();
    }
}

function loadLevel(levelId) {
    const level = levels[levelId - 1];
    gameState.gameSpeed = level.speed;
    
    // تغيير الخلفية
    const bgLayer = document.getElementById('background-layer');
    bgLayer.className = 'background-layer';
    bgLayer.classList.add(`bg-${level.background}`);
    
    // إضافة تأثير الوضع الليلي إذا كان مفعل
    if (gameState.currentMode === 'night') {
        bgLayer.classList.add('night-mode');
    }
}

// ========== حلقة اللعبة الرئيسية ==========
function startGameLoop() {
    const gameInterval = setInterval(() => {
        if (!gameState.gameRunning) {
            clearInterval(gameInterval);
            return;
        }
        
        updateGame();
    }, 50);
}

function updateGame() {
    // تحريك العقبات
    moveObstacles();
    
    // تحريك العملات
    moveCoins();
    
    // التحقق من التصادمات
    checkCollisions();
    
    // إضافة عقبات جديدة
    if (Math.random() < 0.02) {
        generateObstacle();
    }
    
    // إضافة عملات جديدة
    if (Math.random() < 0.05) {
        generateCoin();
    }
    
    // تحديث النقاط
    gameState.score += 1;
    document.getElementById('game-score').textContent = gameState.score;
}

// ========== توليد العقبات ==========
function generateObstacle() {
    const level = levels[gameState.currentLevel - 1];
    if (!level) return;
    
    const obstacleTypes = level.obstacles;
    if (obstacleTypes.length === 0) return;
    
    const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    
    const obstacle = {
        id: Date.now() + Math.random(),
        type: type,
        x: window.innerWidth,
        y: 50, // ارتفاع القاع
        width: type === 'pit' ? 80 : 40,
        height: 40,
        active: true
    };
    
    gameState.obstacles.push(obstacle);
    
    // عرض العقبة في DOM
    const obstacleElement = document.createElement('div');
    obstacleElement.className = `obstacle obstacle-${type}`;
    obstacleElement.id = `obstacle-${obstacle.id}`;
    obstacleElement.style.left = obstacle.x + 'px';
    document.getElementById('tracks-container').appendChild(obstacleElement);
}

function generateCoin() {
    const coin = {
        id: Date.now() + Math.random(),
        x: window.innerWidth,
        y: 60 + Math.random() * 50,
        width: 30,
        height: 30,
        value: Math.floor(Math.random() * 5) + 1,
        active: true
    };
    
    gameState.coins.push(coin);
    
    const coinElement = document.createElement('div');
    coinElement.className = 'coin';
    coinElement.id = `coin-${coin.id}`;
    coinElement.style.left = coin.x + 'px';
    coinElement.style.bottom = coin.y + 'px';
    document.getElementById('tracks-container').appendChild(coinElement);
}

function moveObstacles() {
    gameState.obstacles.forEach(obstacle => {
        if (obstacle.active) {
            obstacle.x -= gameState.gameSpeed;
            
            const element = document.getElementById(`obstacle-${obstacle.id}`);
            if (element) {
                element.style.left = obstacle.x + 'px';
            }
            
            if (obstacle.x < -100) {
                obstacle.active = false;
                if (element) element.remove();
            }
        }
    });
    
    gameState.obstacles = gameState.obstacles.filter(o => o.active);
}

function moveCoins() {
    gameState.coins.forEach(coin => {
        if (coin.active) {
            coin.x -= gameState.gameSpeed;
            
            const element = document.getElementById(`coin-${coin.id}`);
            if (element) {
                element.style.left = coin.x + 'px';
            }
            
            if (coin.x < -100) {
                coin.active = false;
                if (element) element.remove();
            }
        }
    });
    
    gameState.coins = gameState.coins.filter(c => c.active);
}

// ========== التصادمات ==========
function checkCollisions() {
    const character = document.getElementById('character-container');
    const characterRect = {
        x: 50,
        y: 50,
        width: 80,
        height: 80
    };
    
    // التصادم مع العملات
    gameState.coins.forEach(coin => {
        if (coin.active) {
            if (checkRectCollision(characterRect, coin)) {
                collectCoin(coin);
            }
        }
    });
    
    // التصادم مع العقبات
    gameState.obstacles.forEach(obstacle => {
        if (obstacle.active) {
            if (checkRectCollision(characterRect, obstacle)) {
                hitObstacle(obstacle);
            }
        }
    });
}

function checkRectCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function collectCoin(coin) {
    coin.active = false;
    const element = document.getElementById(`coin-${coin.id}`);
    if (element) element.remove();
    
    addCoins(coin.value);
    gameState.score += coin.value * 10;
}

function hitObstacle(obstacle) {
    // التحقق من القوى النشطة
    if (gameState.activePowers.invisibility || 
        gameState.activePowers.sneak || 
        gameState.activePowers.shadowClone) {
        return; // محمية بقوة
    }
    
    obstacle.active = false;
    const element = document.getElementById(`obstacle-${obstacle.id}`);
    if (element) element.remove();
    
    // تفعيل قوة الذكاء إذا كانت العقبة تتطلب ذلك
    if (obstacle.type === 'math' || obstacle.type === 'boss') {
        showMathQuestion();
    } else if (obstacle.type === 'memory') {
        showMemoryGame();
    } else if (obstacle.type === 'narrow') {
        activatePower('tiger');
    } else if (obstacle.type === 'spike' || obstacle.type === 'laser') {
        if (gameState.activePowers.brain) {
            // نقدر نستخدم قوة الاختفاء
            showPowerChoice('invisibility');
        } else {
            // خسارة روح
            if (!useHeart()) {
                gameOver();
            }
        }
    } else {
        // خسارة روح عادية
        if (!useHeart()) {
            gameOver();
        }
    }
}

// ========== نظام القوى ==========
function activatePower(powerId) {
    const power = powers[powerId];
    if (!power) return;
    
    // التحقق من الكولداون
    const lastUsed = gameState.powerCooldowns[powerId];
    if (lastUsed > Date.now()) {
        const remaining = Math.ceil((lastUsed - Date.now()) / 1000);
        alert(`⏳ لازم تنتظري ${remaining} ثانية`);
        return;
    }
    
    // التحقق من المجموعة مفعلة
    if (!gameState.activePowers[power.group]) return;
    
    // تفعيل القوة
    gameState.powerCooldowns[powerId] = Date.now() + power.cooldown;
    
    playSound('powerup');
    
    switch(powerId) {
        case 'intelligence':
            showMathQuestion();
            break;
        case 'focus':
            showPatternGame();
            break;
        case 'memory':
            showMemoryGame();
            break;
        case 'quickDecision':
            showTrueFalse();
            break;
        case 'invisibility':
            activateInvisibility(power.duration);
            break;
        case 'sneak':
            activateSneak(power.duration);
            break;
        case 'shadowJump':
            activateShadowJump();
            break;
        case 'shadowClone':
            activateShadowClone(power.duration);
            break;
        case 'courage':
            showCourageChoice();
            break;
        case 'speed':
            activateSpeed(power.duration);
            break;
        case 'balance':
            showBalanceGame();
            break;
        case 'luck':
            showLuckBox();
            break;
    }
}

// قوى العقل 🧠
function showMathQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = num1 * num2;
    const wrongAnswers = [
        correctAnswer + Math.floor(Math.random() * 5) + 1,
        correctAnswer - Math.floor(Math.random() * 5) - 1
    ];
    
    const answers = [correctAnswer, ...wrongAnswers];
    answers.sort(() => Math.random() - 0.5);
    
    document.getElementById('math-question').textContent = `${num1} × ${num2} = ؟`;
    
    const buttons = document.querySelectorAll('.math-btn');
    buttons.forEach((btn, index) => {
        btn.textContent = answers[index];
        btn.onclick = () => checkMathAnswer(answers[index], correctAnswer);
    });
    
    document.getElementById('math-popup').classList.remove('hidden');
    gameState.gameRunning = false;
}

function checkMathAnswer(answer, correct) {
    document.getElementById('math-popup').classList.add('hidden');
    
    if (answer === correct) {
        playSound('correct');
        gameState.score += 100;
        // تدمير العقبة
        destroyCurrentObstacle();
    } else {
        playSound('wrong');
        gameState.gameSpeed *= 0.7; // تبطيء لمدة ثانية
        setTimeout(() => {
            gameState.gameSpeed /= 0.7;
        }, 1000);
    }
    
    gameState.gameRunning = true;
}

function showPatternGame() {
    const colors = ['#FF4444', '#44FF44', '#4444FF', '#FFFF44', '#FF44FF'];
    const pattern = [];
    for (let i = 0; i < 3; i++) {
        pattern.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    
    const display = document.getElementById('pattern-display');
    const boxes = display.children;
    
    // عرض النمط
    for (let i = 0; i < 3; i++) {
        boxes[i].style.backgroundColor = pattern[i];
    }
    
    gameState.currentPattern = pattern;
    document.getElementById('pattern-popup').classList.remove('hidden');
    gameState.gameRunning = false;
}

function startPatternReplay() {
    // إخفاء النمط
    const boxes = document.getElementById('pattern-display').children;
    for (let i = 0; i < 3; i++) {
        boxes[i].style.backgroundColor = '#ccc';
    }
    
    // تجهيز لإعادة النمط
    gameState.patternReplay = [];
    gameState.patternStep = 0;
}

function replayPattern(color) {
    gameState.patternReplay.push(color);
    gameState.patternStep++;
    
    if (gameState.patternStep === 3) {
        // التحقق من النمط
        let correct = true;
        for (let i = 0; i < 3; i++) {
            if (gameState.patternReplay[i] !== gameState.currentPattern[i]) {
                correct = false;
                break;
            }
        }
        
        document.getElementById('pattern-popup').classList.add('hidden');
        
        if (correct) {
            playSound('correct');
            gameState.score += 150;
        }
        
        gameState.gameRunning = true;
    }
}

function showMemoryGame() {
    const correctGate = Math.floor(Math.random() * 3) + 1;
    gameState.correctGate = correctGate;
    
    // عرض البوابات برموز
    document.getElementById('memory-popup').classList.remove('hidden');
    gameState.gameRunning = false;
}

function chooseGate(gate) {
    document.getElementById('memory-popup').classList.add('hidden');
    
    if (gate === gameState.correctGate) {
        playSound('correct');
        gameState.score += 120;
        destroyCurrentObstacle();
    } else {
        playSound('wrong');
    }
    
    gameState.gameRunning = true;
}

function showTrueFalse() {
    const questions = [
        { text: 'النار تحرق', answer: true },
        { text: 'الماء يجمد عند 100 درجة', answer: false },
        { text: 'الأرض كروية', answer: true },
        { text: 'الشمس تدور حول الأرض', answer: false },
        { text: 'السمك يطير', answer: false },
        { text: 'العنكبوت حشرة', answer: false },
        { text: 'القطط تستطيع الرؤية في الظلام', answer: true }
    ];
    
    const q = questions[Math.floor(Math.random() * questions.length)];
    gameState.currentTFAnswer = q.answer;
    document.getElementById('tf-question').textContent = q.text;
    document.getElementById('tf-popup').classList.remove('hidden');
    gameState.gameRunning = false;
}

function checkTF(answer) {
    document.getElementById('tf-popup').classList.add('hidden');
    
    if (answer === gameState.currentTFAnswer) {
        playSound('correct');
        gameState.score += 80;
        destroyCurrentObstacle();
    } else {
        playSound('wrong');
    }
    
    gameState.gameRunning = true;
}

// قوى الظل 🌫️
function activateInvisibility(duration) {
    const character = document.getElementById('character-container');
    character.classList.add('character-invisible', 'ghost-effect');
    gameState.activePowers.invisibility = true;
    
    playSound('invisibility');
    
    setTimeout(() => {
        character.classList.remove('character-invisible', 'ghost-effect');
        gameState.activePowers.invisibility = false;
    }, duration);
}

function activateSneak(duration) {
    const character = document.getElementById('character-container');
    character.style.opacity = '0.7';
    gameState.activePowers.sneak = true;
    
    setTimeout(() => {
        character.style.opacity = '1';
        gameState.activePowers.sneak = false;
    }, duration);
}

function activateShadowJump() {
    // نقل الشخصية للأمام
    const character = document.getElementById('character-container');
    character.style.transform = 'translateX(200px)';
    character.style.opacity = '0';
    
    playSound('magic');
    
    setTimeout(() => {
        character.style.transform = 'translateX(0)';
        character.style.opacity = '1';
    }, 300);
}

function activateShadowClone(duration) {
    gameState.activePowers.shadowClone = true;
    
    // إنشاء نسخة
    const clone = document.createElement('img');
    clone.src = document.getElementById('game-character').src;
    clone.className = 'character-clone';
    clone.style.position = 'absolute';
    clone.style.left = '50px';
    clone.style.bottom = '50px';
    clone.style.width = '80px';
    clone.style.opacity = '0.5';
    document.getElementById('game-area').appendChild(clone);
    
    playSound('magic');
    
    setTimeout(() => {
        gameState.activePowers.shadowClone = false;
        if (clone) clone.remove();
    }, duration);
}

// قوى التحدي ⚡
function showCourageChoice() {
    const safePath = Math.random() < 0.5 ? 'left' : 'right';
    gameState.safePath = safePath;
    
    document.getElementById('courage-popup').classList.remove('hidden');
    gameState.gameRunning = false;
}

function choosePath(path) {
    document.getElementById('courage-popup').classList.add('hidden');
    
    if (path === gameState.safePath) {
        playSound('correct');
        gameState.score += 200;
    } else {
        playSound('wrong');
        useHeart();
    }
    
    gameState.gameRunning = true;
}

function activateSpeed(duration) {
    const originalSpeed = gameState.gameSpeed;
    gameState.gameSpeed *= 2;
    gameState.activePowers.speed = true;
    
    const character = document.getElementById('character-container');
    character.classList.add('character-speed');
    
    playSound('speed');
    
    setTimeout(() => {
        gameState.gameSpeed = originalSpeed;
        gameState.activePowers.speed = false;
        character.classList.remove('character-speed');
    }, duration);
}

function showBalanceGame() {
    document.getElementById('balance-popup').classList.remove('hidden');
    gameState.gameRunning = false;
    
    gameState.balanceInterval = setInterval(() => {
        const indicator = document.getElementById('balance-indicator');
        const currentLeft = parseInt(indicator.style.left) || 50;
        
        // تحريك المؤشر بناءً على ميل الجوال
        if (window.DeviceOrientationEvent) {
            // استخدام الجايرو
        } else {
            // محاكاة بالمفاتيح
        }
    }, 100);
}

function showLuckBox() {
    document.getElementById('luck-popup').classList.remove('hidden');
    gameState.gameRunning = false;
}

function openLuckyBox() {
    document.getElementById('luck-popup').classList.add('hidden');
    
    const random = Math.random();
    
    if (random < 0.3) {
        // جائزة كبيرة
        addCoins(100);
        gameState.score += 500;
        playSound('win');
    } else if (random < 0.6) {
        // جائزة متوسطة
        addCoins(50);
        gameState.score += 200;
        playSound('correct');
    } else if (random < 0.9) {
        // لا شي
        playSound('wrong');
    } else {
        // عقبة
        useHeart();
        playSound('explosion');
    }
    
    gameState.gameRunning = true;
}

function destroyCurrentObstacle() {
    // تدمير العقبة الحالية
    if (gameState.obstacles.length > 0) {
        const obstacle = gameState.obstacles[0];
        obstacle.active = false;
        const element = document.getElementById(`obstacle-${obstacle.id}`);
        if (element) element.remove();
        gameState.obstacles = gameState.obstacles.filter(o => o.id !== obstacle.id);
    }
}

// ========== إكمال المرحلة ==========
function completeLevel() {
    const level = levels[gameState.currentLevel - 1];
    gameState.score += 500;
    addCoins(level.coins);
    
    if (!gameState.completedLevels.includes(gameState.currentLevel)) {
        gameState.completedLevels.push(gameState.currentLevel);
    }
    
    // فتح العالم الجديد
    if (gameState.currentLevel === 20) {
        gameState.unlockedWorlds[1] = true;
    } else if (gameState.currentLevel === 40) {
        gameState.unlockedWorlds[2] = true;
    }
    
    // فتح قوى جديدة كل 20 مرحلة
    if (gameState.currentLevel % 20 === 0) {
        if (gameState.currentLevel === 20) {
            gameState.activePowers.shadow = true;
        } else if (gameState.currentLevel === 40) {
            gameState.activePowers.challenge = true;
        }
    }
    
    document.getElementById('completed-level').textContent = gameState.currentLevel;
    document.getElementById('level-reward').textContent = 500 + level.coins;
    document.getElementById('level-win-screen').classList.remove('hidden');
    
    gameState.gameRunning = false;
}

function nextLevel() {
    gameState.currentLevel++;
    
    if (gameState.currentLevel <= gameState.maxLevel) {
        document.getElementById('level-win-screen').classList.add('hidden');
        loadLevel(gameState.currentLevel);
        gameState.gameRunning = true;
    } else {
        // أكملت اللعبة كلها 🎉
        alert('مبروك! أكملتي كل المراحل! 🎉');
        goToMenu();
    }
}

// ========== نهاية اللعبة ==========
function gameOver() {
    gameState.gameRunning = false;
    
    document.getElementById('final-score').textContent = gameState.score;
    document.getElementById('final-coins').textContent = gameState.coins;
    document.getElementById('game-over-screen').classList.remove('hidden');
    
    playSound('gameover');
    
    // تحديث التحديات
    updateChallenges();
}

function restartGame() {
    document.getElementById('game-over-screen').classList.add('hidden');
    gameState.hearts = gameState.maxHearts;
    updateHeartsDisplay();
    startGame();
}

function goToMenu() {
    hideAllScreens();
    document.getElementById('start-screen').classList.remove('hidden');
    gameState.gameRunning = false;
}

// ========== تحديات ==========
function updateChallenges() {
    // تحديث التحديات اليومية
    gameState.dailyChallenges.forEach(challenge => {
        switch(challenge.type) {
            case 'coins':
                if (gameState.coins >= challenge.target) {
                    challenge.completed = true;
                }
                break;
            case 'levels':
                if (gameState.completedLevels.length >= challenge.target) {
                    challenge.completed = true;
                }
                break;
        }
    });
    
    // تحديث تحدي الأسبوع
    if (gameState.weeklyChallenge) {
        switch(gameState.weeklyChallenge.type) {
            case 'levels':
                if (gameState.completedLevels.length >= gameState.weeklyChallenge.target) {
                    gameState.weeklyChallenge.completed = true;
                }
                break;
        }
    }
    
    // عرض التحديات
    displayChallenges();
}

function displayChallenges() {
    const dailyContainer = document.getElementById('daily-challenges');
    dailyContainer.innerHTML = '';
    
    gameState.dailyChallenges.forEach(challenge => {
        const div = document.createElement('div');
        div.className = 'challenge-item';
        div.innerHTML = `
            <span>${challenge.name}</span>
            <div class="challenge-progress">
                <div class="progress-fill" style="width: ${(challenge.progress / challenge.target) * 100}%"></div>
            </div>
            <span>${challenge.completed ? '✅' : '⏳'}</span>
        `;
        dailyContainer.appendChild(div);
    });
}

// ========== المتجر ==========
function buyItem(item) {
    switch(item) {
        case 'heart':
            if (gameState.coins >= 100) {
                gameState.coins -= 100;
                gameState.hearts = Math.min(gameState.hearts + 1, gameState.maxHearts);
                updateHeartsDisplay();
                playSound('powerup');
            } else {
                alert('💰 عملات غير كافية');
            }
            break;
        case 'boost':
            if (gameState.coins >= 250) {
                gameState.coins -= 250;
                // تفعيل تعزيز عشوائي
                const powers = Object.keys(powers);
                const randomPower = powers[Math.floor(Math.random() * powers.length)];
                activatePower(randomPower);
            } else {
                alert('💰 عملات غير كافية');
            }
            break;
        case 'box':
            if (gameState.coins >= 500) {
                gameState.coins -= 500;
                openLuckyBox();
            } else {
                alert('💰 عملات غير كافية');
            }
            break;
    }
    updateCoinsDisplay();
}

// ========== الصوت ==========
function playSound(soundName) {
    if (!gameState.soundEnabled) return;
    
    if (sounds[soundName]) {
        const audio = new Audio(sounds[soundName]);
        audio.volume = 0.5;
        audio.play().catch(e => console.log('صوت ما اشتغل'));
    }
}

function playBackgroundMusic() {
    if (!gameState.musicEnabled) return;
    
    const audio = new Audio(sounds.background);
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(e => console.log('موسيقى ما اشتغلت'));
    gameState.bgMusic = audio;
}

// ========== إظهار وإخفاء الشاشات ==========
function showCharacters() {
    hideAllScreens();
    document.getElementById('characters-screen').classList.remove('hidden');
}

function showChallenges() {
    hideAllScreens();
    displayChallenges();
    document.getElementById('challenges-screen').classList.remove('hidden');
}

function showShop() {
    hideAllScreens();
    document.getElementById('shop-screen').classList.remove('hidden');
}

function showSettings() {
    hideAllScreens();
    document.getElementById('settings-screen').classList.remove('hidden');
}

function hideAllScreens() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('characters-screen').classList.add('hidden');
    document.getElementById('challenges-screen').classList.add('hidden');
    document.getElementById('shop-screen').classList.add('hidden');
    document.getElementById('settings-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('levels-screen').classList.add('hidden');
}

// ========== التحكم باللمس ==========
document.addEventListener('keydown', (e) => {
    if (!gameState.gameRunning) return;
    
    switch(e.key) {
        case 'ArrowUp':
        case 'w':
            // قفز
            jump();
            break;
        case 'ArrowDown':
        case 's':
            // انحناء
            duck();
            break;
        case ' ':
            // تفعيل القوة الحالية
            if (gameState.currentPower) {
                activatePower(gameState.currentPower);
            }
            break;
    }
});

document.addEventListener('touchstart', (e) => {
    if (!gameState.gameRunning) return;
    
    const touch = e.touches[0];
    const screenWidth = window.innerWidth;
    
    if (touch.clientX < screenWidth / 3) {
        // الجانب الأيسر - قفز
        jump();
    } else if (touch.clientX > (2 * screenWidth) / 3) {
        // الجانب الأيمن - تفعيل القوة
        if (gameState.currentPower) {
            activatePower(gameState.currentPower);
        }
    } else {
        // الوسط - انحناء
        duck();
    }
});

function jump() {
    const character = document.getElementById('character-container');
    character.style.transform = 'translateY(-50px)';
    playSound('jump');
    
    setTimeout(() => {
        character.style.transform = 'translateY(0)';
    }, 300);
}

function duck() {
    const character = document.getElementById('character-container');
    character.style.transform = 'scaleY(0.5)';
    
    setTimeout(() => {
        character.style.transform = 'scaleY(1)';
    }, 300);
}

// ========== تفعيل قوى من الأزرار ==========
document.getElementById('power-brain').onclick = () => {
    gameState.currentPower = 'intelligence';
};

document.getElementById('power-shadow').onclick = () => {
    if (gameState.activePowers.shadow) {
        gameState.currentPower = 'invisibility';
    }
};

document.getElementById('power-challenge').onclick = () => {
    if (gameState.activePowers.challenge) {
        gameState.currentPower = 'courage';
    }
};

// ========== حفظ اللعبة ==========
function saveGame() {
    const save = {
        coins: gameState.coins,
        completedLevels: gameState.completedLevels,
        unlockedWorlds: gameState.unlockedWorlds,
        characters: gameState.characters.map(c => ({ id: c.id, unlocked: c.unlocked })),
        selectedCharacter: gameState.selectedCharacter,
        activePowers: gameState.activePowers
    };
    
    localStorage.setItem('subwayGalaxySave', JSON.stringify(save));
}

function loadGame() {
    const save = localStorage.getItem('subwayGalaxySave');
    if (save) {
        const data = JSON.parse(save);
        gameState.coins = data.coins;
        gameState.completedLevels = data.completedLevels;
        gameState.unlockedWorlds = data.unlockedWorlds;
        gameState.selectedCharacter = data.selectedCharacter;
        gameState.activePowers = data.activePowers;
        
        // تحديث حالة الشخصيات
        data.characters.forEach(savedChar => {
            const char = gameState.characters.find(c => c.id === savedChar.id);
            if (char) char.unlocked = savedChar.unlocked;
        });
    }
}

// محاولة تحميل اللعبة عند البدء
loadGame();

// حفظ كل دقيقة
setInterval(saveGame, 60000);