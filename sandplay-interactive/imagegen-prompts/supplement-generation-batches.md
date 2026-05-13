# Sandplay Generation Batches

目标：将 manifest 中的 96 个沙具按顺序整理为 6 个批次，每批 16 个，对应 6 张 4x4 atlas。每张 atlas 从左到右、从上到下与批次清单顺序一致，切分后输出 `assets/generated/{id}.png`。

生成时继续遵守 `style-guide.md` 的统一风格：透明背景或可移除 chroma-key、单个物件、3/4 俯视、柔和手绘、低饱和暖色、不含文字、编号、标签或水印。

## sandplay-batch-01?基础人物、动物与自然

覆盖基础人物、常见动物、自然物和小屋，是沙具库的基础表达层。

Atlas: `assets/generated/source/sandplay-batch-01-atlas.png`

- `person-child` 小孩?人物?
- `person-adult` 成年人?人物?
- `person-woman` 成年人?人物?
- `person-elder` 老人?人物?
- `person-family-three` 家庭三人组?人物?
- `person-traveler` 远行者?人物?
- `animal-cat` 猫?动物?
- `animal-dog` 狗?动物?
- `animal-deer` 鹿?动物?
- `animal-bird` 鸟?动物?
- `animal-turtle` 乌龟?动物?
- `nature-tree` 树?自然?
- `nature-flower` 花?自然?
- `nature-stone` 石头?自然?
- `nature-mountain` 山?自然?
- `nature-water` 河流/水池?自然?

## sandplay-batch-02?建筑、路径、边界与天气

覆盖建筑、道路桥梁、边界障碍和天气天体，用于搭建场景结构。

Atlas: `assets/generated/source/sandplay-batch-02-atlas.png`

- `building-house` 小屋?建筑?
- `building-tower` 高塔?建筑?
- `building-castle` 城堡?建筑?
- `building-door` 门?建筑?
- `building-wall` 围墙?建筑?
- `path-road` 小路?道路/桥梁?
- `path-bridge` 桥?道路/桥梁?
- `path-stairs` 阶梯?道路/桥梁?
- `path-crossroads` 十字路口?道路/桥梁?
- `boundary-fence` 栅栏?边界/障碍?
- `boundary-stone-wall` 石墙?边界/障碍?
- `boundary-cave` 洞穴?边界/障碍?
- `boundary-lock` 锁?边界/障碍?
- `boundary-maze` 迷宫?边界/障碍?
- `sky-sun` 太阳?天体/天气?
- `sky-moon` 月亮?天体/天气?

## sandplay-batch-03?幻想、情绪与家庭关系

覆盖幻想物、情绪符号和家庭/关系对象，用于补充象征表达。

Atlas: `assets/generated/source/sandplay-batch-03-atlas.png`

- `sky-cloud` 云?天体/天气?
- `sky-raindrop` 雨滴?天体/天气?
- `sky-star` 星星?天体/天气?
- `fantasy-dragon` 龙?幻想/怪物?
- `fantasy-gentle-monster` 温和的小怪物?幻想/怪物?
- `fantasy-spirit` 精灵?幻想/怪物?
- `fantasy-mask` 面具?幻想/怪物?
- `fantasy-treasure-chest` 宝箱?幻想/怪物?
- `emotion-heart` 心形?情绪符号?
- `emotion-flame` 火焰?情绪符号?
- `emotion-lamp` 灯?情绪符号?
- `emotion-mirror` 镜子?情绪符号?
- `emotion-empty-chair` 空椅子?情绪符号?
- `person-couple` 情侣/伴侣?家庭/关系?
- `person-infant` 婴儿?家庭/关系?
- `person-caregiver` 照顾者?家庭/关系?

## sandplay-batch-04?动物层次与交通移动

覆盖更多动物和主要交通工具，用于表达力量、移动、距离与过渡。

Atlas: `assets/generated/source/sandplay-batch-04-atlas.png`

- `animal-lion` 狮子?动物?
- `animal-snake` 蛇?动物?
- `animal-fish` 鱼?动物?
- `animal-butterfly` 蝴蝶?动物?
- `animal-horse` 马?动物?
- `animal-rabbit` 兔子?动物?
- `animal-owl` 猫头鹰?动物?
- `animal-whale` 鲸鱼?动物?
- `vehicle-car` 小汽车?交通/移动?
- `vehicle-bus` 公交车?交通/移动?
- `vehicle-train` 火车?交通/移动?
- `vehicle-plane` 飞机?交通/移动?
- `vehicle-boat` 小船?交通/移动?
- `vehicle-bicycle` 自行车?交通/移动?
- `vehicle-ambulance` 救护车?交通/移动?
- `vehicle-wheelchair` 轮椅?交通/移动?

## sandplay-batch-05?交通补充、日常物品与社会角色

覆盖补充交通物、日常承载物和部分社会角色。

Atlas: `assets/generated/source/sandplay-batch-05-atlas.png`

- `vehicle-raft` 木筏?交通/移动?
- `vehicle-hot-air-balloon` 热气球?交通/移动?
- `daily-book` 书?日常物品?
- `daily-backpack` 书包?日常物品?
- `daily-bed` 床?日常物品?
- `daily-table` 桌子?日常物品?
- `daily-phone` 手机?日常物品?
- `daily-computer` 电脑?日常物品?
- `daily-clock` 钟表?日常物品?
- `daily-cup` 杯子?日常物品?
- `daily-food-basket` 食物篮?日常物品?
- `daily-toy-blocks` 积木?日常物品?
- `role-teacher` 老师?社会角色?
- `role-doctor` 医生?社会角色?
- `role-police-officer` 警察?社会角色?
- `role-friend-group` 朋友小组?社会角色?

## sandplay-batch-06?社会角色、保护冲突与抽象符号

覆盖剩余社会角色、保护/冲突对象、纪念仪式和抽象符号。

Atlas: `assets/generated/source/sandplay-batch-06-atlas.png`

- `role-lone-person` 独处的人?社会角色?
- `role-shopkeeper` 店主?社会角色?
- `role-student` 学生?社会角色?
- `role-helper` 帮手?社会角色?
- `protection-shield` 盾牌?保护/冲突?
- `protection-rope-knot` 绳结?保护/冲突?
- `protection-cage` 笼子?保护/冲突?
- `protection-warning-sign` 警示牌?保护/冲突?
- `protection-broken-wall` 破损墙?保护/冲突?
- `protection-wooden-sword` 木剑?保护/冲突?
- `ritual-candle` 蜡烛?纪念/仪式?
- `ritual-photo-frame` 相框?纪念/仪式?
- `abstract-key` 钥匙?抽象符号?
- `abstract-seed` 种子?抽象符号?
- `abstract-spiral` 螺旋?抽象符号?
- `abstract-crack` 裂缝?抽象符号?
