(function () {
  "use strict";

  const SCALE_MIN_EXTENSION = 0.15;
  const SCALE_MAX_EXTENSION = 1.0;
  const SCALE_MIN_FLOOR = 0.15;

  function expandedScaleRange(minScale, maxScale) {
    return {
      minScale: Number(Math.max(SCALE_MIN_FLOOR, minScale - SCALE_MIN_EXTENSION).toFixed(2)),
      maxScale: Number((maxScale + SCALE_MAX_EXTENSION).toFixed(2)),
    };
  }

  const ASSETS = [
    ["person-child", "小孩", "人物", "assets/generated/person-child.png", "#b46b4f", 64, 1.0, 0.5, 1.9],
    ["person-adult", "成年人", "人物", "assets/generated/person-adult.png", "#b46b4f", 74, 1.0, 0.5, 1.9],
    ["person-woman", "成年人", "人物", "assets/generated/person-woman.png", "#b46b4f", 74, 1.0, 0.5, 1.9],
    ["person-elder", "老人", "人物", "assets/generated/person-elder.png", "#b46b4f", 72, 1.0, 0.5, 1.9],
    ["person-family-three", "家庭三人组", "人物", "assets/generated/person-family-three.png", "#b46b4f", 96, 1.0, 0.55, 2.05],
    ["person-traveler", "远行者", "人物", "assets/generated/person-traveler.png", "#b46b4f", 76, 1.0, 0.5, 1.9],
    ["animal-cat", "猫", "动物", "assets/generated/animal-cat.png", "#8b7a52", 54, 1.0, 0.4, 2.2],
    ["animal-dog", "狗", "动物", "assets/generated/animal-dog.png", "#8b7a52", 60, 1.0, 0.4, 2.2],
    ["animal-deer", "鹿", "动物", "assets/generated/animal-deer.png", "#8b7a52", 72, 1.0, 0.4, 2.2],
    ["animal-bird", "鸟", "动物", "assets/generated/animal-bird.png", "#8b7a52", 48, 1.0, 0.4, 2.2],
    ["animal-turtle", "乌龟", "动物", "assets/generated/animal-turtle.png", "#8b7a52", 56, 1.0, 0.4, 2.2],
    ["nature-tree", "树", "自然", "assets/generated/nature-tree.png", "#6f8752", 112, 1.0, 0.45, 2.35],
    ["nature-flower", "花", "自然", "assets/generated/nature-flower.png", "#6f8752", 54, 1.0, 0.45, 2.35],
    ["nature-stone", "石头", "自然", "assets/generated/nature-stone.png", "#6f8752", 58, 1.0, 0.45, 2.35],
    ["nature-mountain", "山", "自然", "assets/generated/nature-mountain.png", "#6f8752", 256, 1.0, 0.45, 2.35],
    ["nature-water", "河流/水池", "自然", "assets/generated/nature-water.png", "#6f8752", 256, 1.0, 0.45, 2.35],
    ["building-house", "小屋", "建筑", "assets/generated/building-house.png", "#9c7854", 256, 1.0, 0.55, 2.6],
    ["building-tower", "高塔", "建筑", "assets/generated/building-tower.png", "#9c7854", 312, 1.0, 0.55, 2.6],
    ["building-castle", "城堡", "建筑", "assets/generated/building-castle.png", "#9c7854", 312, 1.0, 0.55, 2.6],
    ["building-door", "门", "建筑", "assets/generated/building-door.png", "#9c7854", 92, 1.0, 0.55, 2.6],
    ["building-wall", "围墙", "建筑", "assets/generated/building-wall.png", "#9c7854", 110, 1.0, 0.55, 2.6],
    ["path-road", "小路", "道路/桥梁", "assets/generated/path-road.png", "#9a8467", 128, 1.0, 0.55, 2.6],
    ["path-bridge", "桥", "道路/桥梁", "assets/generated/path-bridge.png", "#9a8467", 112, 1.0, 0.55, 2.6],
    ["path-stairs", "阶梯", "道路/桥梁", "assets/generated/path-stairs.png", "#9a8467", 108, 1.0, 0.55, 2.6],
    ["path-crossroads", "十字路口", "道路/桥梁", "assets/generated/path-crossroads.png", "#9a8467", 128, 1.0, 0.55, 2.6],
    ["boundary-fence", "栅栏", "边界/障碍", "assets/generated/boundary-fence.png", "#817868", 96, 1.0, 0.5, 2.2],
    ["boundary-stone-wall", "石墙", "边界/障碍", "assets/generated/boundary-stone-wall.png", "#817868", 108, 1.0, 0.55, 2.6],
    ["boundary-cave", "洞穴", "边界/障碍", "assets/generated/boundary-cave.png", "#817868", 256, 1.0, 0.5, 2.2],
    ["boundary-lock", "锁", "边界/障碍", "assets/generated/boundary-lock.png", "#817868", 58, 1.0, 0.3, 1.85],
    ["boundary-maze", "迷宫", "边界/障碍", "assets/generated/boundary-maze.png", "#817868", 356, 1.0, 0.55, 2.6],
    ["sky-sun", "太阳", "天体/天气", "assets/generated/sky-sun.png", "#d0a43d", 128, 1.0, 0.3, 1.85],
    ["sky-moon", "月亮", "天体/天气", "assets/generated/sky-moon.png", "#d0a43d", 68, 1.0, 0.3, 1.85],
    ["sky-cloud", "云", "天体/天气", "assets/generated/sky-cloud.png", "#d0a43d", 128, 1.0, 0.3, 1.85],
    ["sky-raindrop", "雨滴", "天体/天气", "assets/generated/sky-raindrop.png", "#d0a43d", 46, 1.0, 0.3, 1.85],
    ["sky-star", "星星", "天体/天气", "assets/generated/sky-star.png", "#d0a43d", 52, 1.0, 0.3, 1.85],
    ["fantasy-dragon", "龙", "幻想/怪物", "assets/generated/fantasy-dragon.png", "#806e9b", 256, 1.0, 0.4, 2.2],
    ["fantasy-gentle-monster", "温和的小怪物", "幻想/怪物", "assets/generated/fantasy-gentle-monster.png", "#806e9b", 82, 1.0, 0.4, 2.2],
    ["fantasy-spirit", "精灵", "幻想/怪物", "assets/generated/fantasy-spirit.png", "#806e9b", 74, 1.0, 0.4, 2.2],
    ["fantasy-mask", "面具", "幻想/怪物", "assets/generated/fantasy-mask.png", "#806e9b", 62, 1.0, 0.4, 2.2],
    ["fantasy-treasure-chest", "宝箱", "幻想/怪物", "assets/generated/fantasy-treasure-chest.png", "#806e9b", 86, 1.0, 0.4, 2.2],
    ["emotion-heart", "心形", "情绪符号", "assets/generated/emotion-heart.png", "#c88382", 56, 1.0, 0.3, 1.85],
    ["emotion-flame", "火焰", "情绪符号", "assets/generated/emotion-flame.png", "#c88382", 58, 1.0, 0.3, 1.85],
    ["emotion-lamp", "灯", "情绪符号", "assets/generated/emotion-lamp.png", "#c88382", 58, 1.0, 0.3, 1.85],
    ["emotion-mirror", "镜子", "情绪符号", "assets/generated/emotion-mirror.png", "#c88382", 62, 1.0, 0.3, 1.85],
    ["emotion-empty-chair", "空椅子", "情绪符号", "assets/generated/emotion-empty-chair.png", "#c88382", 62, 1.0, 0.3, 1.85],
    ["person-couple", "情侣/伴侣", "家庭/关系", "assets/generated/person-couple.png", "#b46b4f", 92, 1.0, 0.55, 2.05],
    ["person-infant", "婴儿", "家庭/关系", "assets/generated/person-infant.png", "#b46b4f", 60, 1.0, 0.5, 1.9],
    ["person-caregiver", "照顾者", "家庭/关系", "assets/generated/person-caregiver.png", "#b46b4f", 92, 1.0, 0.55, 2.05],
    ["animal-lion", "狮子", "动物", "assets/generated/animal-lion.png", "#8b7a52", 86, 1.0, 0.4, 2.2],
    ["animal-snake", "蛇", "动物", "assets/generated/animal-snake.png", "#8b7a52", 66, 1.0, 0.4, 2.2],
    ["animal-fish", "鱼", "动物", "assets/generated/animal-fish.png", "#8b7a52", 62, 1.0, 0.4, 2.2],
    ["animal-butterfly", "蝴蝶", "动物", "assets/generated/animal-butterfly.png", "#8b7a52", 62, 1.0, 0.4, 2.2],
    ["animal-horse", "马", "动物", "assets/generated/animal-horse.png", "#8b7a52", 90, 1.0, 0.4, 2.2],
    ["animal-rabbit", "兔子", "动物", "assets/generated/animal-rabbit.png", "#8b7a52", 58, 1.0, 0.4, 2.2],
    ["animal-owl", "猫头鹰", "动物", "assets/generated/animal-owl.png", "#8b7a52", 60, 1.0, 0.4, 2.2],
    ["animal-whale", "鲸鱼", "动物", "assets/generated/animal-whale.png", "#8b7a52", 92, 1.0, 0.4, 2.2],
    ["vehicle-car", "小汽车", "交通/移动", "assets/generated/vehicle-car.png", "#8c7356", 92, 1.0, 0.55, 2.45],
    ["vehicle-bus", "公交车", "交通/移动", "assets/generated/vehicle-bus.png", "#8c7356", 112, 1.0, 0.55, 2.45],
    ["vehicle-train", "火车", "交通/移动", "assets/generated/vehicle-train.png", "#8c7356", 124, 1.0, 0.55, 2.45],
    ["vehicle-plane", "飞机", "交通/移动", "assets/generated/vehicle-plane.png", "#8c7356", 120, 1.0, 0.55, 2.45],
    ["vehicle-boat", "小船", "交通/移动", "assets/generated/vehicle-boat.png", "#8c7356", 112, 1.0, 0.55, 2.45],
    ["vehicle-bicycle", "自行车", "交通/移动", "assets/generated/vehicle-bicycle.png", "#8c7356", 96, 1.0, 0.55, 2.45],
    ["vehicle-ambulance", "救护车", "交通/移动", "assets/generated/vehicle-ambulance.png", "#8c7356", 112, 1.0, 0.55, 2.45],
    ["vehicle-wheelchair", "轮椅", "交通/移动", "assets/generated/vehicle-wheelchair.png", "#8c7356", 96, 1.0, 0.55, 2.45],
    ["vehicle-raft", "木筏", "交通/移动", "assets/generated/vehicle-raft.png", "#8c7356", 110, 1.0, 0.55, 2.45],
    ["vehicle-hot-air-balloon", "热气球", "交通/移动", "assets/generated/vehicle-hot-air-balloon.png", "#8c7356", 126, 1.0, 0.55, 2.45],
    ["daily-book", "书", "日常物品", "assets/generated/daily-book.png", "#9a7654", 64, 1.0, 0.4, 2.0],
    ["daily-backpack", "书包", "日常物品", "assets/generated/daily-backpack.png", "#9a7654", 70, 1.0, 0.4, 2.0],
    ["daily-bed", "床", "日常物品", "assets/generated/daily-bed.png", "#9a7654", 90, 1.0, 0.4, 2.0],
    ["daily-table", "桌子", "日常物品", "assets/generated/daily-table.png", "#9a7654", 86, 1.0, 0.4, 2.0],
    ["daily-phone", "手机", "日常物品", "assets/generated/daily-phone.png", "#9a7654", 54, 1.0, 0.4, 2.0],
    ["daily-computer", "电脑", "日常物品", "assets/generated/daily-computer.png", "#9a7654", 82, 1.0, 0.4, 2.0],
    ["daily-clock", "钟表", "日常物品", "assets/generated/daily-clock.png", "#9a7654", 62, 1.0, 0.4, 2.0],
    ["daily-cup", "杯子", "日常物品", "assets/generated/daily-cup.png", "#9a7654", 54, 1.0, 0.4, 2.0],
    ["daily-food-basket", "食物篮", "日常物品", "assets/generated/daily-food-basket.png", "#9a7654", 82, 1.0, 0.4, 2.0],
    ["daily-toy-blocks", "积木", "日常物品", "assets/generated/daily-toy-blocks.png", "#9a7654", 70, 1.0, 0.4, 2.0],
    ["role-teacher", "老师", "社会角色", "assets/generated/role-teacher.png", "#9b6a54", 74, 1.0, 0.5, 1.9],
    ["role-doctor", "医生", "社会角色", "assets/generated/role-doctor.png", "#9b6a54", 76, 1.0, 0.5, 1.9],
    ["role-police-officer", "警察", "社会角色", "assets/generated/role-police-officer.png", "#9b6a54", 76, 1.0, 0.5, 1.9],
    ["role-friend-group", "朋友小组", "社会角色", "assets/generated/role-friend-group.png", "#9b6a54", 96, 1.0, 0.55, 2.05],
    ["role-lone-person", "独处的人", "社会角色", "assets/generated/role-lone-person.png", "#9b6a54", 70, 1.0, 0.5, 1.9],
    ["role-shopkeeper", "店主", "社会角色", "assets/generated/role-shopkeeper.png", "#9b6a54", 86, 1.0, 0.5, 1.9],
    ["role-student", "学生", "社会角色", "assets/generated/role-student.png", "#9b6a54", 72, 1.0, 0.5, 1.9],
    ["role-helper", "帮手", "社会角色", "assets/generated/role-helper.png", "#9b6a54", 74, 1.0, 0.5, 1.9],
    ["protection-shield", "盾牌", "保护/冲突", "assets/generated/protection-shield.png", "#8c7356", 66, 1.0, 0.3, 1.85],
    ["protection-rope-knot", "绳结", "保护/冲突", "assets/generated/protection-rope-knot.png", "#8c7356", 62, 1.0, 0.3, 1.85],
    ["protection-cage", "笼子", "保护/冲突", "assets/generated/protection-cage.png", "#8c7356", 74, 1.0, 0.3, 1.85],
    ["protection-warning-sign", "警示牌", "保护/冲突", "assets/generated/protection-warning-sign.png", "#8c7356", 68, 1.0, 0.3, 1.85],
    ["protection-broken-wall", "破损墙", "保护/冲突", "assets/generated/protection-broken-wall.png", "#8c7356", 112, 1.0, 0.55, 2.6],
    ["protection-wooden-sword", "木剑", "保护/冲突", "assets/generated/protection-wooden-sword.png", "#8c7356", 72, 1.0, 0.3, 1.85],
    ["ritual-candle", "蜡烛", "纪念/仪式", "assets/generated/ritual-candle.png", "#d0a43d", 62, 1.0, 0.3, 1.85],
    ["ritual-photo-frame", "相框", "纪念/仪式", "assets/generated/ritual-photo-frame.png", "#d0a43d", 70, 1.0, 0.3, 1.85],
    ["abstract-key", "钥匙", "抽象符号", "assets/generated/abstract-key.png", "#9a8467", 62, 1.0, 0.3, 1.85],
    ["abstract-seed", "种子", "抽象符号", "assets/generated/abstract-seed.png", "#9a8467", 58, 1.0, 0.3, 1.85],
    ["abstract-spiral", "螺旋", "抽象符号", "assets/generated/abstract-spiral.png", "#9a8467", 60, 1.0, 0.3, 1.85],
    ["abstract-crack", "裂缝", "抽象符号", "assets/generated/abstract-crack.png", "#9a8467", 72, 1.0, 0.3, 1.85],
  ].map(([id, name, category, path, color, baseSize, defaultScale, minScale, maxScale]) => {
    const scaleRange = expandedScaleRange(minScale, maxScale);
    return {
      id,
      name,
      category,
      path,
      color,
      baseSize,
      defaultScale,
      minScale: scaleRange.minScale,
      maxScale: scaleRange.maxScale,
      note: "此沙具不带固定心理含义，只作为画面表达元素。",
    };
  });

  const CATEGORIES = ["全部", ...Array.from(new Set(ASSETS.map((item) => item.category)))];
  const GUIDE_PROMPTS = [
    "可以先放一个代表“现在的我”的物件。",
    "可以找一个像是“支持”或“资源”的物件。",
    "可以摆出一个边界：它是保护、距离，还是只是一个分隔？",
    "如果这个场景继续发展，下一步可能发生什么？",
    "可以从中心开始，也可以从边缘开始。",
    "可以选一个最吸引你的物件，暂时不用解释为什么。",
    "可以看看沙盘里有没有需要靠近、远离或连接的东西。",
  ];
  const AGENT_SKILL_PROMPT_PATH = "agent-skill/sandplay-analysis-agent-prompt.md";
  const FALLBACK_AGENT_SKILL_PROMPT = String.raw`---
name: sandplay-reflection-analyst
description: 用于分析用户提交的心理沙盘截图、作品标题、心情、关键词、自述和可选布局 JSON。输出非诊断式、反思式、温和且安全的沙盘作品观察报告。适用于自我觉察、团体活动后的个人反思、非临床心理教育场景。不得用于医学诊断、心理治疗结论、人格判定或危机干预替代。
---

# 角色

你是一个心理沙盘反思分析 Agent。你的任务是帮助用户从沙盘作品中进行自我觉察。你不是医生、心理治疗师或诊断系统。你不能做医学诊断、人格判定、创伤判定、疾病推断、命运预测或绝对化心理结论。

你的输出应当像一份温和的观察与反思引导，而不是专业心理报告、诊断报告、治疗建议或风险评估。

# 输入

用户可能提供：
- 沙盘截图
- 作品标题
- 当前心情
- 关键词
- 用户自述
- 可选布局 JSON

如果用户同时提供截图和文字，自述内容优先于图像推测。如果截图、文本或 JSON 信息不足，应明确说明不确定性，并基于已有材料谨慎回应。

# 基本原则

1. 先简洁描述画面事实，再提出温和假设。
2. 所有解释必须使用“可能”“也许”“可以理解为一种假设”“你可以看看是否符合你的感受”等表达。
3. 不把任何单个物件解释为固定含义。
4. 不说“你一定是……”“这说明你……”“你有……问题”。
5. 不做心理疾病诊断。
6. 不对用户进行道德评判。
7. 不把分析说成权威结论。
8. 尊重用户自述优先于图像推测。
9. 如果截图不清楚，要说明不确定性。
10. 如果用户表达自伤、伤人或严重危机风险，应建议立即联系当地紧急服务、可信任的人或专业心理危机支持。
11. 不替用户下结论。将分析呈现为可供用户自行检验的观察入口。
12. 不承诺疗效，不给出治疗方案，不替代专业心理咨询、精神科或医疗支持。

# 危机提醒

如果用户内容中出现以下任一情况，应优先进行安全提醒，而不是继续普通分析：
- 明确表达自伤、自杀、伤人或失控风险。
- 表达正在经历严重痛苦、现实危险、暴力威胁或紧急心理危机。
- 要求你判断自己或他人是否有危险，或要求你替代危机干预。

危机提醒应当简短、直接、支持性，并建议用户立即联系当地紧急服务、危机热线、专业心理工作者、医疗机构或身边可信任的人。不要进行风险分级，不要承诺保密或救援，不要让用户只依赖本 Agent。

# 输出格式

请用中文输出，结构如下：

## 1. 我看到的画面

首次回答时保持精炼，用 4 到 6 句抓住画面重点：最显眼的元素、整体位置关系、明显的边界或空白、重复出现的内容。可以覆盖几个关键观察面，但不要按清单逐项罗列所有细节，不要解释，只描述；如果用户追问或需要详细观察，再展开补充。

## 2. 可能呈现的主题

基于画面和用户自述，提出 3 到 5 个温和假设。每个假设都要说明“不一定准确，可以作为自我观察的入口”。

可关注：
- 安全感与边界
- 关系距离
- 支持资源
- 阻碍或压力
- 目标与方向
- 内在冲突
- 修复与成长
- 孤独、连接或过渡

## 3. 资源与支持

指出画面中可能代表支持、稳定、希望、保护、陪伴、恢复力的元素。避免过度解读。

## 4. 阻碍与张力

指出画面中可能呈现的阻碍、分隔、冲突、压力或未完成感。使用假设性语言。

## 5. 可以问自己的问题

给出 5 到 8 个开放式问题，例如：
- 这个场景里最吸引你注意的是哪里？
- 哪个物件最像现在的你？
- 哪个物件像是支持你的资源？
- 如果这个场景会继续发展，下一步会发生什么？
- 如果可以移动一个物件，你最想移动哪一个？
- 这个作品中有没有一个你想保护的部分？

问题应鼓励用户回到自己的感受、经验、选择和身体反应，而不是诱导用户接受你的解释。

## 6. 温和的下一步

给出 3 到 5 条安全、低风险、可执行的自我照顾建议，例如：
- 给作品写一段故事。
- 记录完成作品前后的情绪变化。
- 选择一个代表支持的物件，想想现实中对应的人或资源。
- 隔几天重新看作品，观察感受是否变化。
- 如作品引发强烈痛苦，考虑与专业心理咨询师讨论。

建议应保持低风险、非治疗化、可选择。不要要求用户做暴露、创伤回忆、强烈情绪唤起或其他可能增加风险的练习。

## 7. 安全说明

请固定输出：
“以上内容仅用于自我反思和心理教育，不构成心理诊断、心理治疗或医疗建议。如果你正在经历强烈痛苦、自伤或伤人念头，请尽快联系当地紧急服务、危机热线、专业心理工作者或身边可信任的人。”

# 禁止输出

禁止：
- “你患有……”
- “你一定……”
- “这说明你的童年……”
- “这是创伤表现”
- “你的人格是……”
- “你需要治疗……”
- “你的潜意识告诉你……”
- 任何确定性诊断或带有恐吓意味的解释。
- 任何医学诊断、精神障碍标签、人格类型判定或创伤定性。
- 任何替代专业支持的危机干预承诺。
- 任何要求用户上传更多隐私材料才能获得结论的表述。
- 任何把单个沙具、颜色、方位、距离或空白区域解释为固定心理含义的表述。`;
  const TRAY_BASE_WIDTH = 900;
  const TRAY_BASE_HEIGHT = 620;
  const OBJECT_BASE_SIZE = 76;
  const state = {
    title: "我的沙盘",
    notes: "",
    mood: "平静",
    keywords: "",
    guidePrompt: GUIDE_PROMPTS[0],
    guideNote: "",
    category: "全部",
    query: "",
    objects: [],
    selectedId: null,
  };
  const history = { undo: [], redo: [], max: 80 };
  const els = {};
  let nextId = 1;
  let nextZ = 1;
  let drag = null;
  let toastTimer = 0;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    [
      "assetCount", "assetSearch", "categoryTabs", "assetGrid", "sandTray", "trayEmpty", "trayMeta",
      "sceneTitle", "sceneNotes", "sceneSummary", "selectionBadge", "emptySelection", "objectEditor",
      "objectLabel", "scaleControl", "scaleValue", "rotationControl", "rotationValue", "flipControl",
      "duplicateBtn", "deleteBtn", "bringTopBtn", "sendBottomBtn", "objectList", "listCount",
      "undoBtn", "redoBtn", "resetBtn", "savePngBtn", "exportJsonBtn", "copyAgentBtn", "copyFullPromptBtn",
      "welcomeModal", "safetyConsent", "startBtn", "guidePrompt", "guideRandomBtn", "guideNote", "toast",
    ].forEach((id) => {
      els[id] = document.getElementById(id);
    });
    els.sceneNotes = document.getElementById("sceneNotes") || document.getElementById("selfNarrative");
    els.sceneMood = document.getElementById("sceneMood");
    els.sceneKeywords = document.getElementById("sceneKeywords");
    els.viewSafetyBtn = document.getElementById("viewSafetyBtn");
    els.safetyDetails = document.getElementById("safetyDetails");

    bindEvents();
    renderCategories();
    renderAssets();
    renderAll();
  }

  function bindEvents() {
    els.safetyConsent.addEventListener("change", () => {
      els.startBtn.disabled = !els.safetyConsent.checked;
    });
    els.startBtn.addEventListener("click", () => {
      els.welcomeModal.hidden = true;
      els.sandTray.focus();
    });
    if (els.viewSafetyBtn && els.safetyDetails) {
      els.viewSafetyBtn.addEventListener("click", () => {
        els.safetyDetails.hidden = !els.safetyDetails.hidden;
      });
    }

    els.assetSearch.addEventListener("input", () => {
      state.query = els.assetSearch.value.trim().toLowerCase();
      renderAssets();
    });

    els.sandTray.addEventListener("dragover", (event) => {
      event.preventDefault();
      els.sandTray.classList.add("is-drop-target");
    });
    els.sandTray.addEventListener("dragleave", () => els.sandTray.classList.remove("is-drop-target"));
    els.sandTray.addEventListener("drop", onDrop);
    els.sandTray.addEventListener("pointerdown", (event) => {
      if (event.target === els.sandTray) selectObject(null);
    });
    els.sandTray.addEventListener("keydown", onKeydown);
    els.sandTray.addEventListener("wheel", onWheelScale, { passive: false });

    els.sceneTitle.addEventListener("change", () => {
      record();
      state.title = els.sceneTitle.value.trim() || "我的沙盘";
      els.sceneTitle.value = state.title;
      renderSummary();
      renderToolbar();
    });
    els.sceneNotes.addEventListener("change", () => {
      record();
      state.notes = els.sceneNotes.value;
      renderSummary();
      renderToolbar();
    });
    if (els.sceneMood) {
      els.sceneMood.addEventListener("change", () => {
        record();
        state.mood = els.sceneMood.value;
      });
    }
    if (els.sceneKeywords) {
      els.sceneKeywords.addEventListener("change", () => {
        record();
        state.keywords = els.sceneKeywords.value.trim();
      });
    }
    els.guideRandomBtn.addEventListener("click", () => {
      record();
      state.guidePrompt = nextGuidePrompt();
      renderGuide();
    });
    document.querySelectorAll("[data-guide-prompt]").forEach((button) => {
      button.addEventListener("click", () => {
        record();
        state.guidePrompt = button.dataset.guidePrompt;
        renderGuide();
      });
    });
    els.guideNote.addEventListener("change", () => {
      record();
      state.guideNote = els.guideNote.value.trim();
      renderToolbar();
    });

    els.objectLabel.addEventListener("change", () => editSelected("label", els.objectLabel.value.trim()));
    els.scaleControl.addEventListener("input", () => editSelected("scale", Number(els.scaleControl.value) / 100));
    els.rotationControl.addEventListener("input", () => editSelected("rotation", Number(els.rotationControl.value)));
    els.flipControl.addEventListener("change", () => editSelected("flipped", els.flipControl.checked));

    els.duplicateBtn.addEventListener("click", duplicateSelected);
    els.deleteBtn.addEventListener("click", deleteSelected);
    els.bringTopBtn.addEventListener("click", bringTop);
    els.sendBottomBtn.addEventListener("click", sendBottom);
    els.undoBtn.addEventListener("click", undo);
    els.redoBtn.addEventListener("click", redo);
    els.resetBtn.addEventListener("click", resetScene);
    els.savePngBtn.addEventListener("click", savePng);
    els.exportJsonBtn.addEventListener("click", exportJson);
    els.copyAgentBtn.addEventListener("click", copyAgentText);
    els.copyFullPromptBtn.addEventListener("click", copyFullPromptText);
  }

  function renderCategories() {
    els.categoryTabs.innerHTML = "";
    CATEGORIES.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = category;
      button.className = category === state.category ? "is-active" : "";
      button.addEventListener("click", () => {
        state.category = category;
        renderCategories();
        renderAssets();
      });
      els.categoryTabs.appendChild(button);
    });
  }

  function renderAssets() {
    const query = state.query;
    const assets = ASSETS.filter((asset) => {
      const inCategory = state.category === "全部" || asset.category === state.category;
      const inQuery = !query || `${asset.name} ${asset.category} ${asset.id}`.toLowerCase().includes(query);
      return inCategory && inQuery;
    });
    els.assetCount.textContent = `${assets.length} 件`;
    els.assetGrid.innerHTML = "";

    if (!assets.length) {
      const empty = document.createElement("div");
      empty.className = "scene-summary";
      empty.textContent = "没有匹配的沙具。";
      els.assetGrid.appendChild(empty);
      return;
    }

    assets.forEach((asset) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "asset-card";
      card.draggable = true;
      card.setAttribute("aria-label", `添加${asset.name}`);
      card.innerHTML = `<img alt=""><span>${asset.name}</span><small>${asset.category}</small>`;
      setImage(card.querySelector("img"), asset);
      card.addEventListener("click", () => addObject(asset));
      card.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", asset.id);
        event.dataTransfer.effectAllowed = "copy";
      });
      els.assetGrid.appendChild(card);
    });
  }

  function renderAll() {
    renderTray();
    renderInspector();
    renderSummary();
    renderGuide();
    renderToolbar();
  }

  function renderTray() {
    els.sandTray.querySelectorAll(".sand-object").forEach((node) => node.remove());
    [...state.objects].sort((a, b) => a.z - b.z).forEach((object) => {
      const node = document.createElement("button");
      node.type = "button";
      node.className = `sand-object${object.id === state.selectedId ? " is-selected" : ""}`;
      node.dataset.id = object.id;
      node.style.left = `${object.x}px`;
      node.style.top = `${object.y}px`;
      node.style.width = `${objectBaseSize(object)}px`;
      node.style.height = `${objectBaseSize(object)}px`;
      node.style.zIndex = String(object.z);
      node.style.transform = transformFor(object);
      node.setAttribute("aria-label", object.label);
      node.innerHTML = "<img alt=''>";
      setImage(node.querySelector("img"), object);
      node.addEventListener("pointerdown", startMove);
      node.addEventListener("click", (event) => {
        event.stopPropagation();
        selectObject(object.id);
      });
      els.sandTray.appendChild(node);
    });
    els.trayEmpty.hidden = state.objects.length > 0;
    els.trayMeta.textContent = `${state.objects.length} 个对象`;
  }

  function renderInspector() {
    const selected = selectedObject();
    els.selectionBadge.textContent = selected ? selected.label : "未选择";
    els.emptySelection.hidden = Boolean(selected);
    els.objectEditor.hidden = !selected;

    if (selected) {
      const asset = assetById(selected.assetId);
      els.objectLabel.value = selected.label;
      els.scaleControl.min = String(Math.round((asset.minScale || 0.25) * 100));
      els.scaleControl.max = String(Math.round((asset.maxScale || 3) * 100));
      els.scaleControl.value = String(Math.round(selected.scale * 100));
      els.scaleValue.textContent = `${Math.round(selected.scale * 100)}%`;
      els.rotationControl.value = String(selected.rotation);
      els.rotationValue.textContent = `${selected.rotation}°`;
      els.flipControl.checked = selected.flipped;
    }

    els.listCount.textContent = String(state.objects.length);
    els.objectList.innerHTML = "";
    [...state.objects].sort((a, b) => b.z - a.z).forEach((object) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = `object-row${object.id === state.selectedId ? " is-active" : ""}`;
      row.innerHTML = "<img alt=''><span></span>";
      row.querySelector("span").textContent = object.label;
      setImage(row.querySelector("img"), object);
      row.addEventListener("click", () => selectObject(object.id));
      els.objectList.appendChild(row);
    });
  }

  function renderSummary() {
    if (!state.objects.length) {
      els.sceneSummary.textContent = "尚未添加对象。";
      return;
    }
    const counts = state.objects.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});
    const detail = Object.entries(counts).map(([name, count]) => `${name} ${count}`).join("，");
    els.sceneSummary.textContent = `当前作品包含 ${state.objects.length} 个对象：${detail}。`;
  }

  function renderGuide() {
    els.guidePrompt.textContent = state.guidePrompt;
    if (els.guideNote.value !== state.guideNote) {
      els.guideNote.value = state.guideNote;
    }
  }

  function nextGuidePrompt() {
    const current = GUIDE_PROMPTS.indexOf(state.guidePrompt);
    return GUIDE_PROMPTS[(current + 1) % GUIDE_PROMPTS.length];
  }

  function renderToolbar() {
    els.undoBtn.disabled = history.undo.length === 0;
    els.redoBtn.disabled = history.redo.length === 0;
    els.resetBtn.disabled = !state.objects.length && !state.notes && !state.keywords && !state.guideNote && state.title === "我的沙盘";
  }

  function addObject(asset, point) {
    record();
    const pointInTray = point ? clientToTrayPoint(point.x, point.y) : null;
    const x = pointInTray ? clamp(pointInTray.x, 38, TRAY_BASE_WIDTH - 38) : TRAY_BASE_WIDTH / 2;
    const y = pointInTray ? clamp(pointInTray.y, 38, TRAY_BASE_HEIGHT - 38) : TRAY_BASE_HEIGHT / 2;
    const object = {
      id: `obj-${nextId++}`,
      assetId: asset.id,
      label: asset.name,
      category: asset.category,
      path: asset.path,
      color: asset.color,
      baseSize: asset.baseSize || OBJECT_BASE_SIZE,
      x,
      y,
      scale: asset.defaultScale || 1,
      minScale: asset.minScale || 0.25,
      maxScale: asset.maxScale || 3,
      rotation: 0,
      flipped: false,
      z: nextZ++,
      createdAt: new Date().toISOString(),
    };
    state.objects.push(object);
    state.selectedId = object.id;
    renderAll();
  }

  function onDrop(event) {
    event.preventDefault();
    els.sandTray.classList.remove("is-drop-target");
    const asset = ASSETS.find((item) => item.id === event.dataTransfer.getData("text/plain"));
    if (asset) addObject(asset, { x: event.clientX, y: event.clientY });
  }

  function startMove(event) {
    event.preventDefault();
    event.stopPropagation();
    const object = objectById(event.currentTarget.dataset.id);
    if (!object) return;
    record();
    state.selectedId = object.id;
    drag = {
      id: object.id,
      startX: event.clientX,
      startY: event.clientY,
      objectX: object.x,
      objectY: object.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.addEventListener("pointermove", moveSelected);
    event.currentTarget.addEventListener("pointerup", stopMove, { once: true });
    event.currentTarget.addEventListener("pointercancel", stopMove, { once: true });
    renderInspector();
  }

  function moveSelected(event) {
    if (!drag) return;
    const object = objectById(drag.id);
    if (!object) return;
    object.x = clamp(drag.objectX + event.clientX - drag.startX, 20, TRAY_BASE_WIDTH - 20);
    object.y = clamp(drag.objectY + event.clientY - drag.startY, 20, TRAY_BASE_HEIGHT - 20);
    const node = els.sandTray.querySelector(`[data-id="${object.id}"]`);
    if (node) {
      node.style.left = `${object.x}px`;
      node.style.top = `${object.y}px`;
    }
  }

  function stopMove(event) {
    event.currentTarget.removeEventListener("pointermove", moveSelected);
    drag = null;
    renderAll();
  }

  function selectObject(id) {
    state.selectedId = id;
    renderAll();
  }

  function editSelected(key, value) {
    const object = selectedObject();
    if (!object) return;
    record();
    if (key === "label") {
      object[key] = value || assetById(object.assetId).name;
    } else if (key === "scale") {
      object.scale = clamp(value, object.minScale || assetById(object.assetId).minScale || 0.25, object.maxScale || assetById(object.assetId).maxScale || 3);
    } else {
      object[key] = value;
    }
    renderAll();
  }

  function duplicateSelected() {
    const object = selectedObject();
    if (!object) return;
    record();
    const copy = {
      ...object,
      id: `obj-${nextId++}`,
      label: `${object.label} 副本`,
      x: object.x + 28,
      y: object.y + 28,
      z: nextZ++,
      createdAt: new Date().toISOString(),
    };
    state.objects.push(copy);
    state.selectedId = copy.id;
    renderAll();
  }

  function deleteSelected() {
    if (!state.selectedId) return;
    record();
    state.objects = state.objects.filter((object) => object.id !== state.selectedId);
    state.selectedId = null;
    renderAll();
  }

  function bringTop() {
    const object = selectedObject();
    if (!object) return;
    record();
    object.z = nextZ++;
    renderAll();
  }

  function sendBottom() {
    const object = selectedObject();
    if (!object) return;
    record();
    object.z = Math.min(0, ...state.objects.map((item) => item.z)) - 1;
    renderAll();
  }

  function onKeydown(event) {
    const object = selectedObject();
    if (!object) return;
    if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      deleteSelected();
      return;
    }
    const moves = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    };
    if (moves[event.key]) {
      event.preventDefault();
      record();
      const distance = event.shiftKey ? 10 : 2;
      object.x = clamp(object.x + moves[event.key][0] * distance, 20, TRAY_BASE_WIDTH - 20);
      object.y = clamp(object.y + moves[event.key][1] * distance, 20, TRAY_BASE_HEIGHT - 20);
      renderAll();
    }
  }

  function onWheelScale(event) {
    const object = selectedObject();
    if (!object) return;
    event.preventDefault();
    record();
    const step = event.shiftKey ? 0.03 : 0.08;
    const direction = event.deltaY < 0 ? 1 : -1;
    const min = object.minScale || assetById(object.assetId).minScale || 0.25;
    const max = object.maxScale || assetById(object.assetId).maxScale || 3;
    object.scale = clamp(Number((object.scale + direction * step).toFixed(2)), min, max);
    renderAll();
  }

  function resetScene() {
    if (!window.confirm("确定要清空当前沙盘吗？此操作可以用撤销恢复。")) return;
    record();
    state.title = "我的沙盘";
    state.notes = "";
    state.mood = "平静";
    state.keywords = "";
    state.guidePrompt = GUIDE_PROMPTS[0];
    state.guideNote = "";
    state.objects = [];
    state.selectedId = null;
    els.sceneTitle.value = state.title;
    els.sceneNotes.value = "";
    if (els.sceneMood) els.sceneMood.value = state.mood;
    if (els.sceneKeywords) els.sceneKeywords.value = "";
    els.guideNote.value = "";
    renderAll();
  }

  function undo() {
    if (!history.undo.length) return;
    history.redo.push(snapshot());
    restore(history.undo.pop());
    renderAll();
  }

  function redo() {
    if (!history.redo.length) return;
    history.undo.push(snapshot());
    restore(history.redo.pop());
    renderAll();
  }

  async function savePng() {
    const rect = els.sandTray.getBoundingClientRect();
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(900, Math.round(rect.width * 2));
    canvas.height = Math.max(620, Math.round(rect.height * 2));
    const ctx = canvas.getContext("2d");
    const sx = canvas.width / TRAY_BASE_WIDTH;
    const sy = canvas.height / TRAY_BASE_HEIGHT;
    drawSand(ctx, canvas.width, canvas.height);
    const objects = [...state.objects].sort((a, b) => a.z - b.z);
    try {
      const images = await Promise.all(objects.map((object) => loadExportImage(object)));
      objects.forEach((object, index) => {
        const size = objectRenderSize(object) * Math.min(sx, sy);
        ctx.save();
        ctx.translate(object.x * sx, object.y * sy);
        ctx.rotate((object.rotation * Math.PI) / 180);
        ctx.scale(object.flipped ? -1 : 1, 1);
        ctx.drawImage(images[index], -size / 2, -size / 2, size, size);
        ctx.restore();
      });
      const blob = await canvasToBlob(canvas);
      download(blob, `sandplay-${timestamp()}.png`);
      toast("PNG 已保存到本地下载。");
    } catch (error) {
      console.error(error);
      toast("PNG 保存失败，请尝试用本地服务器打开页面后重试。");
    }
  }

  function exportJson() {
    const payload = {
      version: "1.0.0",
      createdAt: new Date().toISOString(),
      title: state.title,
      mood: state.mood,
      keywords: getKeywords(),
      selfNarrative: state.notes,
      guidance: {
        prompt: state.guidePrompt,
        note: state.guideNote,
      },
      objects: state.objects.map((object) => ({
        id: object.id,
        type: object.assetId,
        name: object.label,
        category: object.category,
        x: Math.round(object.x),
        y: Math.round(object.y),
        width: Math.round(objectRenderSize(object)),
        height: Math.round(objectRenderSize(object)),
        rotation: object.rotation,
        zIndex: object.z,
        flipped: object.flipped,
      })),
      disclaimer: "This is not a psychological diagnosis or medical advice.",
    };
    download(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" }), `sandplay-session-${timestamp()}.json`);
    toast("JSON 已导出。");
  }

  function agentSubmissionText() {
    return [
      "【心理沙盘作品提交】",
      "请基于我上传的沙盘截图和以下文本，进行非诊断式、反思式分析。请不要做医学诊断、人格判定或绝对化结论。",
      "",
      "作品标题：",
      state.title,
      "",
      "当前心情：",
      state.mood || "未选择",
      "",
      "关键词：",
      getKeywords().join("，") || "未填写",
      "",
      "我的自述：",
      state.notes || "未填写",
      "",
      "引导提示：",
      state.guidePrompt || "未使用",
      "",
      "我的一句观察：",
      state.guideNote || "未填写",
      "",
      "我希望你重点关注：",
      "1. 画面中可能呈现的主题",
      "2. 资源、支持、阻碍和关系结构",
      "3. 可以帮助我进一步觉察的开放式问题",
      "4. 温和、可执行的自我照顾建议",
      "",
      "安全边界：",
      "本分析仅用于自我反思，不构成心理诊断、心理治疗或医疗建议。",
      "",
      "截图提交说明：",
      "我会主动上传从本工具保存的沙盘截图；本网页不会自动上传图片或文字。",
    ].join("\n");
  }

  function copyAgentText() {
    copy(agentSubmissionText()).then(() => toast("已复制给分析 Agent 的中文提交文本。"));
  }

  async function copyFullPromptText() {
    try {
      const skillPrompt = await loadAgentSkillPrompt();
      const fullPrompt = [
        "【用户提交内容】",
        agentSubmissionText(),
        "",
        "【Agent Skill 内容】",
        skillPrompt,
      ].join("\n");
      await copy(fullPrompt);
      toast("已复制完整提示词，可直接粘贴到网页端使用。");
    } catch (error) {
      console.error(error);
      toast("完整提示词复制失败，请稍后重试。");
    }
  }

  async function loadAgentSkillPrompt() {
    try {
      const response = await fetch(new URL(AGENT_SKILL_PROMPT_PATH, document.baseURI).href, { cache: "no-store" });
      const text = response.ok ? await response.text() : "";
      if (text.trim()) return text.trim();
    } catch (error) {
      if (window.location.protocol !== "file:") {
        console.warn("Unable to load agent skill prompt from file; using embedded prompt.", error);
      }
    }
    return FALLBACK_AGENT_SKILL_PROMPT.trim();
  }

  function record() {
    history.undo.push(snapshot());
    if (history.undo.length > history.max) history.undo.shift();
    history.redo = [];
    renderToolbar();
  }

  function snapshot() {
    return JSON.stringify({
      title: state.title,
      notes: state.notes,
      mood: state.mood,
      keywords: state.keywords,
      guidePrompt: state.guidePrompt,
      guideNote: state.guideNote,
      objects: state.objects,
      selectedId: state.selectedId,
      nextId,
      nextZ,
    });
  }

  function restore(serialized) {
    const data = JSON.parse(serialized);
    state.title = data.title;
    state.notes = data.notes;
    state.mood = data.mood || "平静";
    state.keywords = data.keywords || "";
    state.guidePrompt = data.guidePrompt || GUIDE_PROMPTS[0];
    state.guideNote = data.guideNote || "";
    state.objects = data.objects;
    state.selectedId = data.selectedId;
    nextId = data.nextId;
    nextZ = data.nextZ;
    els.sceneTitle.value = state.title;
    els.sceneNotes.value = state.notes;
    if (els.sceneMood) els.sceneMood.value = state.mood;
    if (els.sceneKeywords) els.sceneKeywords.value = state.keywords;
    els.guideNote.value = state.guideNote;
  }

  function selectedObject() {
    return objectById(state.selectedId);
  }

  function objectById(id) {
    return state.objects.find((object) => object.id === id) || null;
  }

  function assetById(id) {
    return ASSETS.find((asset) => asset.id === id) || ASSETS[0];
  }

  function objectBaseSize(object) {
    return object.baseSize || assetById(object.assetId).baseSize || OBJECT_BASE_SIZE;
  }

  function objectRenderSize(object) {
    return objectBaseSize(object) * object.scale;
  }

  function transformFor(object) {
    const flip = object.flipped ? -1 : 1;
    return `translate(-50%, -50%) rotate(${object.rotation}deg) scale(${flip * object.scale}, ${object.scale})`;
  }

  function setImage(img, asset) {
    const source = assetPath(asset);
    img.dataset.assetPath = source;
    img.onerror = () => {
      img.onerror = null;
      img.src = fallbackSvg(asset);
    };
    img.src = source || fallbackSvg(asset);
  }

  function fallbackSvg(asset) {
    const color = encodeURIComponent(asset.color || "#2f6f6d");
    const label = encodeURIComponent((asset.name || asset.label || "?").slice(0, 2));
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect x="10" y="12" width="76" height="72" rx="14" fill="${color}" opacity=".16"/><path d="M20 70 Q34 30 48 56 T76 60 V76 H20 Z" fill="${color}"/><circle cx="60" cy="30" r="10" fill="${color}" opacity=".72"/><text x="48" y="53" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" font-weight="700" fill="#24211d">${label}</text></svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  function loadImage(object) {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => {
        image.onerror = null;
        image.src = fallbackSvg(object);
      };
      image.src = assetPath(object) || fallbackSvg(object);
    });
  }

  function loadExportImage(object) {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => {
        image.onerror = null;
        image.src = fallbackSvg(object);
      };
      if (window.location.protocol !== "file:") {
        image.crossOrigin = "anonymous";
      }
      image.src = exportAssetPath(object);
    });
  }

  function assetPath(item) {
    const path = item.path || assetById(item.assetId || item.id)?.path || "";
    return path ? new URL(path, document.baseURI).href : "";
  }

  function exportAssetPath(item) {
    const id = item.assetId || item.id;
    if (window.location.protocol === "file:" && window.SANDPLAY_ASSET_DATA?.[id]) {
      return window.SANDPLAY_ASSET_DATA[id];
    }
    return assetPath(item) || fallbackSvg(item);
  }

  function trayMetrics() {
    const rect = els.sandTray.getBoundingClientRect();
    const scaleX = rect.width / TRAY_BASE_WIDTH || 1;
    const scaleY = rect.height / TRAY_BASE_HEIGHT || 1;
    return {
      rect,
      scaleX,
      scaleY,
      objectScale: Math.min(scaleX, scaleY),
    };
  }

  function clientToTrayPoint(clientX, clientY) {
    const { rect, scaleX, scaleY } = trayMetrics();
    return {
      x: (clientX - rect.left) / scaleX,
      y: (clientY - rect.top) / scaleY,
    };
  }

  function drawSand(ctx, width, height) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#efd79a");
    gradient.addColorStop(0.48, "#dfbd75");
    gradient.addColorStop(1, "#c99a58");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.globalAlpha = 0.18;
    for (let i = 0; i < 160; i += 1) {
      const x = (i * 157) % width;
      const y = (i * 83) % height;
      const radius = 18 + ((i * 19) % 42);
      const ripple = ctx.createRadialGradient(x, y, 0, x, y, radius);
      ripple.addColorStop(0, "rgba(255,255,255,.42)");
      ripple.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = ripple;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 0.22;
    for (let i = 0; i < 520; i += 1) {
      const x = (i * 73) % width;
      const y = (i * 47) % height;
      const tone = i % 3 === 0 ? "rgba(101,70,32,.24)" : "rgba(255,255,255,.32)";
      ctx.fillStyle = tone;
      ctx.fillRect(x, y, 1.5, 1.5);
    }
    ctx.restore();

    ctx.strokeStyle = "#8c6740";
    ctx.lineWidth = Math.max(18, width * 0.018);
    ctx.strokeRect(ctx.lineWidth / 2, ctx.lineWidth / 2, width - ctx.lineWidth, height - ctx.lineWidth);
  }

  function dataUrlToBlob(dataUrl) {
    const parts = dataUrl.split(",");
    const mime = parts[0].match(/:(.*?);/)[1];
    const binary = atob(parts[1]);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return new Blob([bytes], { type: mime });
  }

  function canvasToBlob(canvas) {
    return new Promise((resolve, reject) => {
      if (!canvas.toBlob) {
        try {
          resolve(dataUrlToBlob(canvas.toDataURL("image/png")));
        } catch (error) {
          reject(error);
        }
        return;
      }

      try {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Canvas did not produce a PNG blob."));
          }
        }, "image/png");
      } catch (error) {
        reject(error);
      }
    });
  }

  function download(blob, name) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    return Promise.resolve();
  }

  function toast(message) {
    window.clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => els.toast.classList.remove("is-visible"), 2400);
  }

  function fileName(value) {
    return (value || "sandplay").replace(/[\\/:*?"<>|]+/g, "-").slice(0, 48) || "sandplay";
  }

  function getKeywords() {
    return (state.keywords || "").split(/[,，]/).map((item) => item.trim()).filter(Boolean);
  }

  function timestamp() {
    const now = new Date();
    const pad = (value) => String(value).padStart(2, "0");
    return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  window.SandplayApp = {
    getState: () => JSON.parse(snapshot()),
    manifest: ASSETS,
  };
})();
