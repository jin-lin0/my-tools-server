const sequelize = require("../config/database");
const Question = require("../models/question");

const comprehensiveQuestions = [
  {
    title: "什么是闭包？应用场景？",
    content: "请解释闭包的概念和常见应用。",
    answer: `**闭包：**
函数能够记住并访问其词法作用域，即使函数在其词法作用域之外执行

**应用场景：**
1. 封装私有变量
2. 函数柯里化
3. 模块模式
4. 事件处理器

\`\`\`javascript
function counter() {
  let count = 0;
  return function() {
    return ++count;
  };
}
const c = counter();
c(); // 1
c(); // 2
\`\`\``,
    analysis: "闭包是JavaScript最核心的概念之一。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["闭包", "JavaScript", "作用域"],
  },
  {
    title: "什么是原型和原型链？",
    content: "请解释原型和原型链的概念。",
    answer: `**原型：**
每个函数都有prototype，每个对象都有__proto__

**原型链：**
对象查找属性时，先找自身，再找__proto__，层层向上直到null

\`\`\`javascript
function Person() {}
Person.prototype.say = function() {};
const p = new Person();
p.__proto__ === Person.prototype // true
\`\`\``,
    analysis: "原型链是实现继承的核心。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["原型", "原型链", "继承"],
  },
  {
    title: "什么是事件循环？微任务宏任务？",
    content: "请解释事件循环的运行机制。",
    answer: `**事件循环：**
1. 执行同步代码
2. 执行所有微任务
3. 执行宏任务

**微任务：**
- Promise
- async/await
- MutationObserver

**宏任务：**
- setTimeout
- setInterval
- requestAnimationFrame`,
    analysis: "事件循环是理解异步的关键。",
    difficulty: "hard",
    categoryId: 1,
    tags: ["事件循环", "微任务", "宏任务"],
  },
  {
    title: "什么是this？如何确定this指向？",
    content: "请解释this的指向规则。",
    answer: `**this绑定规则：**
1. 默认绑定：非严格模式指向全局
2. 隐式绑定：obj.foo()，this指向obj
3. 显式绑定：call/apply/bind
4. new绑定：new构造函数，this指向实例
5. 箭头函数：继承外层作用域`,
    analysis: "this是高频面试题。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["this", "JavaScript", "执行上下文"],
  },
  {
    title: "什么是DOM事件流？冒泡和捕获？",
    content: "请解释DOM事件流的三个阶段。",
    answer: `**事件流：**
1. 捕获阶段：从window往下传播
2. 目标阶段：到达目标元素
3. 冒泡阶段：从目标往上传播

**addEventListener第三个参数：**
true：捕获阶段触发
false：冒泡阶段触发（默认）

**阻止事件：**
stopPropagation() - 阻止冒泡/捕获
preventDefault() - 阻止默认行为`,
    analysis: "事件流是前端基础。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["DOM", "事件流", "冒泡"],
  },
  {
    title: "什么是重排和重绘？如何优化？",
    content: "请解释重排重绘的概念和优化。",
    answer: `**重排：**
布局几何属性变化，重新计算布局

**重绘：**
外观变化，不影响布局，重新绘制

**优化：**
- 使用transform代替top/left
- 批量修改DOM
- 使用DocumentFragment
- 使用虚拟列表
- 避免频繁读取布局属性`,
    analysis: "重排重绘是性能优化的重要方面。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["重排", "重绘", "性能优化"],
  },
  {
    title: "什么是函数柯里化？",
    content: "请解释柯里化的概念和应用。",
    answer: `**柯里化：**
把接受多参数的函数变成接受单一参数的函数

\`\`\`javascript
function add(a) {
  return function(b) {
    return a + b;
  };
}
add(1)(2); // 3
\`\`\``,
    analysis: "函数式编程的重要概念。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["柯里化", "函数式编程"],
  },
  {
    title: "什么是内存泄漏？如何避免？",
    content: "请解释内存泄漏的常见原因和避免方法。",
    answer: `**常见原因：**
1. 全局变量未清理
2. 未清理的定时器
3. DOM引用未释放
4. 闭包引用

**避免：**
- 使用let/const
- 及时清理定时器和事件监听
- 合理使用闭包
- 使用Chrome DevTools分析`,
    analysis: "内存管理是高级前端需要了解的。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["内存泄漏", "性能", "内存"],
  },
  {
    title: "什么是服务端渲染SSR？",
    content: "请解释服务端渲染的概念和优劣。",
    answer: `**SSR：**
在服务端生成HTML，发送给浏览器

**优点：**
- SEO友好
- 首屏加载快

**缺点：**
- 服务端压力大
- 开发复杂

**框架：**
- Next.js
- Nuxt.js`,
    analysis: "SSR是现代前端的重要技术。",
    difficulty: "medium",
    categoryId: 7,
    tags: ["SSR", "服务端渲染", "Next.js"],
  },
  {
    title: "什么是PWA？",
    content: "请解释渐进式Web应用的概念。",
    answer: `**PWA特性：**
- 可安装到桌面
- 离线可用
- 推送通知
- 类似原生体验

**核心技术：**
- Service Worker
- Manifest
- HTTPS`,
    analysis: "PWA是Web应用的发展方向之一。",
    difficulty: "medium",
    categoryId: 7,
    tags: ["PWA", "Service Worker", "Web应用"],
  },
  {
    title: "什么是Web Worker？",
    content: "请解释Web Worker的作用。",
    answer: `**Web Worker：**
在后台线程运行JS，不阻塞主线程

**用途：**
- 大量计算
- 大数据处理
- 不影响UI响应

**注意：**
- 不能操作DOM
- 通过postMessage通信`,
    analysis: "前端多线程的解决方案。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["Web Worker", "多线程", "性能"],
  },
  {
    title: "什么是微前端？",
    content: "请解释微前端的概念和应用。",
    answer: `**微前端：**
将大应用拆成小应用，独立开发部署

**优势：**
- 独立部署
- 技术栈无关
- 团队自治

**常见方案：**
- qiankun
- single-spa
- Module Federation`,
    analysis: "微前端是大型应用的架构方案。",
    difficulty: "hard",
    categoryId: 7,
    tags: ["微前端", "架构", "qiankun"],
  },
  {
    title: "什么是TypeScript？为什么要用？",
    content: "请解释TypeScript的优势。",
    answer: `**优势：**
1. 类型安全 - 提前发现错误
2. 更好的IDE支持 - 自动补全、类型提示
3. 更易维护 - 大型项目
4. 渐进式 - 可与JS共存`,
    analysis: "TS是现代前端的标配。",
    difficulty: "easy",
    categoryId: 6,
    tags: ["TypeScript", "类型系统"],
  },
  {
    title: "什么是GraphQL？",
    content: "请解释GraphQL的概念和对比REST。",
    answer: `**GraphQL：**
一种查询语言，前端可以精确获取所需数据

**对比REST：**
- REST：多个接口，过度获取/获取不足
- GraphQL：一个接口，按需获取

**核心概念：**
- Query：查询
- Mutation：修改
- Subscription：订阅`,
    analysis: "GraphQL是API设计的新范式。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["GraphQL", "API", "REST"],
  },
  {
    title: "请描述一下你的项目开发流程？",
    content: "请描述从需求到上线的完整开发流程。",
    answer: `**开发流程：**
1. 需求分析 - 理解需求，技术方案
2. 技术选型 - 框架、工具选择
3. 开发 - 代码编写、自测
4. Code Review - 代码审查
5. 测试 - 测试用例
6. 部署 - 上线
7. 监控 - 线上监控`,
    analysis: "工程化和流程是面试常见问题。",
    difficulty: "medium",
    categoryId: 7,
    tags: ["开发流程", "工程化", "团队"],
  },
  {
    title: "你在项目中遇到过什么难题？如何解决？",
    content: "请分享一个项目中解决的难题。",
    answer: `**常见难题方向：**
1. 性能问题 - 定位瓶颈，优化
2. 兼容性问题 - 适配各浏览器
3. 架构问题 - 重构设计
4. 协作问题 - 沟通协调

**回答技巧：**
STAR法则
- Situation：背景
- Task：任务
- Action：行动
- Result：结果`,
    analysis: "行为面试题，考察解决问题能力。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["面试", "项目", "经验"],
  },
  {
    title: "如何学习新技术？",
    content: "请分享你的学习方法。",
    answer: `**学习方法：**
1. 官方文档
2. 实战项目
3. 技术博客
4. 源码阅读
5. 社区交流
6. 总结输出`,
    analysis: "考察学习能力和主动性。",
    difficulty: "easy",
    categoryId: 3,
    tags: ["学习", "成长", "软技能"],
  },
  {
    title: "你的职业规划是什么？",
    content: "请谈谈你的职业发展规划。",
    answer: `**常见方向：**
- 技术专家：深入技术领域
- 技术管理：带团队做项目
- 全栈：前后端都精通
- 领域专家：垂直领域深耕

**回答要点：**
- 有明确的方向
- 和公司发展匹配
- 有可行的路径`,
    analysis: "软技能面试，考察稳定性。",
    difficulty: "easy",
    categoryId: 3,
    tags: ["职业规划", "软技能", "面试"],
  },
  {
    title: "ES6+有哪些新特性？",
    content: "请列举常用的ES6及后续版本的新特性。",
    answer: `**常用特性：**
- let/const
- 箭头函数
- 模板字符串
- 解构赋值
- 展开运算符
- Promise
- async/await
- 模块化
- Map/Set
- Symbol
- BigInt
- 可选链
- 空值合并`,
    analysis: "JS基础，需要熟练使用。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["ES6", "JavaScript", "新特性"],
  },
  {
    title: "什么是强缓存和协商缓存？",
    content: "请解释浏览器缓存策略。",
    answer: `**强缓存：**
- Expires / Cache-Control
- 不发请求，直接用缓存

**协商缓存：**
- Last-Modified / If-Modified-Since
- ETag / If-None-Match
- 发请求验证，304则用缓存`,
    analysis: "缓存是性能优化的重要手段。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["缓存", "HTTP", "性能"],
  },
  {
    title: "什么是虚拟DOM？diff算法？",
    content: "请解释虚拟DOM的概念和优势。",
    answer: `**虚拟DOM：**
用JS对象描述DOM结构

**优势：**
1. 减少DOM操作
2. 跨平台
3. 声明式UI

**diff算法：**
比较新旧虚拟DOM，最小化更新

**Vue3优化：**
- 静态标记
- 事件缓存
- 最长递增子序列`,
    analysis: "框架核心原理，常考。",
    difficulty: "hard",
    categoryId: 2,
    tags: ["虚拟DOM", "diff", "框架"],
  },
];

async function batchImport() {
  try {
    const created = await Question.bulkCreate(comprehensiveQuestions);
    console.log(`成功导入 ${created.length} 道综合面试题`);
    process.exit(0);
  } catch (error) {
    console.error("导入失败:", error);
    process.exit(1);
  }
}

batchImport();
