/* ============================================================
   LuxuryLove · 个人作品网站 — 内容数据
   ------------------------------------------------------------
   以后要加新作品、改简介，只需要改这个文件，不用碰 HTML / CSS。
   改完保存，刷新浏览器就能看到。
   ============================================================ */

const SITE = {
  /* ---------- 站点基础信息 ---------- */
  name: "LuxuryLove",
  /* 页面 <title> 与浏览器标签 */
  siteTitle: "LuxuryLove · 作品集",
  /* 一句话定位，出现在首屏标题下方 */
  tagline: "用 Unity 搭建可漫游的世界，也用代码把重复的事交还给系统。",
  /* 首屏标题下方的中文副标 */
  heroCn: "虚拟现实 · 三维叙事 · 全栈开发",
  /* 首屏上方小字 */
  eyebrow: "VR / UNITY · FULL-STACK · GRADUATION PROJECT",
  /* 首屏右下角滚动提示 */
  scrollHint: "向下滚动 · 查看作品",

  /* ---------- 联系方式 ---------- */
  contact: {
    /* 邮箱：填了才会显示邮箱按钮 */
    email: "1392932862@qq.com",
    /* 微信号：填了才会显示复制按钮 */
    wechat: "I---love____you",
    /* 其他链接：没有就留空数组 [] */
    links: [
      { label: "GitHub", url: "https://github.com/Luxurylove" },
      { label: "QBGen 在线体验", url: "https://luxurylove.github.io/QBGen/" },
    ],
  },

  /* ---------- 关于我 ---------- */
  about: {
    /* 头像：把图片放进 assets/ 目录，然后改成 "assets/avatar.jpg"；留空则不显示头像 */
    avatar: "",
    /* 段落数组，每项一段 */
    paragraphs: [
      "我是一名 VR / 实时三维方向的创作者，也用全栈开发把想法真正跑起来：前者让画面可以被走进去，后者让流程可以被交给系统。",
      "VR 作品多围绕传统文化、红色历史与古画想象展开：从场景搭建、材质灯光，到交互逻辑与运镜剪辑，尽量一个人走完从想法到成片的全流程。",
      "毕设作品 QBGen 是一套在线题库与自动组卷考试系统，用 uni-app + uniCloud 完成从题库管理到在线考试的完整闭环。",
      "这个网站是我的作品档案，会持续更新。",
    ],
    /* 能力标签 */
    skills: [
      { title: "引擎与三维", items: ["Unity", "C#", "XR Interaction", "场景搭建", "材质与灯光", "Blender"] },
      { title: "全栈与工程", items: ["Vue", "uni-app", "uniCloud", "JavaScript", "接口设计", "部署上线"] },
      { title: "影像与叙事", items: ["运镜设计", "剪辑", "虚拟展陈叙事", "图文包装"] },
      { title: "AI 协作", items: ["Trae", "DeepSeek V4.1 Flash", "ChatGPT", "豆包", "AI 视频"] },
    ],
  },

  /* ---------- AI 工作流 ----------
     新工具照着 ai.tools 里的格式加一条即可；works 里写 aiTools: ["name", ...]
     会在作品卡片上显示「AI 协作」标记，详情页显示工具 + 用途。
  */
  ai: {
    intro: "我不是把 AI 当成「一键生成」，而是把它当成一个随时在线的协作者：我负责定方向、做判断、验收结果，重复劳动和第一版草稿交给模型。",
    tools: [
      {
        name: "Trae",
        category: "AI IDE",
        role: "主力开发工具",
        desc: "QBGen 的主要开发环境：在编辑器里直接调用模型写代码、跑通流程、边写边改。",
        uses: ["代码生成", "整项目搭建", "迭代修改"],
      },
      {
        name: "DeepSeek V4.1 Flash",
        category: "生成模型",
        role: "初稿与实现",
        desc: "通过 Trae 调用，负责写初版代码、解释报错、补全功能；先让它跑出可运行的第一版。",
        uses: ["初版代码", "报错排查", "功能补全"],
      },
      {
        name: "ChatGPT",
        category: "检测与写作",
        role: "代码检测 + C# 脚本",
        desc: "两件事：给 AI 写出的代码做二次检查；以及为 VR 作品编写 C# 交互脚本。",
        uses: ["代码检测", "C# 脚本", "文案打磨"],
      },
      {
        name: "豆包",
        category: "视觉与素材",
        role: "视觉参考",
        desc: "概念图、封面视觉的快速试做，先看效果再决定方向。",
        uses: ["概念图", "封面参考"],
      },
      {
        name: "Harness + Agnes",
        category: "视频生成",
        role: "AI 视频 · DeepSeek Harness",
        desc: "在 DSH 里调用 Agnes 模型做 AI 视频，用于氛围镜头与短视频段落的生成。",
        uses: ["AI 视频", "氛围镜头", "短视频段落"],
        isConcept: true,
      },
    ],
    /* 使用原则：展示「怎么用」，比展示「用了什么」更能体现能力 */
    workflow: [
      { title: "拆解", desc: "先把问题拆到足够具体，想清楚要 AI 交付什么。" },
      { title: "生成", desc: "让它给出多个方向或第一版草稿，而不是唯一答案。" },
      { title: "判断", desc: "用自己的标准筛选、改写、合并，保留能站得住的部分。" },
      { title: "验收", desc: "最终以实际跑通、渲染出片、用户能用来作为判断标准。" },
    ],
  },

  /* ---------- 作品列表 ----------
     新作品复制一整块 { ... }，粘贴到列表最前面即可。
     字段说明：
       id      唯一编号（英文/数字），不能重复
       title   作品名
       en      英文副标题（可留空 ""）
       category 分类标签
       year    年份
       subtitle 卡片上的一句话说明
       cover   封面路径（图片放 assets/covers/）
       model   制作工具 / 引擎
       duration 时长（可留空 ""）
       summary 详情页的项目背景段落（数组，每项一段）
       highlights 详情页的「做了什么」要点（数组）
       tags    技术关键词
       video   视频：{ src: "assets/videos/xxx.mp4" } 本地播放
               或 { embed: "https://player.bilibili.com/..." } 在线嵌入
               暂时没有就写 null
       link    在线体验 / 仓库地址（可留 null），详情页会出现「在线体验」按钮
       aiTools 这个作品用到的 AI 工具名（如 ["ChatGPT", "DeepSeek"]），卡片会显示「AI 协作」
       aiNote  这个作品里 AI 具体负责什么（详情页「AI 协作」一栏显示）
       credits 团队署名（可留空），详情页元信息里显示「团队」
       coverFocus 封面裁切焦点（可选，如 "62% 50%"，封面主体偏一侧时用）
       gallery 详情页额外截图（数组，可留空）
  */
  works: [
    {
      id: "life",
      title: "生命之歌",
      en: "SONG OF LIFE",
      category: "AI 科幻短片 · 团队作品",
      year: "2026",
      subtitle: "改编王晋康 1995 年科幻短篇：165 秒、33 个镜头，从剧本到成片全流程 AI 制作。",
      cover: "assets/covers/life.jpg",
      coverFocus: "62% 50%",
      model: "DeepSeek · 豆包 · agens · 剪映",
      duration: "02:36",
      credits: "王信淳 · 刘艳 · 郑泽帅 · 王毅 · 黄嘉峰",
      summary: [
        "改编自王晋康 1995 年发表于《科幻世界》的短篇《生命之歌》：生物学家孔昭仁把机器人男孩元元当亲生儿子养大，却又亲手锁住了他体内那段从 DNA 里解码出来的「生命之歌」。当密码被破译、元元逐渐觉醒，姐姐孔宪云必须在爱与责任之间举枪。",
        "片子不做「机器人造反」，只保留「温情 — 背叛 — 觉醒 — 对峙 — 留白」五个情绪节拍，把追问留到最后：谁有权决定一个想活下去的生命的命运？",
        "全片 165 秒、33 个镜头，从剧本、分镜、角色设定、图生视频到剪辑配乐，完整跑通一条 AI 制作链路。",
      ],
      highlights: [
        "用 DeepSeek 把原著拆成四幕结构，一次产出大纲、人设与 33 镜分镜脚本（每镜 5s + 英文提示词）",
        "用豆包生成三位主角的正 / 侧 / 背三视图与四个关键场景概念图，锁定 33 个镜头的人物一致性",
        "用 agens / 豆包按七段式英文提示词逐镜图生视频：景别、动作、环境、光线、情绪、运镜、收尾",
        "在剪映中完成 33 段时间线拼接、旁白配音、钢琴 BGM、字幕与暖黄→冷蓝的色温调色、glitch 转场",
      ],
      tags: ["AI 短片", "图生视频", "分镜设计", "提示词工程", "剪映后期"],
      aiTools: ["DeepSeek", "豆包", "agens", "剪映"],
      aiNote: "DeepSeek 写剧本与分镜提示词；豆包出人物三视图与场景概念图；agens／豆包逐镜图生视频；剪映完成配音、配乐、字幕与调色。",
      link: "https://luxurylove.github.io/life/",
      linkLabel: "在线观看",
      video: { src: "assets/videos/life.mp4" },
      gallery: [
        "assets/covers/life-ref-yuanyuan.jpg",
        "assets/covers/life-storyboard.jpg",
        "assets/covers/life-score-wall.jpg",
      ],
    },
    {
      id: "qbgen",
      title: "QBGen 在线题库",
      en: "QBGEN · QUESTION BANK GENERATOR",
      category: "全栈 Web · 毕设作品",
      year: "2026",
      subtitle: "从题库录入到自动组卷、在线作答与判分，把「出卷」这件事交给系统。",
      cover: "assets/covers/qbgen.jpg",
      model: "uni-app + uniCloud · 全栈开发",
      duration: "",
      link: "https://luxurylove.github.io/QBGen/",
      linkLabel: "在线体验 QBGen",
      summary: [
        "毕业设计作品：一套面向教师与学生的在线题库与自动组卷考试系统，目标是把「找题、组卷、发卷、判分」这条重复且易错的流程自动化。",
        "系统基于 uni-app + uniCloud 构建：题库按学科、章节、题型与难度分类管理，组卷时按规则自动抽题并生成试卷；学生端完成在线作答，客观题自动判分，主观题集中批阅。",
        "从数据模型、云函数接口到前端页面与部署上线，全流程独立完成。",
      ],
      highlights: [
        "设计题库的数据结构与分类体系，支持按学科 / 章节 / 题型 / 难度检索",
        "实现自动组卷策略：按规则抽题、避免重复、控制难度分布",
        "完成在线作答、自动判分与成绩统计的完整闭环",
        "uni-app + uniCloud 全栈实现，并部署为可访问的在线版本",
      ],
      tags: ["uni-app", "uniCloud", "Vue", "自动组卷", "在线考试"],
      aiTools: ["Trae", "DeepSeek V4.1 Flash", "ChatGPT"],
      aiNote: "Trae 中调用 DeepSeek V4.1 Flash 写初版代码与功能实现，ChatGPT 负责对关键逻辑与边界情况做二次检测。",
      video: null,
      gallery: [],
    },
    {
      id: "jinyan",
      title: "VR 金星砚",
      en: "VR JINXING INKSTONE",
      category: "VR 虚拟展馆",
      year: "2024",
      subtitle: "走进一方砚台背后的千年文脉，在虚拟展厅里漫游砚文化。",
      cover: "assets/covers/jinyan.jpg",
      model: "Unity · 3D 场景还原",
      duration: "02:22",
      summary: [
        "以江西婺源金星砚为线索，把「砚文化」从书本里搬到可漫游的虚拟展厅：古书架、卷轴、博古架与青石地面共同构成一个安静、可供停留的观看空间。",
        "项目重点在于展厅氛围的营造——用光线、材质与陈列节奏，让观众在虚拟空间里自然放慢脚步。",
      ],
      highlights: [
        "独立完成展厅场景搭建、材质与灯光设计",
        "设计漫游路径与观看节奏，让展品信息自然进入视野",
        "统一中式视觉语言，控制整体色调与氛围",
      ],
      tags: ["Unity", "VR 漫游", "场景搭建", "文化展陈"],
      aiTools: ["ChatGPT"],
      aiNote: "C# 交互脚本由 ChatGPT 辅助编写。",
      video: { src: "assets/videos/jinyan.mp4" },
      gallery: [],
    },
    {
      id: "beast",
      title: "画中之兽",
      en: "THE BEAST IN THE PAINTING",
      category: "VR 古画漫游",
      year: "2024",
      subtitle: "把古画展开成一个可以走进去的世界，与画中神兽正面相遇。",
      cover: "assets/covers/beast.jpg",
      model: "Unity · 古画三维化",
      duration: "01:50",
      summary: [
        "从传统山水长卷出发，把二维画面里的山石、松树、亭台与神兽拆解为可进入的三维空间，让观众站在画中，而不是看画之外。",
        "项目尝试在保留古画气质的同时，引入实时三维的观看方式：雾气的层次、山体的轮廓、神兽的登场都被重新设计成一段可体验的叙事。",
      ],
      highlights: [
        "古画元素的三维化转译与场景重组",
        "设计神兽登场的关键时刻与镜头节奏",
        "用雾、光与景深还原水墨的空间纵深",
      ],
      tags: ["Unity", "古画三维化", "叙事设计", "氛围渲染"],
      aiTools: ["ChatGPT"],
      aiNote: "C# 交互脚本由 ChatGPT 辅助编写。",
      video: { src: "assets/videos/beast.mp4" },
      gallery: [],
    },
    {
      id: "jiangxi",
      title: "走进红色江西",
      en: "RED JIANGXI · VIRTUAL MEMORIAL",
      category: "Unity 虚拟纪念馆",
      year: "2023",
      subtitle: "用虚拟展馆承载一段红色历史，让纪念有了可走进的形式。",
      cover: "assets/covers/jiangxi.jpg",
      model: "Unity · 虚拟纪念展陈",
      duration: "01:20",
      summary: [
        "以红色江西的历史脉络为主题，构建一座可漫游的虚拟纪念馆：浮雕墙、历史照片、文献版面与展签共同组成完整的参观动线。",
        "重点处理严肃题材的视觉分寸——展陈信息清晰可读，空间气氛庄重克制，让内容而不是特效成为主角。",
      ],
      highlights: [
        "纪念馆空间布局与参观动线设计",
        "历史图文信息的版面组织与可读性处理",
        "庄重克制的灯光与材质基调",
      ],
      tags: ["Unity", "虚拟展馆", "展陈设计", "历史主题"],
      aiTools: ["ChatGPT"],
      aiNote: "C# 交互脚本由 ChatGPT 辅助编写。",
      video: { src: "assets/videos/jiangxi.mp4" },
      gallery: [],
    },
  ],
};
