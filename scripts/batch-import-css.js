const sequelize = require("../config/database");
const Question = require("../models/question");

const cssQuestions = [
  // ==================== CSS基础 ====================
  {
    title: "请解释CSS的盒模型？",
    content: "请解释CSS盒模型的概念和两种盒模型的区别。",
    answer: `**CSS盒模型：**
所有HTML元素都被表示为一个矩形盒子，包含内容区域、内边距、边框和外边距。

**盒模型组成：**
1. **内容区域（Content）** - 实际内容（文字、图片等）
2. **内边距（Padding）** - 内容和边框之间的空间
3. **边框（Border）** - 围绕内边距和内容的边框
4. **外边距（Margin）** - 边框外的空间

**标准盒模型（W3C）：**
\`\`\`css
box-sizing: content-box;
\`\`\`
- width/height只计算内容区域
- 总宽度 = content + padding + border

**怪异盒模型（IE）：**
\`\`\`css
box-sizing: border-box;
\`\`\`
- width/height包含内容、内边距和边框
- 总宽度 = width（已包含padding和border）

**示例：**
\`\`\`css
/* 标准盒模型 */
.box1 {
  box-sizing: content-box;
  width: 100px;
  padding: 10px;
  border: 5px solid #000;
  /* 实际宽度 = 100 + 10*2 + 5*2 = 130px */
}

/* 怪异盒模型 */
.box2 {
  box-sizing: border-box;
  width: 100px;
  padding: 10px;
  border: 5px solid #000;
  /* 实际宽度 = 100px（已包含padding和border） */
}
\`\`\`

**最佳实践：**
\`\`\`css
/* 全局设置为border-box */
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\``,
    analysis: "CSS盒模型是理解布局的基础，两种盒模型的区别很重要。",
    difficulty: "easy",
    categoryId: 3,
    tags: ["盒模型", "CSS基础", "box-sizing"],
  },
  {
    title: "CSS选择器有哪些类型？",
    content: "请列举并解释CSS中常见的选择器类型。",
    answer: `**基本选择器：**
\`\`\`css
/* 1. 元素选择器 */
div { color: red; }

/* 2. 类选择器 */
.box { color: blue; }

/* 3. ID选择器 */
#container { color: green; }

/* 4. 属性选择器 */
[type="text"] { color: orange; }
[class^="btn-"] { color: pink; }
\`\`\`

**组合选择器：**
\`\`\`css
/* 1. 后代选择器（空格） */
.container div { color: red; }

/* 2. 子选择器（>） */
.container > div { color: blue; }

/* 3. 相邻兄弟选择器（+） */
.item + .item { margin-top: 10px; }

/* 4. 通用兄弟选择器（~） */
.item ~ .item { color: gray; }

/* 5. 分组选择器（,） */
h1, h2, h3 { color: blue; }
\`\`\`

**伪类选择器：**
\`\`\`css
/* 状态伪类 */
a:hover { color: red; }
a:active { color: blue; }
input:focus { outline: none; }

/* 结构伪类 */
li:first-child { color: red; }
li:last-child { color: blue; }
li:nth-child(odd) { color: green; }
li:nth-child(2n) { color: orange; }
li:only-child { color: pink; }

/* 表单伪类 */
input:checked { background: blue; }
input:disabled { opacity: 0.5; }
input:required { border: 1px solid red; }
\`\`\`

**伪元素选择器：**
\`\`\`css
/* 伪元素 */
p::before { content: 'Before '; }
p::after { content: ' After'; }
p::first-letter { font-size: 2em; }
p::first-line { font-weight: bold; }
::selection { background: yellow; }
\`\`\`

**选择器优先级：**
\`\`\`css
/* !important > 内联样式 > ID > 类/属性/伪类 > 元素/伪元素 */
#id { }       /* 100 */
.class { }    /* 10 */
element { }   /* 1 */
\`\`\``,
    analysis: "CSS选择器是样式应用的基础，掌握选择器优先级很重要。",
    difficulty: "easy",
    categoryId: 3,
    tags: ["选择器", "CSS基础", "优先级"],
  },
  {
    title: "CSS的优先级是怎么计算的？",
    content: "请解释CSS选择器的优先级计算规则。",
    answer: `**优先级计算：**
1. **!important** - 最高优先级（尽量避免使用）
2. **内联样式** - style属性（1000）
3. **ID选择器** - #id（100）
4. **类选择器/属性选择器/伪类** - .class、[attr]、:hover（10）
5. **元素选择器/伪元素** - div、::before（1）
6. **通配符选择器** - *（0）

**示例：**
\`\`\`css
/* 优先级计算：0,1,0,0 → 100 */
#container { color: red; }

/* 0,0,2,0 → 20 */
.list .item { color: blue; }

/* 0,0,1,1 → 11 */
li.item { color: green; }

/* 0,0,0,1 → 1 */
div { color: orange; }

/* 最高优先级 */
.important { color: pink !important; }
\`\`\`

**相同优先级的处理：**
\`\`\`css
/* 后面的覆盖前面的 */
div { color: red; }
div { color: blue; } /* 蓝色生效 */
\`\`\`

**避免使用!important：**
\`\`\`css
/* ❌ 不推荐 */
.text { color: red !important; }

/* ✅ 推荐：提高选择器权重 */
.container .text { color: red; }
\`\`\`

**总结：**
优先级：!important > 内联 > ID > 类 > 元素 > 通配符`,
    analysis: "CSS优先级是理解样式冲突的关键，掌握计算规则很重要。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["优先级", "CSS基础", "选择器"],
  },
  {
    title: "如何实现垂直居中？",
    content: "请列举多种CSS垂直居中的实现方法。",
    answer: `**方法1：Flex布局（推荐）：**
\`\`\`css
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
\`\`\`

**方法2：Grid布局：**
\`\`\`css
.container {
  display: grid;
  place-items: center;
}
\`\`\`

**方法3：绝对定位 + transform：**
\`\`\`css
.container {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
\`\`\`

**方法4：绝对定位 + margin auto：**
\`\`\`css
.container {
  position: relative;
}
.child {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100px;
  height: 100px;
}
\`\`\`

**方法5：table-cell：**
\`\`\`css
.container {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
\`\`\`

**方法6：line-height（单行文字）：**
\`\`\`css
.text {
  height: 100px;
  line-height: 100px;
  text-align: center;
}
\`\`\`

**方法7：padding（已知高度）：**
\`\`\`css
.container {
  padding: 50px 0;
}
\`\`\``,
    analysis: "垂直居中是CSS布局的经典问题，Flex/Grid是现代方案。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["垂直居中", "布局", "Flex", "Grid"],
  },
  {
    title: "Flex布局有哪些属性？",
    content: "请解释Flex布局的常用属性和值。",
    answer: `**Flex容器属性：**
\`\`\`css
.container {
  display: flex; /* 或 inline-flex */
  
  /* 主轴方向 */
  flex-direction: row | row-reverse | column | column-reverse;
  
  /* 换行 */
  flex-wrap: nowrap | wrap | wrap-reverse;
  
  /* 主轴对齐 */
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
  
  /* 交叉轴对齐 */
  align-items: flex-start | flex-end | center | stretch | baseline;
  
  /* 多根轴线对齐 */
  align-content: flex-start | flex-end | center | stretch | space-between | space-around;
}
\`\`\`

**Flex项目属性：**
\`\`\`css
.item {
  /* 顺序 */
  order: 1; /* 数值越小越靠前 */
  
  /* 放大比例 */
  flex-grow: 0; /* 0不放大，正数按比例分配 */
  
  /* 缩小比例 */
  flex-shrink: 1; /* 0不缩小，正数按比例缩小 */
  
  /* 基准大小 */
  flex-basis: auto; /* 项目初始大小 */
  
  /* 简写 */
  flex: flex-grow flex-shrink flex-basis;
  flex: 1; /* 1 1 0% */
  flex: auto; /* 1 1 auto */
  flex: none; /* 0 0 auto */
  
  /* 单个项目的对齐 */
  align-self: auto | flex-start | flex-end | center | stretch | baseline;
}
\`\`\`

**常见布局：**
\`\`\`css
/* 水平居中 */
.container {
  display: flex;
  justify-content: center;
}

/* 两端对齐 */
.container {
  display: flex;
  justify-content: space-between;
}

/* 等分布局 */
.item {
  flex: 1;
}

/* 固定侧边栏 */
.sidebar { width: 200px; }
.main { flex: 1; }
\`\`\``,
    analysis: "Flex布局是现代CSS布局的主要方式，需要掌握核心属性。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["Flex", "布局", "CSS3"],
  },
  {
    title: "Grid布局有哪些属性？",
    content: "请解释Grid布局的常用属性和使用场景。",
    answer: `**Grid容器属性：**
\`\`\`css
.container {
  display: grid; /* 或 inline-grid */
  
  /* 列定义 */
  grid-template-columns: 100px 1fr 2fr;
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fill, 100px);
  
  /* 行定义 */
  grid-template-rows: auto 1fr auto;
  
  /* 间距 */
  gap: 10px;
  row-gap: 10px;
  column-gap: 10px;
  
  /* 区域命名 */
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  
  /* 内容对齐 */
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
  place-items: center center; /* 简写 */
  
  /* 轨道对齐 */
  justify-content: start | end | center | space-between | space-around | space-evenly;
  align-content: start | end | center | space-between | space-around | space-evenly;
}
\`\`\`

**Grid项目属性：**
\`\`\`css
.item {
  /* 位置（从第几到第几） */
  grid-column-start: 1;
  grid-column-end: 3;
  grid-column: 1 / 3; /* 简写 */
  grid-column: 1 / span 2; /* 简写 */
  
  grid-row-start: 1;
  grid-row-end: 3;
  grid-row: 1 / 3; /* 简写 */
  
  /* 区域 */
  grid-area: header;
  
  /* 对齐 */
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
  place-self: center;
}
\`\`\`

**常见布局：**
\`\`\`css
/* 圣杯布局 */
.grid {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
}
.header { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* 九宫格 */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
\`\`\``,
    analysis: "Grid是CSS最强大的二维布局方案，适合复杂布局。",
    difficulty: "hard",
    categoryId: 3,
    tags: ["Grid", "布局", "CSS3"],
  },
  {
    title: "BFC是什么？有什么作用？",
    content: "请解释块级格式化上下文（BFC）的概念和应用。",
    answer: `**BFC是什么：**
Block Formatting Context（块级格式化上下文），是一个独立的渲染区域。

**BFC触发条件：**
1. 根元素html
2. float属性不为none
3. position为absolute或fixed
4. overflow不为visible
5. display为inline-block、table-cell、table-caption
6. display为flow-root
7. contain为layout、content或paint

**BFC特性：**
1. 内部盒子垂直排列
2. 垂直方向的margin会重叠
3. BFC的区域不会与float重叠
4. 计算BFC高度时，浮动元素也参与计算
5. BFC是独立容器，内部元素不会影响外部

**应用场景1：清除浮动：**
\`\`\`css
.container {
  overflow: hidden; /* 触发BFC */
}

/* 或 */
.container {
  display: flow-root; /* 专门用于创建BFC */
}
\`\`\`

**应用场景2：防止margin重叠：**
\`\`\`css
.box {
  margin: 10px 0;
}

/* 创建BFC阻止margin重叠 */
.wrapper {
  overflow: hidden;
}
\`\`\`

**应用场景3：两栏布局：**
\`\`\`css
.sidebar {
  float: left;
  width: 200px;
}
.main {
  overflow: hidden; /* 触发BFC，不与float重叠 */
}
\`\`\``,
    analysis: "BFC是CSS布局的重要概念，解决浮动和margin重叠问题。",
    difficulty: "hard",
    categoryId: 3,
    tags: ["BFC", "布局", "CSS"],
  },
  {
    title: "CSS变量是什么？如何使用？",
    content: "请解释CSS自定义属性（变量）的概念和用法。",
    answer: `**CSS变量定义：**
\`\`\`css
/* 全局变量 */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --font-size-base: 16px;
}

/* 局部变量 */
.box {
  --box-padding: 10px;
  padding: var(--box-padding);
}
\`\`\`

**使用变量：**
\`\`\`css
/* 使用var()函数 */
button {
  background-color: var(--primary-color);
  font-size: var(--font-size-base);
}

/* 带默认值 */
button {
  background-color: var(--primary-color, #007bff);
}
\`\`\`

**JavaScript操作：**
\`\`\`javascript
// 设置变量
document.documentElement.style.setProperty('--primary-color', 'blue');

// 获取变量
const color = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary-color');

// 删除变量
document.documentElement.style.removeProperty('--primary-color');
\`\`\`

**实际应用：**
\`\`\`css
/* 主题切换 */
:root {
  --bg-color: white;
  --text-color: black;
}
[data-theme="dark"] {
  --bg-color: black;
  --text-color: white;
}
body {
  background-color: var(--bg-color);
  color: var(--text-color);
}
\`\`\``,
    analysis: "CSS变量是现代CSS的重要特性，使CSS更加灵活。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["CSS变量", "自定义属性", "CSS3"],
  },
  {
    title: "CSS动画有哪些实现方式？",
    content: "请介绍CSS实现动画的几种方式。",
    answer: `**1. transition（过渡）：**
\`\`\`css
.box {
  width: 100px;
  transition: width 0.3s ease;
}
.box:hover {
  width: 200px;
}

/* 多个属性 */
.box {
  transition: 
    width 0.3s ease,
    height 0.5s ease-in-out 0.1s;
}
\`\`\`

**2. animation（关键帧动画）：**
\`\`\`css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.element {
  animation: slideIn 0.5s ease forwards;
  animation: pulse 1s ease-in-out infinite;
}
\`\`\`

**3. transform（变换）：**
\`\`\`css
.box {
  /* 平移 */
  transform: translate(100px, 50px);
  /* 缩放 */
  transform: scale(1.5);
  /* 旋转 */
  transform: rotate(45deg);
  /* 倾斜 */
  transform: skew(10deg, 5deg);
  /* 组合 */
  transform: translate(100px) rotate(45deg) scale(1.5);
}
\`\`\`

**性能优化：**
\`\`\`css
/* 使用transform和opacity避免重排 */
.element {
  transform: translateZ(0); /* 开启硬件加速 */
  will-change: transform; /* 提示浏览器优化 */
}
\`\`\``,
    analysis: "CSS动画是现代前端必备技能，注意性能优化。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["动画", "transition", "animation", "transform"],
  },
  {
    title: "HTML5有哪些新特性？",
    content: "请列举HTML5的主要新特性。",
    answer: `**语义化标签：**
\`\`\`html
<header>头部</header>
<nav>导航</nav>
<main>主要内容</main>
<article>文章</article>
<section>区域</section>
<aside>侧边栏</aside>
<footer>页脚</footer>
<figure>
  <img src="image.jpg" alt="">
  <figcaption>图片描述</figcaption>
</figure>
\`\`\`

**增强型表单：**
\`\`\`html
<input type="email">
<input type="tel">
<input type="url">
<input type="number">
<input type="range">
<input type="date">
<input type="time">
<input type="color">
<input type="search" placeholder="搜索...">
<input list="datalist">
<datalist id="datalist">
  <option value="选项1">
  <option value="选项2">
</datalist>
\`\`\`

**多媒体：**
\`\`\`html
<video src="video.mp4" controls></video>
<audio src="audio.mp3" controls></audio>
\`\`\`

**Canvas和SVG：**
\`\`\`html
<canvas id="canvas" width="200" height="200"></canvas>
<svg width="200" height="200">
  <circle cx="100" cy="100" r="50" fill="red"/>
</svg>
\`\`\`

**新API：**
- localStorage/sessionStorage
- WebSocket
- Web Worker
- Service Worker
- History API
- Drag and Drop
- Geolocation

**其他：**
- 自定义数据属性 data-*
- 内容可编辑 contenteditable
- 隐藏属性 hidden`,
    analysis: "HTML5引入了许多重要特性，语义化标签是重点。",
    difficulty: "easy",
    categoryId: 3,
    tags: ["HTML5", "新特性", "语义化"],
  },
  {
    title: "什么是语义化HTML？有什么好处？",
    content: "请解释语义化HTML的概念和优势。",
    answer: `**语义化HTML是什么：**
使用合适的HTML标签来表达内容的含义，而不仅仅是样式。

**语义化标签示例：**
\`\`\`html
<!-- ❌ 不语义化 -->
<div class="header"></div>
<div class="nav"></div>
<div class="content"></div>
<div class="footer"></div>

<!-- ✅ 语义化 -->
<header></header>
<nav></nav>
<main>
  <article>
    <h1>标题</h1>
    <p>段落</p>
  </article>
</main>
<footer></footer>
\`\`\`

**语义化的好处：**
1. **可访问性** - 屏幕阅读器能更好地理解页面
2. **SEO** - 搜索引擎更容易理解页面结构
3. **代码可读性** - 代码更清晰易懂
4. **样式分离** - 便于更换样式而不改变结构
5. **默认样式** - 浏览器提供有用的默认行为

**语义化最佳实践：**
\`\`\`html
<!-- 正确使用标题 -->
<h1>页面标题</h1>
<section>
  <h2>章节标题</h2>
  <h3>小节标题</h3>
</section>

<!-- 正确使用列表 -->
<ul>
  <li>无序列表项</li>
</ul>
<ol>
  <li>有序列表项</li>
</ol>

<!-- 正确使用强调 -->
<em>强调（语义）</em>
<strong>重要（语义）</strong>

<!-- 正确使用引用 -->
<blockquote>
  <p>引用内容</p>
  <cite>引用来源</cite>
</blockquote>
\`\`\``,
    analysis: "语义化HTML是现代前端开发的基础，提升可访问性和SEO。",
    difficulty: "easy",
    categoryId: 3,
    tags: ["语义化", "HTML", "SEO", "可访问性"],
  },
  {
    title: "CSS中的定位有哪些类型？",
    content: "请解释CSS position属性的各个值和区别。",
    answer: `**position属性：**

\`\`\`css
/* 1. static（默认） */
.box { position: static; }
/* 正常文档流，top/left/right/bottom无效 */

/* 2. relative */
.box { position: relative; }
/* 相对自身原来的位置偏移，不脱离文档流 */
.box {
  position: relative;
  top: 10px;
  left: 10px;
}

/* 3. absolute */
.box { position: absolute; }
/* 相对于最近的非static定位的祖先元素，脱离文档流 */
.container { position: relative; }
.box {
  position: absolute;
  top: 0;
  right: 0;
}

/* 4. fixed */
.box { position: fixed; }
/* 相对于视口定位，脱离文档流，滚动时不动 */
.box {
  position: fixed;
  bottom: 0;
  right: 0;
}

/* 5. sticky */
.box { position: sticky; }
/* 相对定位+固定定位结合，滚动到指定位置固定 */
.box {
  position: sticky;
  top: 0;
}
\`\`\`

**定位层级：**
\`\`\`css
/* z-index控制堆叠顺序，数值越大越靠上 */
.box1 { z-index: 1; }
.box2 { z-index: 2; } /* box2在box1上面 */
\`\`\``,
    analysis: "定位是CSS布局的重要部分，理解每种定位类型的区别。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["position", "定位", "布局"],
  },
  {
    title: "如何实现响应式布局？",
    content: "请介绍CSS响应式布局的实现方式。",
    answer: `**媒体查询：**
\`\`\`css
/* 移动优先 */
.container {
  width: 100%;
}

@media (min-width: 768px) {
  .container { width: 750px; }
}

@media (min-width: 992px) {
  .container { width: 970px; }
}

@media (min-width: 1200px) {
  .container { width: 1170px; }
}
\`\`\`

**Viewport设置：**
\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`

**Flex响应式：**
\`\`\`css
.container {
  display: flex;
  flex-direction: column; /* 移动端垂直排列 */
}

@media (min-width: 768px) {
  .container {
    flex-direction: row; /* 平板以上水平排列 */
  }
}
\`\`\`

**Grid响应式：**
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: 1fr; /* 单列 */
  gap: 10px;
}

@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); } /* 两列 */
}

@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(4, 1fr); } /* 四列 */
}
\`\`\`

**相对单位：**
\`\`\`css
/* 使用rem、em、%、vw、vh等 */
.text {
  font-size: 16px;
}

@media (min-width: 768px) {
  .text {
    font-size: 18px;
  }
}
\`\`\``,
    analysis: "响应式布局是现代前端的基本要求，媒体查询是核心。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["响应式", "媒体查询", "响应式布局"],
  },
];

async function batchImport() {
  try {
    const created = await Question.bulkCreate(cssQuestions);
    console.log(`成功导入 ${created.length} 道CSS/HTML面试题`);
    process.exit(0);
  } catch (error) {
    console.error("导入失败:", error);
    process.exit(1);
  }
}

batchImport();
