const sequelize = require("../config/database");
const Question = require("../models/question");

const moreComprehensiveQuestions = [
  // 综合面试题补充
  {
    title: "什么是前端工程化？包含哪些方面？",
    content: "请解释前端工程化的概念。",
    answer: `**前端工程化：**
把软件工程的方法应用到前端开发

**包含方面：**
- 模块化
- 组件化
- 规范化
- 自动化
- 性能优化

**工具链：**
- 构建工具：Webpack/Vite
- 包管理：npm/yarn/pnpm
- 代码规范：ESLint/Prettier
- 测试：Jest/Vitest
- CI/CD：GitHub Actions/GitLab CI`,
    analysis: "前端开发的宏观理解。",
    difficulty: "medium",
    categoryId: 7,
    tags: ["工程化", "前端", "工具链"],
  },
  {
    title: "什么是MVVM模式？",
    content: "请解释MVVM的概念。",
    answer: `**MVVM：**
Model-View-ViewModel

**组成：**
- Model：数据层
- View：视图层
- ViewModel：数据视图层

**核心：**
- 数据双向绑定
- 数据驱动视图
- ViewModel把数据变视图`,
    analysis: "框架的设计模式。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["MVVM", "设计模式", "框架"],
  },
  {
    title: "什么是虚拟DOM？有什么优势？",
    content: "请解释虚拟DOM的概念。",
    answer: `**虚拟DOM：**
JS对象描述真实DOM

**优势：**
- 减少DOM操作
- 性能更好
- 跨平台
- 声明式

**Diff算法：**
比较新旧虚拟DOM差异，最小更新`,
    analysis: "现代框架核心。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["虚拟DOM", "Diff", "框架"],
  },
  {
    title: "什么是数据驱动？",
    content: "请解释数据驱动的概念。",
    answer: `**数据驱动：**
数据变化自动更新视图

**核心：**
- 响应式
- 声明式
- 不需要手动操作DOM

**好处：**
- 更关注业务
- 代码简洁
- 易维护`,
    analysis: "现代框架的核心思想。",
    difficulty: "easy",
    categoryId: 3,
    tags: ["数据驱动", "响应式", "框架"],
  },
  {
    title: "什么是组件化？有什么优势？",
    content: "请解释组件化的概念。",
    answer: `**组件化：**
把UI拆分成独立可复用的组件

**优势：**
- 可复用
- 可维护
- 可测试
- 解耦

**特点：**
- 单一职责
- 可组合
- 可通信`,
    analysis: "前端开发的重要思想。",
    difficulty: "easy",
    categoryId: 3,
    tags: ["组件化", "组件", "架构"],
  },
  {
    title: "什么是声明式编程和命令式编程？",
    content: "请解释两者的区别。",
    answer: `**命令式：**
告诉怎么做，步骤详细

**声明式：**
告诉做什么，结果导向

**例子：**
- jQuery：命令式
- React/Vue：声明式

**优势：**
声明式代码更简洁，更易读`,
    analysis: "编程范式的理解。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["声明式", "命令式", "编程范式"],
  },
  {
    title: "什么是函数式编程？有什么特点？",
    content: "请解释函数式编程的概念。",
    answer: `**函数式编程：**
以函数为核心

**特点：**
- 纯函数
- 无副作用
- 不可变数据
- 函数是一等公民
- 组合高于继承

**核心概念：**
- 纯函数
- 高阶函数
- 闭包
- 函数组合
- 柯里化`,
    analysis: "编程范式，现代前端常用。",
    difficulty: "hard",
    categoryId: 3,
    tags: ["函数式编程", "纯函数", "高阶函数"],
  },
  {
    title: "什么是设计模式？常用的有哪些？",
    content: "请列举常用的前端设计模式。",
    answer: `**设计模式：**
解决特定问题的最佳实践

**创建型：**
- 单例模式
- 工厂模式
- 构造函数模式

**结构型：**
- 适配器模式
- 装饰器模式
- 代理模式

**行为型：**
- 观察者模式
- 策略模式
- 迭代器模式`,
    analysis: "解决常见问题的套路。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["设计模式", "架构", "最佳实践"],
  },
  {
    title: "什么是单例模式？怎么实现？",
    content: "请解释单例模式的概念和实现。",
    answer: `**单例模式：**
确保一个类只有一个实例

\`\`\`javascript
class Singleton {
  static instance;
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
}
\`\`\``,
    analysis: "常用设计模式。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["单例模式", "设计模式", "创建型"],
  },
  {
    title: "什么是观察者模式？",
    content: "请解释观察者模式的概念。",
    answer: `**观察者模式：**
定义一对多依赖，一个状态变化，多个观察者更新

\`\`\`javascript
class Subject {
  constructor() {
    this.observers = [];
  }
  add(observer) {
    this.observers.push(observer);
  }
  notify(message) {
    this.observers.forEach(o => o.update(message));
  }
}
\`\`\``,
    analysis: "常用设计模式，事件系统就是这个。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["观察者模式", "设计模式", "行为型"],
  },
  {
    title: "什么是装饰器模式？",
    content: "请解释装饰器模式的概念。",
    answer: `**装饰器模式：**
不修改类，动态给对象添加功能

\`\`\`javascript
function log(target, name, descriptor) {
  const fn = descriptor.value;
  descriptor.value = function(...args) {
    console.log('Calling', name);
    return fn.apply(this, args);
  };
}
\`\`\``,
    analysis: "ES装饰器就是这个思想。",
    difficulty: "hard",
    categoryId: 3,
    tags: ["装饰器模式", "设计模式", "结构型"],
  },
  // 性能优化补充
  {
    title: "什么是前端性能优化？有哪些方法？",
    content: "请列举性能优化的策略。",
    answer: `**加载优化：**
- 代码分割
- Tree Shaking
- 懒加载
- CDN
- 压缩

**渲染优化：**
- 减少重排重绘
- 虚拟列表
- 防抖节流
- 避免布局抖动
- 使用requestAnimationFrame`,
    analysis: "前端重要技能。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["性能优化", "前端", "优化"],
  },
  {
    title: "什么是首屏优化？有什么方法？",
    content: "请解释首屏优化的方法。",
    answer: `**首屏优化：**
优化第一次打开的速度

**方法：**
- 减少资源大小
- 减少请求数
- 并行加载
- 提前加载
- 骨架屏
- SSR
- 服务端预渲染`,
    analysis: "用户体验关键。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["首屏优化", "性能优化", "用户体验"],
  },
  {
    title: "什么是图片优化？有哪些方法？",
    content: "请解释图片优化的方法。",
    answer: `**图片优化：**
- 格式：WebP > JPEG > PNG
- 压缩
- 懒加载
- 响应式图片
- 雪碧图
- 图片CDN
- SVG代替小图标`,
    analysis: "前端性能优化大头。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["图片优化", "性能优化", "图片"],
  },
  {
    title: "什么是懒加载？怎么实现？",
    content: "请解释懒加载的概念和实现。",
    answer: `**懒加载：**
需要时才加载

**实现：**
- IntersectionObserver
- 监听scroll事件
- getBoundingClientRect

\`\`\`javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});
\`\`\``,
    analysis: "性能优化的常用手段。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["懒加载", "性能优化", "IntersectionObserver"],
  },
  {
    title: "什么是预加载？怎么实现？",
    content: "请解释预加载的概念和方法。",
    answer: `**预加载：**
提前加载资源

**方法：**
- <link rel="preload">
- 隐藏img
- JavaScript动态加载

**场景：**
- 下一页要用到的图片
- 字体
- 重要的JS/CSS`,
    analysis: "提升用户体验的手段。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["预加载", "性能优化", "资源加载"],
  },
  // 安全补充
  {
    title: "什么是XSS攻击？怎么防范？",
    content: "请解释XSS的概念和防范。",
    answer: `**XSS：**
跨站脚本攻击，注入恶意脚本

**类型：**
- 存储型
- 反射型
- DOM型

**防范：**
- 转义输出
- Content Security Policy
- HttpOnly Cookie
- 输入验证`,
    analysis: "前端最重要的安全问题。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["XSS", "安全", "跨站脚本"],
  },
  {
    title: "什么是CSRF攻击？怎么防范？",
    content: "请解释CSRF的概念和防范。",
    answer: `**CSRF：**
跨站请求伪造，利用登录态伪造请求

**防范：**
- Token验证
- SameSite Cookie
- 验证码
- Referer检查`,
    analysis: "常见安全问题。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["CSRF", "安全", "跨站请求伪造"],
  },
  {
    title: "什么是点击劫持？怎么防范？",
    content: "请解释点击劫持的概念和防范。",
    answer: `**点击劫持：**
用透明iframe覆盖页面，诱导点击

**防范：**
- X-Frame-Options
- frame-ancestors CSP
- JavaScript判断top.window`,
    analysis: "前端安全问题。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["点击劫持", "安全", "前端安全"],
  },
  {
    title: "什么是中间人攻击？怎么防范？",
    content: "请解释中间人攻击的概念。",
    answer: `**中间人攻击：**
在通信中间拦截篡改数据

**防范：**
- HTTPS
- HSTS
- 证书验证`,
    analysis: "网络安全。",
    difficulty: "hard",
    categoryId: 3,
    tags: ["中间人攻击", "安全", "HTTPS"],
  },
  {
    title: "什么是SQL注入？怎么防范？",
    content: "请解释SQL注入的概念。",
    answer: `**SQL注入：**
在输入中注入SQL代码，被执行

**防范：**
- 预编译
- ORM
- 输入验证
- 最小权限原则`,
    analysis: "后端安全问题，前端也要了解。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["SQL注入", "安全", "数据库"],
  },
  // 软技能
  {
    title: "你平时怎么学习前端？",
    content: "请分享学习方法。",
    answer: `**学习方法：**
- 官方文档
- 源码阅读
- 博客文章
- 技术视频
- 实战项目
- 技术社群
- 总结输出`,
    analysis: "考察学习能力。",
    difficulty: "easy",
    categoryId: 3,
    tags: ["学习", "软技能", "成长"],
  },
  {
    title: "你遇到过最棘手的问题是什么？怎么解决的？",
    content: "请分享解决问题的经历。",
    answer: `**回答思路：**
STAR法则
- Situation：背景
- Task：任务
- Action：行动
- Result：结果

**核心：**
展示分析和解决问题的能力`,
    analysis: "行为面试题。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["问题解决", "软技能", "STAR"],
  },
  {
    title: "你怎么看待新技术？",
    content: "请谈谈对新技术的看法。",
    answer: `**对待新技术：**
- 保持好奇心
- 但不盲目跟风
- 看解决什么问题
- 看成熟度
- 看团队匹配度
- 小范围试用`,
    analysis: "考察技术视野。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["技术选择", "软技能", "架构"],
  },
  {
    title: "你的职业规划是什么？",
    content: "请谈谈职业发展规划。",
    answer: `**规划方向：**
- 技术专家
- 技术管理
- 全栈
- 垂直领域

**关键：**
- 有阶段性目标
- 可执行的路径
- 与公司发展匹配`,
    analysis: "考察稳定性和目标感。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["职业规划", "软技能", "发展"],
  },
  {
    title: "你怎么和产品/设计配合？",
    content: "请谈谈团队协作的经验。",
    answer: `**配合要点：**
- 充分沟通理解需求
- 提出技术可行性建议
- 及时反馈进度问题
- 尊重专业但不盲从
- 共同追求好的结果`,
    analysis: "考察团队协作能力。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["团队协作", "软技能", "沟通"],
  },
  // 更多AI/Agent题
  {
    title: "什么是LLM？你用过哪些？",
    content: "请解释大语言模型的概念。",
    answer: `**LLM：**
Large Language Model，大语言模型

**主流模型：**
- GPT系列（OpenAI）
- Claude（Anthropic）
- Gemini（Google）
- Llama（Meta）
- 通义千问（阿里）
- 文心一言（百度）`,
    analysis: "AI基础概念。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["LLM", "AI", "大模型"],
  },
  {
    title: "什么是Prompt Engineering？常用技巧有哪些？",
    content: "请解释提示词工程的概念。",
    answer: `**提示词工程：**
设计高质量提示词，让AI更好输出

**常用技巧：**
- 清晰明确
- 设定角色
- 给出示例
- 分步骤
- 指定格式
- 加入思考`,
    analysis: "AI时代重要技能。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["Prompt", "提示词工程", "AI"],
  },
  {
    title: "什么是RAG？原理是什么？",
    content: "请解释检索增强生成的概念。",
    answer: `**RAG：**
Retrieval-Augmented Generation

**流程：**
1. 检索：从知识库找相关内容
2. 增强：把检索结果加给LLM
3. 生成：基于上下文回答

**优势：**
- 减少幻觉
- 更新知识
- 可解释
- 减少训练成本`,
    analysis: "企业级AI应用关键技术。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["RAG", "检索增强", "AI"],
  },
  {
    title: "什么是AI Agent？有哪些应用？",
    content: "请解释Agent的概念。",
    answer: `**Agent：**
能感知、推理、行动的AI系统

**组成：**
- 感知
- 记忆
- 推理
- 行动
- 工具使用

**应用：**
- 智能助手
- 自动化工作流
- 客服
- 编程助手`,
    analysis: "AI应用的重要方向。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["Agent", "智能体", "AI"],
  },
  {
    title: "什么是Vector Database？",
    content: "请解释向量数据库的概念。",
    answer: `**向量数据库：**
存储向量，支持相似度搜索

**常见：**
- Pinecone
- Milvus
- Chroma
- Weaviate

**用途：**
- RAG检索
- 语义搜索
- 推荐系统`,
    analysis: "AI应用基础设施。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["向量数据库", "Vector DB", "AI"],
  },
  {
    title: "什么是Embedding？怎么用？",
    content: "请解释向量嵌入的概念。",
    answer: `**Embedding：**
把文本等转换成向量

**用途：**
- 语义搜索
- 相似度计算
- 聚类
- 分类
- 推荐`,
    analysis: "RAG的基础。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["Embedding", "向量", "AI"],
  },
  {
    title: "什么是Fine-tuning？",
    content: "请解释微调的概念。",
    answer: `**Fine-tuning：**
在预训练模型上继续训练

**对比：**
- 预训练：通用能力
- 微调：特定任务

**优化：**
- LoRA
- QLoRA
- Adapter`,
    analysis: "模型定制的方法。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["微调", "Fine-tuning", "AI"],
  },
  {
    title: "什么是Zero-shot/Few-shot Learning？",
    content: "请解释少样本学习的概念。",
    answer: `**Zero-shot：**
不给示例，直接回答

**Few-shot：**
给少量示例，让模型模仿

**CoT：**
Chain of Thought，让模型一步一步推理`,
    analysis: "LLM的重要能力。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["Zero-shot", "Few-shot", "CoT", "AI"],
  },
];

async function batchImport() {
  try {
    const created = await Question.bulkCreate(moreComprehensiveQuestions);
    console.log(`成功导入 ${created.length} 道更多综合面试题`);
    process.exit(0);
  } catch (error) {
    console.error("导入失败:", error);
    process.exit(1);
  }
}

batchImport();
