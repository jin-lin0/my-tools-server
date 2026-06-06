const sequelize = require("../config/database");
const Question = require("../models/question");

const finalChapterQuestions = [
  // 补充更多JavaScript题
  {
    title: "什么是JavaScript的闭包？",
    content: "请解释闭包的概念和用途。",
    answer: `**闭包：**
函数能够记住并访问其词法作用域，即使函数在该作用域之外执行

**用途：**
- 封装私有变量
- 函数柯里化
- 模块模式
- 事件处理回调
- 保存状态`,
    analysis: "JS核心概念。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["闭包", "JavaScript", "作用域"],
  },
  {
    title: "什么是JavaScript的原型链？",
    content: "请解释原型和原型链的概念。",
    answer: `**原型：**
每个函数都有prototype，每个对象都有__proto__

**原型链：**
查找属性时，从自身开始，沿__proto__向上查找，直到null

**继承：**
基于原型链的继承是JS的核心特性`,
    analysis: "JS继承的核心。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["原型链", "原型", "继承"],
  },
  {
    title: "JavaScript的事件循环机制？",
    content: "请解释事件循环的工作原理。",
    answer: `**事件循环：**
- 执行同步代码
- 执行微任务
- 执行宏任务
- 重复

**微任务：**
Promise、async/await、queueMicrotask

**宏任务：**
setTimeout、setInterval、requestAnimationFrame、事件`,
    analysis: "JS异步的核心。",
    difficulty: "hard",
    categoryId: 1,
    tags: ["事件循环", "微任务", "宏任务"],
  },
  {
    title: "JavaScript的this指向？",
    content: "请解释this的绑定规则。",
    answer: `**this绑定：**
1. 默认绑定：全局或undefined
2. 隐式绑定：obj.foo()
3. 显式绑定：call/apply/bind
4. new绑定：构造函数
5. 箭头函数：继承外层`,
    analysis: "JS高频面试题。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["this", "绑定", "JavaScript"],
  },
  {
    title: "什么是JavaScript的作用域？",
    content: "请解释作用域的类型。",
    answer: `**作用域：**
- 全局作用域
- 函数作用域
- 块级作用域

**词法作用域：**
函数定义时就确定作用域

**作用域链：**
查找变量时沿作用域链向上`,
    analysis: "JS基础概念。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["作用域", "词法作用域", "作用域链"],
  },
  {
    title: "什么是JavaScript的类型？",
    content: "请解释JS的类型系统。",
    answer: `**基本类型：**
- number
- string
- boolean
- null
- undefined
- symbol
- bigint

**引用类型：**
- object
- array
- function

**类型判断：**
- typeof
- instanceof
- Object.prototype.toString.call`,
    analysis: "JS基础。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["类型", "typeof", "instanceof"],
  },
  {
    title: "什么是JavaScript的ES6+特性？",
    content: "请列举ES6+的重要特性。",
    answer: `**ES6+特性：**
- let/const
- 箭头函数
- 模板字符串
- 解构赋值
- 展开运算符
- Promise
- async/await
- 类
- 模块
- Symbol
- Map/Set`,
    analysis: "JS现代特性。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["ES6", "现代JavaScript", "新特性"],
  },
  // 补充更多Vue题
  {
    title: "Vue的响应式原理？",
    content: "请解释Vue2和Vue3的响应式。",
    answer: `**Vue2：**
- Object.defineProperty
- 监听get/set
- 不能监听新增/删除

**Vue3：**
- Proxy
- 监听整个对象
- 支持数组
- 性能更好`,
    analysis: "Vue核心原理。",
    difficulty: "hard",
    categoryId: 2,
    tags: ["响应式", "Vue2", "Vue3", "Proxy"],
  },
  {
    title: "Vue的组件通信？",
    content: "请列举Vue组件通信的方式。",
    answer: `**通信方式：**
- 父子：props/$emit
- 跨级：provide/inject
- 全局：Vuex/Pinia
- 兄弟：event bus
- 父访问子：ref
- 子访问父：$parent`,
    analysis: "Vue开发基础。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["组件通信", "props", "emit", "Vuex"],
  },
  {
    title: "Vue的生命周期？",
    content: "请解释Vue的生命周期钩子。",
    answer: `**生命周期：**
创建 → 挂载 → 更新 → 卸载

**Vue3：**
- setup
- onBeforeMount
- onMounted
- onBeforeUpdate
- onUpdated
- onBeforeUnmount
- onUnmounted`,
    analysis: "Vue基础。",
    difficulty: "easy",
    categoryId: 2,
    tags: ["生命周期", "Vue", "钩子"],
  },
  {
    title: "Vue的计算属性和侦听器？",
    content: "请解释computed和watch的区别。",
    answer: `**computed：**
- 计算属性
- 有缓存
- 依赖变化才更新

**watch：**
- 侦听器
- 监听数据变化
- 执行副作用
- 支持深度监听`,
    analysis: "Vue常用API。",
    difficulty: "easy",
    categoryId: 2,
    tags: ["computed", "watch", "Vue"],
  },
  {
    title: "Vue的指令？",
    content: "请列举Vue的常用指令。",
    answer: `**常用指令：**
- v-bind：绑定属性
- v-on：事件绑定
- v-if：条件
- v-for：列表
- v-model：双向绑定
- v-show：显示隐藏
- v-slot：插槽`,
    analysis: "Vue模板基础。",
    difficulty: "easy",
    categoryId: 2,
    tags: ["指令", "v-model", "v-for", "Vue"],
  },
  // 补充更多React题
  {
    title: "React的Hooks？",
    content: "请列举常用的React Hooks。",
    answer: `**常用Hooks：**
- useState：状态
- useEffect：副作用
- useContext：上下文
- useReducer：复杂状态
- useRef：引用
- useMemo：缓存值
- useCallback：缓存函数
- 自定义Hook`,
    analysis: "React 16.8+核心。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["Hooks", "useState", "useEffect", "React"],
  },
  {
    title: "React的组件通信？",
    content: "请解释React组件通信的方式。",
    answer: `**通信方式：**
- 父子：props
- 跨级：Context
- 全局：Redux/Zustand
- 回调：函数props
- 状态提升`,
    analysis: "React开发基础。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["组件通信", "props", "Context", "Redux"],
  },
  {
    title: "React的性能优化？",
    content: "请列举React性能优化的方法。",
    answer: `**性能优化：**
- React.memo
- useMemo
- useCallback
- 避免内联函数
- 虚拟列表
- 减少重渲染
- 代码分割`,
    analysis: "React进阶。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["性能优化", "React.memo", "React"],
  },
  // 补充更多CSS题
  {
    title: "CSS的盒模型？",
    content: "请解释标准盒模型和怪异盒模型。",
    answer: `**盒模型：**
内容、padding、border、margin

**标准盒：**
width = content

**怪异盒：**
width = content + padding + border

**控制：**
box-sizing: border-box;`,
    analysis: "CSS基础。",
    difficulty: "easy",
    categoryId: 3,
    tags: ["盒模型", "box-sizing", "CSS"],
  },
  {
    title: "CSS的选择器优先级？",
    content: "请解释CSS选择器的优先级。",
    answer: `**优先级：**
!important > 内联 > ID > 类/属性/伪类 > 元素/伪元素

**计算：**
- 1000：内联
- 100：ID
- 10：类
- 1：元素`,
    analysis: "CSS基础。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["选择器", "优先级", "CSS"],
  },
  {
    title: "CSS的布局？",
    content: "请解释Flex和Grid布局。",
    answer: `**Flex：**
一维布局，主轴交叉轴

**Grid：**
二维布局，行和列

**其他：**
- 浮动
- 定位
- 文档流`,
    analysis: "CSS布局核心。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["Flex", "Grid", "布局", "CSS"],
  },
  {
    title: "CSS的动画？",
    content: "请解释CSS动画的实现方式。",
    answer: `**动画方式：**
- transition：过渡
- animation：关键帧
- transform：变换

**性能：**
优先使用transform和opacity`,
    analysis: "CSS动画。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["动画", "transition", "animation", "CSS"],
  },
  // 补充更多网络题
  {
    title: "HTTP的状态码？",
    content: "请解释常用的HTTP状态码。",
    answer: `**状态码：**
2xx：成功
- 200 OK
- 201 Created

3xx：重定向
- 301 永久
- 302 临时
- 304 未修改

4xx：客户端错误
- 400 错误请求
- 401 未授权
- 403 禁止
- 404 未找到

5xx：服务器错误
- 500 服务器错误
- 502 网关错误`,
    analysis: "网络基础。",
    difficulty: "easy",
    categoryId: 5,
    tags: ["HTTP", "状态码", "网络"],
  },
  {
    title: "HTTP的缓存策略？",
    content: "请解释HTTP缓存的机制。",
    answer: `**强缓存：**
- Cache-Control
- Expires
- 不发请求

**协商缓存：**
- Last-Modified/If-Modified-Since
- ETag/If-None-Match
- 发请求验证`,
    analysis: "性能优化重要手段。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["缓存", "HTTP", "性能优化"],
  },
  {
    title: "HTTP和HTTPS的区别？",
    content: "请解释HTTPS的原理。",
    answer: `**区别：**
- 明文 vs 加密
- 80 vs 443
- 证书

**HTTPS流程：**
1. 客户端发起HTTPS请求
2. 服务端返回证书
3. 客户端验证证书
4. 生成随机密钥，用公钥加密发送
5. 服务端用私钥解密，得到密钥
6. 双方用密钥加密通信`,
    analysis: "网络安全基础。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["HTTP", "HTTPS", "SSL/TLS", "安全"],
  },
  // 补充更多工程化题
  {
    title: "Webpack的核心概念？",
    content: "请解释Webpack的核心概念。",
    answer: `**核心概念：**
- Entry：入口
- Output：输出
- Loader：转换
- Plugin：插件
- Module：模块
- Chunk：代码块`,
    analysis: "构建工具基础。",
    difficulty: "medium",
    categoryId: 7,
    tags: ["Webpack", "构建工具", "工程化"],
  },
  {
    title: "Vite的原理？",
    content: "请解释Vite为什么快。",
    answer: `**Vite原理：**
- 开发模式：基于ES模块，即时编译
- 不打包，按需编译
- 预构建依赖
- 生产构建：使用Rollup打包

**优势：**
- 启动快
- 更新快
- 配置简单`,
    analysis: "现代构建工具。",
    difficulty: "medium",
    categoryId: 7,
    tags: ["Vite", "ES模块", "构建工具"],
  },
  // 补充更多算法题
  {
    title: "什么是时间复杂度和空间复杂度？",
    content: "请解释算法复杂度的概念。",
    answer: `**时间复杂度：**
执行时间随数据规模增长的趋势

**常见复杂度：**
O(1) < O(log n) < O(n) < O(n log n) < O(n²)

**空间复杂度：**
执行算法需要的额外空间`,
    analysis: "算法分析基础。",
    difficulty: "easy",
    categoryId: 8,
    tags: ["时间复杂度", "空间复杂度", "算法"],
  },
  {
    title: "请实现斐波那契数列？",
    content: "请写出斐波那契的实现。",
    answer: `**递归：**
\`\`\`javascript
function fib(n) {
  if (n <= 1) return n;
  return fib(n-1) + fib(n-2);
}
\`\`\`

**循环：**
\`\`\`javascript
function fib(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}
\`\`\``,
    analysis: "经典递归题。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["斐波那契", "递归", "算法"],
  },
  // 补充更多手写题
  {
    title: "请实现Promise？",
    content: "请手写一个简单的Promise。",
    answer: `**实现：**
\`\`\`javascript
class MyPromise {
  constructor(fn) {
    this.state = 'pending';
    this.value = null;
    this.reason = null;
    this.onFulfilled = [];
    this.onRejected = [];
    
    const resolve = (value) => {
      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      this.value = value;
      this.onFulfilled.forEach(cb => cb(value));
    };
    
    const reject = (reason) => {
      if (this.state !== 'pending') return;
      this.state = 'rejected';
      this.reason = reason;
      this.onRejected.forEach(cb => cb(reason));
    };
    
    try {
      fn(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  
  then(onFulfilled, onRejected) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.value);
    } else if (this.state === 'rejected') {
      onRejected(this.reason);
    } else {
      this.onFulfilled.push(onFulfilled);
      this.onRejected.push(onRejected);
    }
  }
}
\`\`\``,
    analysis: "手写Promise考察对Promise的理解。",
    difficulty: "hard",
    categoryId: 8,
    tags: ["Promise", "手写", "异步"],
  },
];

async function batchImport() {
  try {
    const created = await Question.bulkCreate(finalChapterQuestions);
    console.log(`成功导入 ${created.length} 道最终面试题`);
    process.exit(0);
  } catch (error) {
    console.error("导入失败:", error);
    process.exit(1);
  }
}

batchImport();
