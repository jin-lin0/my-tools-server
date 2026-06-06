const sequelize = require("../config/database");
const Category = require("../models/category");
const Question = require("../models/question");

const categories = [
  {
    name: "JavaScript基础",
    description: "JavaScript语言核心概念、ES6+特性、异步编程等",
  },
  {
    name: "Vue.js",
    description: "Vue框架核心概念、响应式原理、Composition API等",
  },
  { name: "CSS/HTML", description: "CSS布局、选择器、盒模型、HTML语义化等" },
  { name: "React", description: "React核心概念、Hooks、状态管理、性能优化等" },
  {
    name: "网络与性能优化",
    description: "HTTP协议、浏览器原理、前端性能优化等",
  },
  { name: "TypeScript", description: "TypeScript类型系统、泛型、工具类型等" },
  { name: "工程化与工具", description: "Webpack、Vite、Git、CI/CD等" },
  { name: "算法与数据结构", description: "常见算法、数据结构、手写实现等" },
];

const questions = [
  // JavaScript基础
  {
    title: "JavaScript有哪些基本数据类型？",
    content: "请详细说明JavaScript的基本数据类型和引用数据类型。",
    answer: `JavaScript有7种基本数据类型（Primitive Types）：
1. Number - 数字类型，包括整数和浮点数
2. String - 字符串类型
3. Boolean - 布尔类型（true/false）
4. Undefined - 未定义，变量声明但未赋值
5. Null - 空值
6. Symbol - ES6引入的唯一标识符类型
7. BigInt - ES2020引入的大整数类型

引用数据类型（Reference Types）：
1. Object - 对象
2. Array - 数组
3. Function - 函数
4. Date - 日期
5. RegExp - 正则表达式
6. Map、Set - ES6新增的数据结构

基本数据类型存储在栈中，引用数据类型存储在堆中，变量存储的是指向堆的引用地址。`,
    analysis:
      "这道题考察对JavaScript数据类型的基本理解，需要区分基本类型和引用类型，以及它们的存储方式。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["数据类型", "基础"],
  },
  {
    title: "什么是闭包（Closure）？请举例说明应用场景。",
    content: "请解释JavaScript中闭包的概念、原理以及常见的应用场景。",
    answer: `闭包是指一个函数能够记住并访问其词法作用域，即使函数在其词法作用域之外执行。

**原理：**
当一个函数被创建时，它会保存对其词法环境的引用。即使外层函数执行完毕，内层函数仍然可以通过这个引用访问外层函数的变量。

**示例：**
\`\`\`javascript
function makeCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\`

**应用场景：**
1. **数据封装和私有变量** - 模拟私有属性
2. **函数柯里化** - 部分应用函数
3. **防抖和节流** - 保存定时器状态
4. **模块模式** - 创建独立的模块作用域
5. **回调函数** - 保持对外部变量的访问

**注意事项：**
闭包会导致变量不会被垃圾回收，使用不当可能造成内存泄漏。`,
    analysis:
      "闭包是JavaScript最重要的概念之一，理解闭包对于理解作用域链、内存管理非常重要。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["闭包", "作用域", "高频"],
  },
  {
    title: "var、let、const有什么区别？",
    content: "请详细说明var、let、const三种变量声明方式的区别。",
    answer: `**1. 作用域不同：**
- var：函数作用域
- let：块级作用域
- const：块级作用域

**2. 变量提升：**
- var：会提升，初始化为undefined
- let/const：会提升但不初始化，存在暂时性死区（TDZ）

**3. 重复声明：**
- var：允许重复声明
- let/const：不允许重复声明

**4. 全局对象：**
- var声明的全局变量会挂载到window上
- let/const不会

**5. 修改：**
- var/let：可以修改
- const：声明时必须初始化，且不能重新赋值（但对象/数组的属性可以修改）

**使用建议：**
- 优先使用const
- 需要重新赋值时使用let
- 避免使用var

\`\`\`javascript
// 暂时性死区示例
console.log(a); // undefined（var提升）
var a = 1;

console.log(b); // ReferenceError（暂时性死区）
let b = 2;
\`\`\``,
    analysis:
      "这是ES6的基础面试题，考察对变量声明方式的理解，特别是暂时性死区和块级作用域。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["ES6", "变量声明", "基础"],
  },
  {
    title: "什么是原型链？请解释JavaScript的继承机制。",
    content: "请详细解释JavaScript中原型链的概念以及如何实现继承。",
    answer: `**原型链（Prototype Chain）：**
每个JavaScript对象都有一个内部属性[[Prototype]]（可通过__proto__访问），指向它的原型对象。原型对象也是一个对象，也有自己的原型，层层向上直到null，这就是原型链。

**继承查找规则：**
当访问对象的属性时，先在对象自身查找，找不到则沿着原型链向上查找，直到找到或到达null。

**构造函数、原型、实例的关系：**
\`\`\`javascript
function Person(name) {
  this.name = name;
}
Person.prototype.sayHello = function() {
  console.log('Hello, ' + this.name);
};

const p = new Person('Tom');
// p.__proto__ === Person.prototype
// Person.prototype.constructor === Person
\`\`\`

**实现继承的方式：**
1. **原型链继承** - 子类原型指向父类实例
2. **构造函数继承** - 在子类构造函数中调用父类构造函数
3. **组合继承** - 结合以上两种方式
4. **寄生组合继承** - 最推荐的方式
5. **ES6 class继承** - 使用extends关键字

\`\`\`javascript
// ES6 class继承
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + ' makes a sound');
  }
}

class Dog extends Animal {
  speak() {
    console.log(this.name + ' barks');
  }
}
\`\`\``,
    analysis:
      "原型链是JavaScript面向对象编程的核心，理解原型链对于理解继承机制非常重要。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["原型链", "继承", "面向对象"],
  },
  {
    title: "Promise是什么？请解释其基本用法和原理。",
    content: "请详细解释Promise的概念、三种状态、基本用法以及手写实现。",
    answer: `**Promise是什么：**
Promise是ES6引入的异步编程解决方案，表示一个异步操作的最终完成或失败。

**三种状态：**
1. pending（等待中）- 初始状态
2. fulfilled（已成功）- 操作成功完成
3. rejected（已失败）- 操作失败

状态只能从pending变为fulfilled或rejected，且不可逆。

**基本用法：**
\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  // 异步操作
  if (success) {
    resolve(value);  // 成功
  } else {
    reject(error);   // 失败
  }
});

promise
  .then(value => { /* 成功处理 */ })
  .catch(error => { /* 失败处理 */ })
  .finally(() => { /* 总会执行 */ });
\`\`\`

**常用方法：**
- Promise.all() - 所有成功才成功，一个失败则失败
- Promise.race() - 第一个完成的结果
- Promise.allSettled() - 等所有完成，无论成功失败
- Promise.any() - 第一个成功的结果

**手写简化版Promise：**
\`\`\`javascript
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.callbacks = [];
    
    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.callbacks.forEach(cb => cb.onFulfilled(value));
      }
    };
    
    executor(resolve, this.reject.bind(this));
  }
  
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      // 处理回调...
    });
  }
}
\`\`\``,
    analysis:
      "Promise是现代JavaScript异步编程的基础，理解Promise对于掌握async/await非常重要。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["Promise", "异步", "ES6"],
  },
  {
    title: "async/await是什么？与Promise有什么关系？",
    content: "请解释async/await的语法、原理以及与Promise的关系。",
    answer: `**async/await是什么：**
async/await是ES2017引入的异步编程语法糖，让异步代码看起来像同步代码，更易于理解和维护。

**基本语法：**
\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
\`\`\`

**与Promise的关系：**
1. async函数总是返回一个Promise
2. await后面可以跟任何Promise
3. await会暂停async函数的执行，等待Promise完成
4. 如果await后面的Promise rejected，会抛出异常

**注意事项：**
1. await只能在async函数内部使用（顶层await除外）
2. 多个await如果无依赖关系，应该用Promise.all并行执行
3. 错误处理使用try/catch

\`\`\`javascript
// 并行执行优化
async function getUserData() {
  // 不推荐：串行执行
  const user = await getUser();
  const posts = await getPosts();
  
  // 推荐：并行执行
  const [user, posts] = await Promise.all([
    getUser(),
    getPosts()
  ]);
}
\`\`\`

**实现原理：**
async/await本质上是Generator函数和自动执行器的语法糖。`,
    analysis:
      "async/await是目前最常用的异步编程方式，需要理解其与Promise的关系和最佳实践。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["async/await", "异步", "ES2017"],
  },
  {
    title: "什么是事件循环（Event Loop）？",
    content: "请解释JavaScript的事件循环机制，包括宏任务和微任务。",
    answer: `**事件循环是什么：**
JavaScript是单线程语言，事件循环是JavaScript处理异步操作的机制，负责执行代码、处理事件和执行异步任务。

**执行栈（Call Stack）：**
同步代码在执行栈中执行，遵循后进先出（LIFO）原则。

**任务队列：**
1. **宏任务（Macro Task）**：
   - setTimeout、setInterval
   - I/O操作
   - UI渲染
   - requestAnimationFrame

2. **微任务（Micro Task）**：
   - Promise.then/catch/finally
   - MutationObserver
   - queueMicrotask
   - process.nextTick（Node.js）

**执行顺序：**
1. 执行同步代码（主线程）
2. 执行所有微任务
3. 执行一个宏任务
4. 再次执行所有微任务
5. 重复步骤3-4

\`\`\`javascript
console.log('1'); // 同步

setTimeout(() => {
  console.log('2'); // 宏任务
}, 0);

Promise.resolve().then(() => {
  console.log('3'); // 微任务
});

console.log('4'); // 同步

// 输出顺序：1, 4, 3, 2
\`\`\`

**node.js中的事件循环：**
node.js有6个阶段，每个阶段都有一个FIFO队列：
timers → poll → check → close callbacks等`,
    analysis:
      "事件循环是理解JavaScript异步执行顺序的关键，面试中经常出现输出顺序题。",
    difficulty: "hard",
    categoryId: 1,
    tags: ["事件循环", "异步", "宏任务", "微任务"],
  },
  {
    title: "深拷贝和浅拷贝的区别？如何实现深拷贝？",
    content: "请解释深拷贝和浅拷贝的区别，并手写实现深拷贝函数。",
    answer: `**浅拷贝：**
只复制对象的第一层属性，如果属性是引用类型，复制的是引用地址，修改会影响原对象。

**深拷贝：**
递归复制对象的所有层级，完全独立的副本，修改不会影响原对象。

**浅拷贝方法：**
- Object.assign()
- 展开运算符（...）
- Array.prototype.slice()
- Array.from()

**深拷贝方法：**
- JSON.parse(JSON.stringify()) - 有限制
- structuredClone() - 新API
- lodash.cloneDeep()
- 手写递归实现

**手写深拷贝：**
\`\`\`javascript
function deepClone(obj, map = new WeakMap()) {
  // 处理基本类型和null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // 处理循环引用
  if (map.has(obj)) {
    return map.get(obj);
  }
  
  // 处理Date和RegExp
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  
  // 创建新的对象或数组
  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);
  
  // 递归复制
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], map);
    }
  }
  
  return clone;
}
\`\`\`

**JSON方法的限制：**
- 不能处理undefined、函数、Symbol
- 不能处理循环引用
- 不能处理Date、RegExp等特殊对象`,
    analysis: "深拷贝是手写题中常见的题目，需要处理循环引用和特殊对象类型。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["深拷贝", "浅拷贝", "手写"],
  },
  {
    title: "什么是防抖和节流？请手写实现。",
    content:
      "请解释防抖（Debounce）和节流（Throttle）的概念、区别和应用场景，并手写实现。",
    answer: `**防抖（Debounce）：**
在事件触发n秒后才执行回调，如果在n秒内再次触发，则重新计时。

**应用场景：**
- 搜索框输入
- 窗口resize
- 按钮提交

**节流（Throttle）：
在n秒内只执行一次回调，稀释执行频率。

**应用场景：**
- 滚动事件
- 鼠标移动
- 搜索联想

**防抖实现：**
\`\`\`javascript
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
\`\`\`

**节流实现：**
\`\`\`javascript
// 时间戳实现（第一次立即执行）
function throttle(fn, delay) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= delay) {
      fn.apply(this, args);
      last = now;
    }
  };
}

// 定时器实现（最后一次也会执行）
function throttle(fn, delay) {
  let timer = null;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}
\`\`\`

**区别：**
- 防抖：适合关注结果（输入完成后再搜索）
- 节流：适合关注过程（持续触发时按频率执行）`,
    analysis: "防抖和节流是性能优化的重要手段，也是手写题的高频考点。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["防抖", "节流", "性能优化", "手写"],
  },
  {
    title: "this指向问题，请解释四种绑定规则。",
    content: "请详细解释JavaScript中this的指向规则和绑定优先级。",
    answer: `**this的四种绑定规则：**

**1. 默认绑定：**
独立函数调用时，this指向window（严格模式下为undefined）
\`\`\`javascript
function foo() {
  console.log(this); // window
}
foo();
\`\`\`

**2. 隐式绑定：**
作为对象方法调用时，this指向调用的对象
\`\`\`javascript
const obj = {
  name: 'Tom',
  sayHi() {
    console.log(this.name); // 'Tom'
  }
};
obj.sayHi();
\`\`\`

**3. 显式绑定：**
使用call、apply、bind指定this
\`\`\`javascript
function greet() {
  console.log(this.name);
}
const obj = { name: 'Tom' };
greet.call(obj);    // 'Tom'
greet.apply(obj);   // 'Tom'
const bound = greet.bind(obj);
bound();            // 'Tom'
\`\`\`

**4. new绑定：**
构造函数调用时，this指向新创建的对象
\`\`\`javascript
function Person(name) {
  this.name = name;
}
const p = new Person('Tom');
console.log(p.name); // 'Tom'
\`\`\`

**绑定优先级（从高到低）：**
new绑定 > 显式绑定 > 隐式绑定 > 默认绑定

**特殊情况：**
- 箭头函数没有自己的this，继承外层作用域的this
- 回调函数中的this需要特别注意

\`\`\`javascript
const obj = {
  name: 'Tom',
  delaySay() {
    setTimeout(() => {
      console.log(this.name); // 'Tom'，箭头函数继承外层this
    }, 100);
  }
};
\`\`\``,
    analysis: "this指向是JavaScript的经典难题，需要理解四种绑定规则和优先级。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["this", "作用域", "高频"],
  },

  // Vue.js
  {
    title: "Vue2和Vue3的响应式原理有什么区别？",
    content: "请详细解释Vue2和Vue3响应式系统的实现原理和区别。",
    answer: `**Vue2响应式原理：**
基于Object.defineProperty()实现，对数据对象的每个属性进行getter/setter拦截。

\`\`\`javascript
// 简化实现
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      // 依赖收集
      track(target, key);
      return val;
    },
    set(newVal) {
      val = newVal;
      // 触发更新
      trigger(target, key);
    }
  });
}
\`\`\`

**Vue2的局限：**
1. 无法检测对象属性的添加和删除
2. 无法检测数组索引和长度的变化
3. 需要使用Vue.set()或this.$set()

**Vue3响应式原理：**
基于ES6的Proxy实现，可以拦截对象的所有操作。

\`\`\`javascript
const handler = {
  get(target, key) {
    track(target, key);
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    const result = Reflect.set(target, key, value);
    trigger(target, key);
    return result;
  },
  deleteProperty(target, key) {
    const result = Reflect.deleteProperty(target, key);
    trigger(target, key);
    return result;
  }
};

function reactive(obj) {
  return new Proxy(obj, handler);
}
\`\`\`

**Vue3的优势：**
1. 支持动态属性添加/删除
2. 支持数组索引和长度变化
3. 性能更好（惰性监听）
4. 更好的TypeScript支持

**相关API：**
- ref() - 包装基本类型
- reactive() - 包装对象类型
- computed() - 计算属性
- watch()/watchEffect() - 侦听器`,
    analysis:
      "响应式原理是Vue的核心，理解Proxy和defineProperty的区别对于深入Vue非常重要。",
    difficulty: "hard",
    categoryId: 2,
    tags: ["响应式", "Proxy", "核心原理"],
  },
  {
    title: "什么是Composition API？与Options API有什么区别？",
    content: "请解释Vue3 Composition API的概念、优势以及与Options API的区别。",
    answer: `**Options API（选项式API）：**
Vue2的传统写法，将代码按照选项类型组织：data、methods、computed、watch等。

\`\`\`javascript
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() { this.count++ }
  },
  computed: {
    double() { return this.count * 2 }
  }
}
\`\`\`

**Composition API（组合式API）：**
Vue3引入的新API，使用函数的方式组织代码，相关逻辑可以放在一起。

\`\`\`javascript
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const double = computed(() => count.value * 2)
    const increment = () => { count.value++ }
    
    return { count, double, increment }
  }
}
\`\`\`

**或者使用script setup语法糖：**
\`\`\`vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)
const increment = () => { count.value++ }
</script>
\`\`\`

**Composition API的优势：**
1. **逻辑复用** - 通过composables函数复用逻辑
2. **代码组织** - 相关逻辑放在一起，而非分散在不同选项中
3. **类型推断** - 更好的TypeScript支持
4. **更灵活** - 可以自由组合和拆分逻辑

**Composables示例：**
\`\`\`javascript
// useCounter.js
export function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  const decrement = () => count.value--
  return { count, increment, decrement }
}
\`\`\``,
    analysis: "Composition API是Vue3的核心特性，需要理解其设计动机和使用场景。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["Composition API", "Vue3", "核心概念"],
  },
  {
    title: "Vue的生命周期有哪些？",
    content: "请详细说明Vue组件的生命周期钩子函数及其执行时机。",
    answer: `**Vue3生命周期钩子：**

**setup阶段：**
- setup() - 在组件创建之前执行

**挂载阶段：**
- onBeforeMount - 挂载前
- onMounted - 挂载后（可访问DOM）

**更新阶段：**
- onBeforeUpdate - 更新前
- onUpdated - 更新后

**卸载阶段：**
- onBeforeUnmount - 卸载前
- onUnmounted - 卸载后（清理副作用）

**其他：**
- onActivated - keep-alive激活时
- onDeactivated - keep-alive失活时
- onErrorCaptured - 捕获子组件错误

**Options API对应关系：**
- beforeCreate/created → setup()
- beforeMount → onBeforeMount
- mounted → onMounted
- beforeUpdate → onBeforeUpdate
- updated → onUpdated
- beforeDestroy → onBeforeUnmount
- destroyed → onUnmounted

**使用场景：**
\`\`\`javascript
import { onMounted, onUnmounted } from 'vue'

// 常见用法
onMounted(() => {
  // DOM操作、请求数据、添加事件监听
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  // 清理副作用、移除事件监听
  window.removeEventListener('scroll', handleScroll)
})
\`\`\`

**注意事项：**
- setup()相当于beforeCreate和created
- onMounted中可以访问DOM
- onUnmounted中清理副作用防止内存泄漏`,
    analysis:
      "生命周期是Vue组件的基础，理解各钩子的执行时机对于正确使用Vue非常重要。",
    difficulty: "easy",
    categoryId: 2,
    tags: ["生命周期", "Vue3", "基础"],
  },
  {
    title: "ref和reactive有什么区别？",
    content: "请解释Vue3中ref和reactive的区别、使用场景和注意事项。",
    answer: `**ref：**
用于包装基本类型和对象类型，返回一个响应式引用对象，需要通过.value访问。

\`\`\`javascript
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0
count.value++

const obj = ref({ name: 'Tom' })
console.log(obj.value.name) // 'Tom'
\`\`\`

**reactive：**
用于包装对象类型（对象、数组、Map、Set），返回响应式代理对象，可直接访问属性。

\`\`\`javascript
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  name: 'Tom'
})

console.log(state.count) // 0
state.count++
\`\`\`

**主要区别：**
1. **数据类型**：
   - ref：基本类型 + 对象类型
   - reactive：仅对象类型

2. **访问方式**：
   - ref：需要.value
   - reactive：直接访问

3. **模板中使用**：
   - ref：自动解包，无需.value
   - reactive：直接使用

4. **解构**：
   - ref：可直接解构
   - reactive：解构会丢失响应性，需用toRefs

**使用建议：**
- 基本类型使用ref
- 对象类型优先使用reactive
- 需要整体替换时使用ref

**注意事项：**
\`\`\`javascript
// reactive解构会丢失响应性
const state = reactive({ count: 0 })
const { count } = state // count不再是响应式的

// 使用toRefs解决
import { toRefs } from 'vue'
const { count } = toRefs(state) // count是ref
\`\`\`

**其他相关API：**
- toRef() - 为reactive对象的某个属性创建ref
- toRefs() - 将reactive对象转为ref对象
- shallowRef/shallowReactive - 浅层响应式`,
    analysis:
      "ref和reactive是Vue3响应式的核心API，理解它们的区别对于正确使用Vue3非常重要。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["ref", "reactive", "响应式"],
  },
  {
    title: "Vue组件间通信有哪些方式？",
    content: "请列举Vue组件间通信的各种方式及其适用场景。",
    answer: `**1. Props/Emit（父子组件）**
父组件通过props传递数据，子组件通过emit触发事件。

\`\`\`vue
<!-- 父组件 -->
<Child :msg="message" @update="handleUpdate" />

<!-- 子组件 -->
<script setup>
defineProps(['msg'])
const emit = defineEmits(['update'])
emit('update', newValue)
</script>
\`\`\`

**2. Provide/Inject（跨层级）**
祖先组件向后代组件传递数据，无需逐层传递props。

\`\`\`javascript
// 祖先组件
import { provide } from 'vue'
provide('key', value)

// 后代组件
import { inject } from 'vue'
const value = inject('key', defaultValue)
\`\`\`

**3. Pinia/Vuex（全局状态）**
适用于多个组件共享状态。

\`\`\`javascript
// store.js
export const useStore = defineStore('main', {
  state: () => ({ count: 0 }),
  actions: {
    increment() { this.count++ }
  }
})

// 组件中使用
const store = useStore()
store.increment()
\`\`\`

**4. Event Bus（事件总线）**
Vue3中需要使用mitt等第三方库。

\`\`\`javascript
import mitt from 'mitt'
const emitter = mitt()

// 发送
emitter.emit('event', data)

// 接收
emitter.on('event', handler)
\`\`\`

**5. $attrs（透传属性）**
将父组件的非props属性传递给子组件。

**6. $refs/$parent（直接访问）**
直接访问组件实例或父组件。

**使用场景：**
- 父子通信：Props/Emit
- 跨层级：Provide/Inject
- 全局状态：Pinia
- 简单场景：Event Bus
- 需要直接访问：$refs`,
    analysis: "组件通信是Vue开发的基础，需要根据场景选择合适的通信方式。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["组件通信", "Props", "Pinia"],
  },

  // CSS/HTML
  {
    title: "什么是盒模型？box-sizing有什么作用？",
    content: "请解释CSS盒模型的概念以及box-sizing属性的作用。",
    answer: `**盒模型（Box Model）：**
CSS中每个元素都被视为一个矩形盒子，由4部分组成：
1. content（内容）- 元素的实际内容
2. padding（内边距）- 内容与边框之间的空间
3. border（边框）- 盒子的边框
4. margin（外边距）- 盒子与其他元素之间的空间

**标准盒模型（content-box）：**
\`\`\`css
.box {
  box-sizing: content-box; /* 默认值 */
  width: 200px;
  padding: 20px;
  border: 5px solid;
}
/* 实际宽度 = 200 + 20*2 + 5*2 = 250px */
\`\`\`

**IE盒模型（border-box）：**
\`\`\`css
.box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid;
}
/* 实际宽度 = 200px，内容区自动缩小 */
\`\`\`

**box-sizing的作用：**
- content-box（默认）：width/height只包含内容区
- border-box：width/height包含content + padding + border

**最佳实践：**
\`\`\`css
/* 全局设置border-box */
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\`

**为什么推荐border-box：**
1. 更直观的尺寸计算
2. 响应式布局更方便
3. 避免padding和border导致布局错位`,
    analysis: "盒模型是CSS的基础概念，理解box-sizing对于布局非常重要。",
    difficulty: "easy",
    categoryId: 3,
    tags: ["盒模型", "box-sizing", "CSS基础"],
  },
  {
    title: "什么是BFC？如何触发BFC？",
    content: "请解释BFC的概念、触发条件和应用场景。",
    answer: `**BFC（Block Formatting Context）：**
块级格式化上下文，是一个独立的渲染区域，内部元素的布局不会影响外部元素。

**触发BFC的条件：**
1. 根元素（html）
2. float不为none
3. position为absolute或fixed
4. display为inline-block、flex、grid、table等
5. overflow不为visible（hidden、auto、scroll）
6. contain值为layout、content、paint
7. display: flow-root（最推荐）

**BFC的特性：**
1. 内部的Box会在垂直方向一个接一个放置
2. Box垂直方向的距离由margin决定，同一个BFC内相邻Box的margin会重叠
3. BFC的区域不会与float的Box重叠
4. BFC是隔离的独立容器，内外互不影响
5. 计算BFC的高度时，浮动元素也参与计算

**应用场景：**

**1. 清除浮动（解决高度塌陷）：**
\`\`\`css
.parent {
  overflow: hidden; /* 触发BFC */
}
\`\`\`

**2. 防止margin重叠：**
\`\`\`css
/* 给其中一个元素包裹一个BFC容器 */
.wrapper {
  overflow: hidden;
}
\`\`\`

**3. 自适应两栏布局：**
\`\`\`css
.main {
  overflow: hidden; /* BFC区域不与float重叠 */
}
\`\`\`

**推荐方式：**
\`\`\`css
.parent {
  display: flow-root; /* 最语义化的触发方式 */
}
\`\`\``,
    analysis: "BFC是CSS布局的重要概念，理解BFC对于解决布局问题非常有帮助。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["BFC", "布局", "CSS原理"],
  },
  {
    title: "Flex布局有哪些常用属性？",
    content: "请列举Flex布局的常用属性及其作用。",
    answer: `**容器属性（父元素）：**

**1. display: flex**
开启Flex布局。

**2. flex-direction**
主轴方向：
- row（默认）：水平，从左到右
- row-reverse：水平，从右到左
- column：垂直，从上到下
- column-reverse：垂直，从下到上

**3. justify-content**
主轴对齐方式：
- flex-start：左对齐
- flex-end：右对齐
- center：居中
- space-between：两端对齐
- space-around：等间距
- space-evenly：完全等间距

**4. align-items**
交叉轴对齐方式：
- stretch（默认）：拉伸
- flex-start：顶部对齐
- flex-end：底部对齐
- center：居中
- baseline：基线对齐

**5. flex-wrap**
是否换行：
- nowrap（默认）：不换行
- wrap：换行
- wrap-reverse：反向换行

**项目属性（子元素）：**

**1. flex**
flex-grow、flex-shrink、flex-basis的简写。

**2. flex-grow**
放大比例，默认0不放大。

**3. flex-shrink**
缩小比例，默认1会缩小。

**4. flex-basis**
初始大小，默认auto。

**5. align-self**
单独设置对齐方式。

**常见布局示例：**
\`\`\`css
/* 水平垂直居中 */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 两端对齐 */
.nav {
  display: flex;
  justify-content: space-between;
}

/* 等分排列 */
.row {
  display: flex;
}
.item {
  flex: 1;
}
\`\`\``,
    analysis: "Flex布局是现代CSS布局的核心，需要熟练掌握各种属性的用法。",
    difficulty: "easy",
    categoryId: 3,
    tags: ["Flex", "布局", "CSS3"],
  },
  {
    title: "如何实现水平垂直居中？",
    content: "请列举至少3种实现元素水平垂直居中的方法。",
    answer: `**方法1：Flex布局（推荐）**
\`\`\`css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`

**方法2：Grid布局**
\`\`\`css
.parent {
  display: grid;
  place-items: center;
}
\`\`\`

**方法3：绝对定位 + transform**
\`\`\`css
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
\`\`\`

**方法4：绝对定位 + margin: auto**
\`\`\`css
.child {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100px;  /* 需要指定宽高 */
  height: 100px;
}
\`\`\`

**方法5：绝对定位 + calc**
\`\`\`css
.child {
  position: absolute;
  top: calc(50% - 50px);  /* 减去自身高度的一半 */
  left: calc(50% - 50px); /* 减去自身宽度的一半 */
  width: 100px;
  height: 100px;
}
\`\`\`

**方法6：Flex + margin: auto**
\`\`\`css
.parent {
  display: flex;
}
.child {
  margin: auto;
}
\`\`\`

**使用建议：**
- 现代布局优先使用Flex或Grid
- 需要考虑兼容性时使用绝对定位
- 根据具体场景选择合适的方法`,
    analysis: "水平垂直居中是CSS的经典面试题，需要掌握多种实现方式。",
    difficulty: "easy",
    categoryId: 3,
    tags: ["居中", "布局", "Flex"],
  },

  // 网络与性能优化
  {
    title: "HTTP和HTTPS有什么区别？",
    content: "请详细说明HTTP和HTTPS的区别以及HTTPS的工作原理。",
    answer: `**主要区别：**

**1. 安全性：**
- HTTP：明文传输，不安全
- HTTPS：加密传输，安全

**2. 端口：**
- HTTP：80
- HTTPS：443

**3. 证书：**
- HTTP：不需要
- HTTPS：需要SSL证书

**4. 性能：**
- HTTP：较快
- HTTPS：有加密开销，但现代优化后差距很小

**HTTPS工作原理：**

**1. SSL/TLS握手过程：**
1. 客户端发送支持的加密算法列表
2. 服务器选择算法并返回证书
3. 客户端验证证书，生成随机数
4. 双方使用随机数生成对称密钥
5. 使用对称密钥加密通信

**2. 加密方式：**
- 非对称加密：用于密钥交换（RSA、ECDHE）
- 对称加密：用于数据传输（AES）
- 哈希算法：用于完整性校验（SHA-256）

**HTTPS的优势：**
1. 数据加密：防止窃听
2. 身份验证：防止冒充
3. 完整性：防止篡改
4. SEO友好：搜索引擎优先收录

**配置HTTPS：**
\`\`\`nginx
server {
    listen 443 ssl;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
}
\`\`\``,
    analysis: "HTTPS是现代Web的基础，理解其工作原理对于Web安全非常重要。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["HTTP", "HTTPS", "网络安全"],
  },
  {
    title: "什么是跨域？如何解决跨域问题？",
    content: "请解释跨域的原因以及各种解决方案。",
    answer: `**什么是跨域：**
浏览器的同源策略限制了不同源之间的交互。同源要求协议、域名、端口都相同。

**跨域场景：**
- 不同域名
- 不同端口
- 不同协议（http/https）
- 子域名不同

**解决方案：**

**1. CORS（推荐）**
服务器设置Access-Control-Allow-Origin头。

\`\`\`javascript
// Express
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
\`\`\`

**2. 代理服务器**
开发环境使用webpack/vite代理。

\`\`\`javascript
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://backend.com',
        changeOrigin: true
      }
    }
  }
}
\`\`\`

**3. JSONP**
利用script标签不受同源策略限制。

\`\`\`javascript
function handleData(data) {
  console.log(data);
}

const script = document.createElement('script');
script.src = 'http://api.com?callback=handleData';
document.body.appendChild(script);
\`\`\`

**4. Nginx反向代理**
\`\`\`nginx
location /api {
    proxy_pass http://backend.com;
}
\`\`\`

**5. postMessage**
跨窗口通信。

**6. WebSocket**
不受同源策略限制。

**CORS预检请求：**
对于复杂请求，浏览器会先发送OPTIONS请求进行预检。`,
    analysis: "跨域是前端开发的常见问题，需要理解同源策略和各种解决方案。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["跨域", "CORS", "同源策略"],
  },
  {
    title: "前端性能优化有哪些方法？",
    content: "请列举前端性能优化的各种策略和方法。",
    answer: `**1. 资源加载优化：**
- 代码分割（Code Splitting）
- 路由懒加载
- 图片懒加载
- 资源预加载（preload/prefetch）
- CDN加速
- Gzip/Brotli压缩

**2. 代码优化：**
- Tree Shaking删除无用代码
- 减少重排重绘
- 使用Web Worker处理耗时任务
- 防抖节流
- 虚拟列表

**3. 网络优化：**
- HTTP/2多路复用
- 减少HTTP请求
- 使用缓存（强缓存/协商缓存）
- Service Worker离线缓存

**4. 渲染优化：**
- CSS放在头部，JS放在底部
- 减少DOM操作
- 使用requestAnimationFrame
- 避免强制同步布局

**5. 图片优化：**
- 选择合适的格式（WebP/AVIF）
- 响应式图片（srcset）
- 图片压缩
- CSS Sprites

**6. Vue/React优化：**
- 组件懒加载
- 使用key优化列表
- 避免不必要的重新渲染
- useMemo/useCallback（React）
- shallowRef/shallowReactive（Vue）

**7. 监控分析：**
- Lighthouse评分
- Core Web Vitals
- 性能监控SDK

**首屏优化：**
- SSR/SSG
- 骨架屏
- 关键CSS内联
- 预渲染`,
    analysis: "性能优化是前端开发的重要技能，需要从多个维度进行优化。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["性能优化", "最佳实践"],
  },

  // TypeScript
  {
    title: "TypeScript有什么优势？与JavaScript有什么区别？",
    content: "请解释TypeScript的优势以及与JavaScript的主要区别。",
    answer: `**TypeScript的优势：**

**1. 类型安全：**
- 编译时类型检查
- 减少运行时错误
- 更好的代码质量

**2. 开发体验：**
- 更好的IDE支持
- 智能提示和自动补全
- 重构更安全

**3. 可维护性：**
- 类型即文档
- 更容易理解代码意图
- 团队协作更高效

**4. 生态系统：**
- 更多框架支持
- 更好的第三方库类型定义

**与JavaScript的区别：**

**1. 类型系统：**
\`\`\`typescript
// TypeScript有类型注解
let name: string = 'Tom';
let age: number = 18;
let isStudent: boolean = false;

// 接口定义
interface User {
  name: string;
  age: number;
}

// 泛型
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

**2. 编译：**
- TypeScript需要编译为JavaScript
- JavaScript直接运行

**3. 特性：**
- TypeScript支持接口、枚举、泛型等
- TypeScript支持类型推断

**TypeScript配置：**
\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "esModuleInterop": true
  }
}
\`\`\`

**使用建议：**
- 新项目推荐使用TypeScript
- 大型项目必须使用TypeScript
- 逐步迁移现有项目`,
    analysis: "TypeScript已成为前端开发的主流选择，需要理解其优势和使用场景。",
    difficulty: "easy",
    categoryId: 6,
    tags: ["TypeScript", "类型系统"],
  },

  // 工程化
  {
    title: "Webpack和Vite有什么区别？",
    content: "请比较Webpack和Vite的区别、优势和适用场景。",
    answer: `**Webpack：**
- 传统的模块打包工具
- 基于bundle的打包方式
- 生态成熟，插件丰富

**Vite：**
- 新一代前端构建工具
- 基于ESM的开发服务器
- 开发体验极佳

**主要区别：**

**1. 启动速度：**
- Webpack：需要打包整个项目
- Vite：利用浏览器原生ESM，按需编译

**2. 热更新：**
- Webpack：重新编译受影响的模块
- Vite：只更新变化的模块，速度极快

**3. 构建方式：**
- Webpack：bundle-based
- Vite：ESM + Rollup

**4. 配置复杂度：**
- Webpack：配置复杂
- Vite：开箱即用，配置简单

**Vite的优势：**
\`\`\`bash
# 快速启动
npm create vite@latest

# 开发服务器毫秒级启动
npm run dev
\`\`\`

**Webpack的优势：**
- 更成熟的生态
- 更多的loader和plugin
- 更好的兼容性

**使用建议：**
- 新项目推荐Vite
- 大型复杂项目可考虑Webpack
- Vue/React项目优先Vite

**Vite配置示例：**
\`\`\`javascript
// vite.config.js
export default {
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
}
\`\`\``,
    analysis:
      "构建工具是前端工程化的基础，需要了解Webpack和Vite的区别和适用场景。",
    difficulty: "medium",
    categoryId: 7,
    tags: ["Webpack", "Vite", "构建工具"],
  },
];

async function initDatabase() {
  try {
    // 同步数据库（创建表）
    await sequelize.sync({ force: true });
    console.log("数据库表创建成功");

    // 创建分类
    const createdCategories = await Category.bulkCreate(categories);
    console.log(`创建了 ${createdCategories.length} 个分类`);

    // 创建题目（关联分类）
    const questionsWithCategory = questions.map((q, index) => {
      // 根据题目顺序分配分类
      let categoryId;
      if (index < 10)
        categoryId = 1; // JavaScript基础
      else if (index < 15)
        categoryId = 2; // Vue.js
      else if (index < 19)
        categoryId = 3; // CSS/HTML
      else if (index < 22)
        categoryId = 5; // 网络与性能优化
      else if (index < 23)
        categoryId = 6; // TypeScript
      else categoryId = 7; // 工程化

      return { ...q, categoryId };
    });

    const createdQuestions = await Question.bulkCreate(questionsWithCategory);
    console.log(`创建了 ${createdQuestions.length} 道题目`);

    console.log("数据初始化完成！");
    process.exit(0);
  } catch (error) {
    console.error("初始化失败:", error);
    process.exit(1);
  }
}

initDatabase();
