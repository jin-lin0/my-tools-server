const sequelize = require("../config/database");
const Question = require("../models/question");

const massiveQuestions = [
  // JavaScript基础补充
  {
    title: "什么是执行上下文？",
    content: "请解释JavaScript执行上下文的概念。",
    answer: `**执行上下文：**
执行JS代码的环境，包含变量、this等

**类型：**
1. 全局执行上下文
2. 函数执行上下文
3. eval执行上下文

**创建阶段：**
- 创建变量对象
- 确定this指向
- 创建作用域链

**执行阶段：**
- 变量赋值
- 函数调用`,
    analysis: "理解JS运行机制的基础。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["执行上下文", "JavaScript", "作用域"],
  },
  {
    title: "什么是作用域链？",
    content: "请解释作用域链的概念。",
    answer: `**作用域链：**
查找变量时，先找当前作用域，找不到找外层，直到全局

**词法作用域：**
函数定义时就确定了作用域，和调用位置无关

**闭包：**
能够访问外层作用域变量的函数`,
    analysis: "和闭包、作用域相关。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["作用域链", "闭包", "JavaScript"],
  },
  {
    title: "什么是变量提升？",
    content: "请解释变量提升的概念。",
    answer: `**变量提升：**
var声明的变量会被提升到作用域顶部

**区别：**
- var：提升，undefined
- let/const：提升，但TDZ
- 函数声明：整个函数提升`,
    analysis: "JS经典面试题。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["变量提升", "TDZ", "var"],
  },
  {
    title: "什么是暂时性死区？",
    content: "请解释TDZ的概念。",
    answer: `**TDZ：**
let/const声明变量前，访问会报错的区域

**原因：**
变量已声明，但未初始化

**避免方式：**
- 先声明后使用
- 变量声明放顶部`,
    analysis: "let/const的重要特性。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["TDZ", "let", "const"],
  },
  {
    title: "什么是立即执行函数IIFE？",
    content: "请解释IIFE的概念和用途。",
    answer: `**IIFE：**
定义后立即执行的函数

\`\`\`javascript
(function() {})();
(() => {})();
\`\`\`

**用途：**
- 避免污染全局
- 私有变量
- 模块化`,
    analysis: "ES6之前的模块化方案。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["IIFE", "闭包", "模块化"],
  },
  {
    title: "什么是回调地狱？如何解决？",
    content: "请解释回调地狱的解决方案。",
    answer: `**回调地狱：**
回调函数层层嵌套

**解决：**
1. Promise
2. async/await
3. Generator
4. 模块化`,
    analysis: "异步编程的演进。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["回调地狱", "Promise", "async"],
  },
  {
    title: "什么是Promise？有哪些方法？",
    content: "请解释Promise的概念和API。",
    answer: `**Promise：**
表示异步操作的最终状态

**三种状态：**
- pending
- fulfilled
- rejected

**方法：**
- then/catch/finally
- Promise.all/race/allSettled/any
- Promise.resolve/reject`,
    analysis: "异步编程的核心。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["Promise", "异步", "JavaScript"],
  },
  {
    title: "什么是async/await？",
    content: "请解释async/await的使用。",
    answer: `**async/await：**
Promise的语法糖，异步代码像同步

\`\`\`javascript
async function fetchData() {
  const res = await fetch('/api');
  return res.json();
}
\`\`\`

**注意：**
- await必须在async函数中
- try/catch捕获错误`,
    analysis: "现代异步编程首选。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["async", "await", "Promise"],
  },
  {
    title: "什么是深拷贝浅拷贝？",
    content: "请解释两者区别和实现。",
    answer: `**浅拷贝：**
只复制第一层，嵌套对象共享

**深拷贝：**
递归复制所有层级

**实现：**
- 浅：Object.assign/展开运算符
- 深：JSON.parse(JSON.stringify)/lodash.cloneDeep/递归`,
    analysis: "JS常考手写题。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["深拷贝", "浅拷贝", "手写"],
  },
  {
    title: "什么是事件委托？",
    content: "请解释事件委托的概念和优势。",
    answer: `**事件委托：**
利用冒泡，把子元素事件绑定到父元素

**优势：**
- 减少事件监听数量
- 动态添加元素也能响应

\`\`\`javascript
list.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    // 处理
  }
});
\`\`\``,
    analysis: "DOM事件的重要技巧。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["事件委托", "冒泡", "DOM"],
  },
  {
    title: "什么是防抖和节流？",
    content: "请解释两者概念和实现。",
    answer: `**防抖：**
事件触发后延迟执行，期间再触发则重置
应用：搜索输入

**节流：**
规定时间内只执行一次
应用：滚动事件`,
    analysis: "性能优化的常用手段。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["防抖", "节流", "性能优化"],
  },
  {
    title: "什么是函数组合？",
    content: "请解释函数式编程的组合概念。",
    answer: `**函数组合：**
多个函数组合成新函数，从右到左执行

\`\`\`javascript
const compose = (f, g) => x => f(g(x));
\`\`\``,
    analysis: "函数式编程基础。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["函数组合", "函数式编程", "compose"],
  },
  {
    title: "什么是函数柯里化？",
    content: "请解释柯里化的概念和实现。",
    answer: `**柯里化：**
把多参数函数转化成单参数函数系列

\`\`\`javascript
const add = a => b => a + b;
add(1)(2); // 3
\`\`\``,
    analysis: "函数式编程技术。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["柯里化", "函数式编程", "curry"],
  },
  {
    title: "什么是偏函数？",
    content: "请解释偏函数的概念。",
    answer: `**偏函数：**
固定部分参数，产生新函数

**区别：**
- 柯里化：每次只传一个参数
- 偏函数：可以固定多个参数`,
    analysis: "函数式编程技术。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["偏函数", "函数式编程", "partial"],
  },
  {
    title: "什么是纯函数？",
    content: "请解释纯函数的概念和优势。",
    answer: `**纯函数：**
- 相同输入得相同输出
- 无副作用

**优势：**
- 可测试
- 可缓存
- 可复用
- 无依赖`,
    analysis: "函数式编程的核心概念。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["纯函数", "函数式编程", "side effects"],
  },
  {
    title: "什么是JavaScript模块化？",
    content: "请解释模块化的发展历程。",
    answer: `**模块化方案：**
- CommonJS：Node.js，同步
- AMD：浏览器，异步
- CMD：Sea.js
- UMD：兼容
- ES Module：标准，import/export`,
    analysis: "工程化基础。",
    difficulty: "medium",
    categoryId: 7,
    tags: ["模块化", "CommonJS", "ES Module"],
  },
  {
    title: "什么是Webpack？核心概念？",
    content: "请解释Webpack的作用和核心概念。",
    answer: `**Webpack：**
模块打包器

**核心概念：**
- Entry：入口
- Output：输出
- Loader：转换
- Plugin：插件
- Module：模块
- Chunk：代码块`,
    analysis: "构建工具基础。",
    difficulty: "medium",
    categoryId: 7,
    tags: ["Webpack", "构建工具", "打包"],
  },
  {
    title: "什么是Babel？作用是什么？",
    content: "请解释Babel的工作原理。",
    answer: `**Babel：**
JS编译器，把新语法转成旧语法

**工作流程：**
1. Parse：解析成AST
2. Transform：转换
3. Generate：生成代码`,
    analysis: "现代前端必备工具。",
    difficulty: "medium",
    categoryId: 7,
    tags: ["Babel", "编译", "转译"],
  },
  {
    title: "什么是npm和yarn？常用命令？",
    content: "请解释包管理器的使用。",
    answer: `**npm命令：**
- npm install
- npm run
- npm publish

**yarn命令：**
- yarn
- yarn add
- yarn remove`,
    analysis: "基础工具使用。",
    difficulty: "easy",
    categoryId: 7,
    tags: ["npm", "yarn", "包管理"],
  },
  {
    title: "什么是CI/CD？",
    content: "请解释持续集成持续部署的概念。",
    answer: `**CI：**
提交代码后自动构建测试

**CD：**
持续交付/持续部署

**工具：**
- GitHub Actions
- GitLab CI
- Jenkins`,
    analysis: "工程化重要环节。",
    difficulty: "medium",
    categoryId: 7,
    tags: ["CI/CD", "持续集成", "持续部署"],
  },
  // CSS补充
  {
    title: "什么是BEM命名规范？",
    content: "请解释BEM的概念。",
    answer: `**BEM：**
Block Element Modifier
- Block：块
- Element：元素
- Modifier：修饰符

\`\`\`css
.search-form {}
.search-form__button {}
.search-form__button--active {}
\`\`\``,
    analysis: "CSS命名规范。",
    difficulty: "easy",
    categoryId: 3,
    tags: ["BEM", "CSS", "命名规范"],
  },
  {
    title: "什么是CSS预处理器？",
    content: "请解释Sass/Less的作用。",
    answer: `**预处理器：**
- 变量
- 嵌套
- mixin
- 运算
- 继承

**代表：**
- Sass/SCSS
- Less
- Stylus`,
    analysis: "CSS工程化工具。",
    difficulty: "easy",
    categoryId: 3,
    tags: ["Sass", "Less", "预处理器"],
  },
  {
    title: "什么是CSS Modules？",
    content: "请解释CSS Modules的概念和优势。",
    answer: `**CSS Modules：**
作用域局部化的CSS文件

\`\`\`css
.title { color: red; }
\`\`\`
编译后：
\`\`\`css
.title_abc123 { color: red; }
\`\`\`

**优势：**
- 避免命名冲突
- 依赖清晰
- 优化`,
    analysis: "现代CSS方案。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["CSS Modules", "CSS in JS", "样式方案"],
  },
  {
    title: "什么是CSS in JS？",
    content: "请解释CSS in JS的概念。",
    answer: `**CSS in JS：**
在JS中写CSS

**方案：**
- styled-components
- Emotion
- JSS

**优势：**
- 动态样式
- 作用域
- 主题`,
    analysis: "React常用样式方案。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["CSS in JS", "styled-components", "样式方案"],
  },
  {
    title: "什么是Tailwind CSS？",
    content: "请解释Tailwind的概念和优势。",
    answer: `**Tailwind：**
原子化CSS框架

\`\`\`jsx
<div className="p-4 bg-white shadow-md"></div>
\`\`\`

**优势：**
- 不用想类名
- 减小CSS体积
- 一致的设计系统`,
    analysis: "现在很火的CSS方案。",
    difficulty: "easy",
    categoryId: 3,
    tags: ["Tailwind", "CSS", "原子化"],
  },
  // Vue补充
  {
    title: "什么是Vue的计算属性和侦听器？",
    content: "请解释computed和watch的区别。",
    answer: `**computed：**
- 有缓存
- 用于计算值
- 有返回值

**watch：**
- 无缓存
- 执行副作用
- 可异步`,
    analysis: "Vue基础API。",
    difficulty: "easy",
    categoryId: 2,
    tags: ["computed", "watch", "Vue"],
  },
  {
    title: "什么是Vue的指令？常用的有哪些？",
    content: "请解释Vue的内置指令。",
    answer: `**常用指令：**
- v-bind：绑定属性
- v-on：事件
- v-if/v-else：条件
- v-for：列表
- v-model：双向绑定
- v-show：显示隐藏
- v-text/v-html：内容`,
    analysis: "Vue模板语法基础。",
    difficulty: "easy",
    categoryId: 2,
    tags: ["指令", "v-model", "Vue"],
  },
  {
    title: "什么是Vue的生命周期？",
    content: "请解释Vue3的生命周期钩子。",
    answer: `**Vue3生命周期：**
- setup：开始
- onBeforeMount：挂载前
- onMounted：挂载后
- onBeforeUpdate：更新前
- onUpdated：更新后
- onBeforeUnmount：卸载前
- onUnmounted：卸载后`,
    analysis: "Vue核心概念。",
    difficulty: "easy",
    categoryId: 2,
    tags: ["生命周期", "Vue3", "Composition API"],
  },
  {
    title: "什么是Vue的组件通信方式？",
    content: "请列举Vue组件通信的方式。",
    answer: `**通信方式：**
1. props/emit：父子
2. provide/inject：跨级
3. vuex/pinia：全局
4. eventBus：兄弟
5. refs：直接访问
6. $parent/$children`,
    analysis: "Vue组件开发核心。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["组件通信", "Vue", "props", "emit"],
  },
  {
    title: "什么是Vue的插槽？",
    content: "请解释插槽的类型和使用。",
    answer: `**插槽类型：**
1. 默认插槽
2. 具名插槽
3. 作用域插槽

\`\`\`vue
<slot name="header" :data="data"></slot>
\`\`\``,
    analysis: "Vue组件复用的重要方式。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["插槽", "slot", "Vue"],
  },
  {
    title: "什么是Vue的keep-alive？",
    content: "请解释keep-alive的作用和使用。",
    answer: `**keep-alive：**
缓存组件实例，避免重复渲染

**Props：**
- include：包含
- exclude：排除
- max：最大数量

**生命周期：**
- activated
- deactivated`,
    analysis: "Vue性能优化组件。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["keep-alive", "缓存", "Vue"],
  },
  {
    title: "什么是Vue的v-memo？",
    content: "请解释v-memo的作用。",
    answer: `**v-memo：**
缓存子树，依赖不变就不更新

\`\`\`vue
<div v-memo="[value]">
  ...
</div>
\`\`\``,
    analysis: "Vue3性能优化指令。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["v-memo", "性能优化", "Vue3"],
  },
  // React补充
  {
    title: "什么是React的组件类型？",
    content: "请解释React的组件类型。",
    answer: `**组件类型：**
1. 函数组件
2. 类组件
3. 高阶组件HOC
4. 渲染属性
5. 函数作为子组件`,
    analysis: "React组件基础。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["组件", "函数组件", "类组件"],
  },
  {
    title: "什么是React的setState？",
    content: "请解释setState的特性。",
    answer: `**setState特性：**
- 异步更新
- 合并更新
- 回调函数

**原理：**
批量更新，减少渲染次数`,
    analysis: "React组件核心。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["setState", "异步", "React"],
  },
  {
    title: "什么是React的Keys？",
    content: "请解释key的作用和重要性。",
    answer: `**key：**
标识列表项，帮助React高效更新

**最佳实践：**
- 使用唯一ID
- 不要用index（顺序变化有问题）
- 不要用random`,
    analysis: "React列表渲染关键。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["key", "列表", "React"],
  },
  {
    title: "什么是React的Context？",
    content: "请解释Context的使用场景和API。",
    answer: `**Context：**
跨组件传递数据，不用一层层传props

\`\`\`jsx
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Child />
    </ThemeContext.Provider>
  );
}

function Child() {
  const theme = useContext(ThemeContext);
}
\`\`\``,
    analysis: "React跨级通信方案。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["Context", "useContext", "React"],
  },
  {
    title: "什么是React的ref？",
    content: "请解释ref的用途和使用。",
    answer: `**ref用途：**
- 访问DOM元素
- 访问组件实例
- 保存可变值（useRef）

\`\`\`jsx
const ref = useRef();
<input ref={ref} />
\`\`\``,
    analysis: "React常用API。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["ref", "useRef", "React"],
  },
  {
    title: "什么是React.memo？",
    content: "请解释React.memo的作用。",
    answer: `**React.memo：**
HOC，props不变就不重新渲染

\`\`\`jsx
const MemoComp = React.memo(({ data }) => {
  return <div>{data}</div>;
});
\`\`\``,
    analysis: "React性能优化。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["React.memo", "性能优化", "React"],
  },
  {
    title: "什么是useCallback和useMemo？",
    content: "请解释两个Hook的区别。",
    answer: `**useCallback：**
缓存函数

**useMemo：**
缓存值

**共同作用：**
避免子组件不必要的重新渲染`,
    analysis: "React性能优化的重要Hooks。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["useCallback", "useMemo", "性能优化"],
  },
  {
    title: "什么是React的Suspense？",
    content: "请解释Suspense的作用。",
    answer: `**Suspense：**
在组件加载过程中显示备用内容

\`\`\`jsx
<Suspense fallback={<Loading />}>
  <AsyncComponent />
</Suspense>
\`\`\``,
    analysis: "React 16.6+功能。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["Suspense", "异步组件", "React"],
  },
  // 网络补充
  {
    title: "什么是HTTP请求方法？",
    content: "请解释常见HTTP方法的含义。",
    answer: `**方法：**
- GET：获取
- POST：提交
- PUT：更新（完整）
- PATCH：更新（部分）
- DELETE：删除
- HEAD：只获取头
- OPTIONS：获取允许的方法`,
    analysis: "REST API基础。",
    difficulty: "easy",
    categoryId: 5,
    tags: ["HTTP", "方法", "REST"],
  },
  {
    title: "什么是HTTP状态码？常见的有哪些？",
    content: "请解释常见HTTP状态码的含义。",
    answer: `**状态码：**
2xx：成功
- 200 OK
- 201 Created
- 204 No Content

3xx：重定向
- 301 Moved
- 302 Found
- 304 Not Modified

4xx：客户端错误
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found

5xx：服务器错误
- 500 Internal Server Error
- 502 Bad Gateway
- 503 Service Unavailable`,
    analysis: "网络基础。",
    difficulty: "easy",
    categoryId: 5,
    tags: ["HTTP", "状态码", "网络"],
  },
  {
    title: "什么是HTTP缓存？",
    content: "请解释缓存策略。",
    answer: `**缓存：**
减少请求，提升性能

**强缓存：**
- Cache-Control
- Expires

**协商缓存：**
- ETag/If-None-Match
- Last-Modified/If-Modified-Since`,
    analysis: "性能优化的重要手段。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["缓存", "HTTP", "性能"],
  },
  {
    title: "什么是Cookie和Session？",
    content: "请解释两者的概念和区别。",
    answer: `**Cookie：**
- 存在客户端
- 4KB限制
- 自动随请求发送

**Session：**
- 存在服务器
- 通过SessionID关联
- 安全
- 存储空间大`,
    analysis: "会话管理基础。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["Cookie", "Session", "会话"],
  },
  {
    title: "什么是JWT？",
    content: "请解释JSON Web Token的概念。",
    answer: `**JWT：**
JSON Web Token，用于认证

**组成：**
- Header：头
- Payload：负载
- Signature：签名

**优势：**
- 无状态
- 跨域
- 可扩展`,
    analysis: "现代认证方案。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["JWT", "认证", "Token"],
  },
  {
    title: "什么是CORS？",
    content: "请解释跨域资源共享的概念。",
    answer: `**CORS：**
跨域资源共享

**流程：**
- 简单请求直接发
- 复杂请求先发OPTIONS预检

**响应头：**
- Access-Control-Allow-Origin
- Access-Control-Allow-Methods`,
    analysis: "跨域解决方案。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["CORS", "跨域", "HTTP"],
  },
  // TypeScript补充
  {
    title: "什么是TypeScript的类型？",
    content: "请解释TS的基本类型。",
    answer: `**基本类型：**
- string
- number
- boolean
- null/undefined
- any/unknown/never/void

**复杂类型：**
- object/array
- tuple
- enum
- function`,
    analysis: "TS基础。",
    difficulty: "easy",
    categoryId: 6,
    tags: ["类型", "TypeScript", "基础"],
  },
  {
    title: "什么是TypeScript的接口？",
    content: "请解释interface的使用。",
    answer: `**接口：**
描述对象的形状

\`\`\`typescript
interface User {
  name: string;
  age: number;
  address?: string;
  readonly id: string;
}
\`\`\``,
    analysis: "TS核心特性。",
    difficulty: "easy",
    categoryId: 6,
    tags: ["interface", "类型", "TypeScript"],
  },
  {
    title: "什么是TypeScript的泛型？",
    content: "请解释泛型的概念和用途。",
    answer: `**泛型：**
类型参数，让类型更灵活

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\``,
    analysis: "TS高级特性。",
    difficulty: "medium",
    categoryId: 6,
    tags: ["泛型", "TypeScript", "Generics"],
  },
  {
    title: "什么是TypeScript的类型守卫？",
    content: "请解释类型守卫的概念。",
    answer: `**类型守卫：**
运行时检查类型，缩小范围

\`\`\`typescript
function isString(x: any): x is string {
  return typeof x === 'string';
}
\`\`\``,
    analysis: "TS类型系统的重要特性。",
    difficulty: "medium",
    categoryId: 6,
    tags: ["类型守卫", "TypeScript", "类型缩小"],
  },
  {
    title: "什么是TypeScript的工具类型？",
    content: "请列举常用的工具类型。",
    answer: `**常用工具类型：**
- Partial：可选
- Required：必选
- Pick：选取
- Omit：排除
- Readonly：只读
- Record：对象
- Extract/Exclude`,
    analysis: "TS常用工具。",
    difficulty: "medium",
    categoryId: 6,
    tags: ["工具类型", "TypeScript", "Utility Types"],
  },
];

async function batchImport() {
  try {
    const created = await Question.bulkCreate(massiveQuestions);
    console.log(`成功导入 ${created.length} 道大量面试题`);
    process.exit(0);
  } catch (error) {
    console.error("导入失败:", error);
    process.exit(1);
  }
}

batchImport();
