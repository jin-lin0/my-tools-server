const sequelize = require("../config/database");
const Question = require("../models/question");

const jsQuestions = [
  {
    title: "什么是变量提升（Hoisting）？",
    content: "请解释JavaScript中变量提升的概念和行为。",
    answer: `**变量提升是JavaScript的一种行为**，变量和函数声明会被提升到其作用域的顶部。

**var的提升：**
\`\`\`javascript
console.log(a); // undefined（声明被提升，但赋值未提升）
var a = 5;
\`\`\`

**let/const的提升：**
\`\`\`javascript
console.log(b); // ReferenceError（暂时性死区）
let b = 10;
\`\`\`

**函数提升：**
\`\`\`javascript
greet(); // "Hello"（整个函数被提升）
function greet() {
  console.log("Hello");
}
\`\`\`

**关键区别：**
- var：提升并初始化为undefined
- let/const：提升但不初始化（暂时性死区）
- 函数声明：整个函数体被提升
- 函数表达式：只有变量名被提升`,
    analysis: "变量提升是理解JavaScript执行机制的基础概念。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["变量提升", "作用域", "基础"],
  },
  {
    title: "== 和 === 有什么区别？",
    content: "请解释JavaScript中宽松相等和严格相等的区别。",
    answer: `**== 宽松相等：**
会进行类型转换后再比较。

\`\`\`javascript
0 == '0'      // true（字符串转数字）
0 == ''       // true（空字符串转0）
null == undefined  // true
NaN == NaN    // false
\`\`\`

**=== 严格相等：**
不进行类型转换，类型和值都必须相同。

\`\`\`javascript
0 === '0'     // false（类型不同）
0 === 0       // true
null === undefined  // false
\`\`\`

**最佳实践：**
始终使用===，除非你明确需要类型转换。

**特殊情况：**
\`\`\`javascript
[] == false   // true
[] === false  // false
![] == false  // true
\`\`\``,
    analysis: "相等比较是JavaScript的经典陷阱，理解类型转换规则非常重要。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["类型转换", "比较", "基础"],
  },
  {
    title: "什么是暂时性死区（TDZ）？",
    content: "请解释JavaScript中暂时性死区的概念。",
    answer: `**暂时性死区（Temporal Dead Zone）：**
使用let/const声明的变量，在声明之前无法访问的区域。

\`\`\`javascript
{
  // 暂时性死区开始
  console.log(x); // ReferenceError
  // 暂时性死区结束
  let x = 5;
}
\`\`\`

**为什么存在TDZ：**
1. 防止在变量声明前使用变量
2. 使const更有意义（必须在声明时初始化）
3. 使代码行为更可预测

**与var的区别：**
\`\`\`javascript
console.log(a); // undefined（var提升）
var a = 5;

console.log(b); // ReferenceError（TDZ）
let b = 10;
\`\`\`

**实际场景：**
\`\`\`javascript
function example(x = y, y = 2) {
  console.log(x, y);
}
example(); // ReferenceError: y is not defined
\`\`\``,
    analysis: "暂时性死区是ES6引入let/const的重要特性，避免了var的一些问题。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["TDZ", "let", "const", "ES6"],
  },
  {
    title: "什么是IIFE？有什么用途？",
    content: "请解释立即执行函数表达式（IIFE）的概念和用途。",
    answer: `**IIFE（Immediately Invoked Function Expression）：**
定义后立即执行的函数。

\`\`\`javascript
(function() {
  console.log("IIFE executed!");
})();

// 箭头函数版本
(() => {
  console.log("Arrow IIFE!");
})();
\`\`\`

**用途：**

**1. 避免全局污染：**
\`\`\`javascript
(function() {
  var private = "I'm private";
  // 不会污染全局作用域
})();
console.log(typeof private); // undefined
\`\`\`

**2. 模块模式：**
\`\`\`javascript
const module = (function() {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count
  };
})();
\`\`\`

**3. 初始化代码：**
\`\`\`javascript
(function(config) {
  // 初始化逻辑
})(appConfig);
\`\`\`

**4. 避免闭包问题：**
\`\`\`javascript
for (var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}
\`\`\``,
    analysis: "IIFE是JavaScript模块化的重要模式，虽然现在有ES Modules，但仍需理解。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["IIFE", "作用域", "模块化"],
  },
  {
    title: "什么是解构赋值？",
    content: "请解释ES6解构赋值的语法和用法。",
    answer: `**解构赋值：**
从数组或对象中提取值，赋给变量。

**数组解构：**
\`\`\`javascript
const [a, b, c] = [1, 2, 3];
// a=1, b=2, c=3

// 跳过元素
const [x, , z] = [1, 2, 3];
// x=1, z=3

// 默认值
const [p = 10, q = 20] = [1];
// p=1, q=20

// 剩余元素
const [first, ...rest] = [1, 2, 3];
// first=1, rest=[2,3]
\`\`\`

**对象解构：**
\`\`\`javascript
const { name, age } = { name: "Tom", age: 18 };

// 重命名
const { name: userName } = { name: "Tom" };

// 默认值
const { score = 0 } = {};

// 嵌套解构
const { address: { city } } = { address: { city: "Beijing" } };
\`\`\`

**函数参数解构：**
\`\`\`javascript
function greet({ name, age = 18 }) {
  console.log(\`Hello \${name}, age \${age}\`);
}
greet({ name: "Tom" });
\`\`\`

**交换变量：**
\`\`\`javascript
let a = 1, b = 2;
[a, b] = [b, a];
\`\`\``,
    analysis: "解构赋值是ES6最常用的特性之一，使代码更简洁。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["解构", "ES6", "语法"],
  },
  {
    title: "什么是模板字符串？",
    content: "请解释ES6模板字符串的语法和优势。",
    answer: `**模板字符串（Template Literals）：**
使用反引号（\`）定义的字符串，支持多行和表达式插值。

**基本用法：**
\`\`\`javascript
const name = "Tom";
const greeting = \`Hello, \${name}!\`;
\`\`\`

**表达式插值：**
\`\`\`javascript
const a = 1, b = 2;
console.log(\`\${a} + \${b} = \${a + b}\`);
// "1 + 2 = 3"
\`\`\`

**多行字符串：**
\`\`\`javascript
const html = \`
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
\`;
\`\`\`

**标签模板（Tagged Templates）：**
\`\`\`javascript
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? \`<b>\${values[i]}</b>\` : '');
  }, '');
}

const name = "Tom";
const age = 18;
highlight\`Name: \${name}, Age: \${age}\`;
\`\`\`

**优势：**
1. 支持多行字符串
2. 支持表达式插值
3. 更好的可读性
4. 支持标签模板`,
    analysis: "模板字符串是ES6的基础特性，替代了传统的字符串拼接方式。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["模板字符串", "ES6", "字符串"],
  },
  {
    title: "什么是展开运算符？有哪些用途？",
    content: "请解释ES6展开运算符（...）的语法和各种用途。",
    answer: `**展开运算符（Spread Operator）：**
用三个点（...）表示，可以展开数组或对象。

**数组展开：**
\`\`\`javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1,2,3,4,5]

// 复制数组（浅拷贝）
const copy = [...arr1];

// 合并数组
const merged = [...arr1, ...arr2];
\`\`\`

**对象展开：**
\`\`\`javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // {a:1, b:2, c:3}

// 复制对象（浅拷贝）
const copy = { ...obj1 };

// 合并对象
const merged = { ...obj1, ...obj2 };
\`\`\`

**函数参数：**
\`\`\`javascript
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3); // 6

const args = [1, 2, 3];
Math.max(...args); // 3
\`\`\`

**其他用途：**
\`\`\`javascript
// 字符串转数组
const chars = [..."hello"]; // ['h','e','l','l','o']

// NodeList转数组
const divs = [...document.querySelectorAll('div')];
\`\`\``,
    analysis: "展开运算符是ES6最实用的特性之一，简化了数组和对象的操作。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["展开运算符", "ES6", "语法"],
  },
  {
    title: "什么是箭头函数？与普通函数有什么区别？",
    content: "请解释ES6箭头函数的语法和与普通函数的区别。",
    answer: `**箭头函数（Arrow Function）：**
ES6引入的简洁函数语法。

\`\`\`javascript
// 基本语法
const add = (a, b) => a + b;

// 单参数可省略括号
const double = x => x * 2;

// 多行函数体
const greet = (name) => {
  const msg = \`Hello, \${name}\`;
  return msg;
};
\`\`\`

**与普通函数的区别：**

**1. this绑定：**
\`\`\`javascript
const obj = {
  name: "Tom",
  greet: function() {
    setTimeout(() => {
      console.log(this.name); // "Tom"（继承外层this）
    }, 100);
  }
};
\`\`\`

**2. 没有arguments对象：**
\`\`\`javascript
const fn = (...args) => {
  console.log(args); // 使用rest参数
};
\`\`\`

**3. 不能作为构造函数：**
\`\`\`javascript
const Foo = () => {};
new Foo(); // TypeError
\`\`\`

**4. 没有prototype属性：**
\`\`\`javascript
const fn = () => {};
console.log(fn.prototype); // undefined
\`\`\`

**使用场景：**
- 回调函数
- 需要继承外层this的场景
- 简短的函数逻辑

**不适用场景：**
- 对象方法（需要this）
- 构造函数
- 需要arguments的场景`,
    analysis: "箭头函数是ES6的重要特性，理解this绑定的差异是关键。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["箭头函数", "ES6", "this"],
  },
  {
    title: "什么是Promise.all、Promise.race、Promise.allSettled？",
    content: "请解释Promise的静态方法及其区别。",
    answer: `**Promise.all：**
所有Promise都成功才成功，一个失败则失败。

\`\`\`javascript
const p1 = fetch('/api1');
const p2 = fetch('/api2');

Promise.all([p1, p2])
  .then(([res1, res2]) => {
    // 两个都成功
  })
  .catch(err => {
    // 任一失败
  });
\`\`\`

**Promise.race：**
返回第一个完成的结果（无论成功或失败）。

\`\`\`javascript
Promise.race([
  fetch('/api'),
  new Promise((_, reject) => 
    setTimeout(() => reject('timeout'), 5000)
  )
]);
\`\`\`

**Promise.allSettled：**
等待所有Promise完成，无论成功或失败。

\`\`\`javascript
Promise.allSettled([p1, p2]).then(results => {
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      console.log('成功:', result.value);
    } else {
      console.log('失败:', result.reason);
    }
  });
});
\`\`\`

**Promise.any：**
返回第一个成功的结果，全部失败则失败。

\`\`\`javascript
Promise.any([
  fetch('/api1'),
  fetch('/api2'),
  fetch('/api3')
]).then(firstSuccess => {
  // 第一个成功的响应
});
\`\`\`

**使用场景：**
- Promise.all：需要所有请求都成功
- Promise.race：超时处理
- Promise.allSettled：批量操作，不关心个别失败
- Promise.any：多源请求，取最快的成功响应`,
    analysis: "Promise静态方法是异步编程的重要工具，需要根据场景选择合适的方法。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["Promise", "异步", "ES6"],
  },
  {
    title: "什么是Generator函数？",
    content: "请解释ES6 Generator函数的概念和用法。",
    answer: `**Generator函数：**
可以暂停和恢复执行的函数，使用function*定义。

\`\`\`javascript
function* count() {
  yield 1;
  yield 2;
  yield 3;
}

const counter = count();
counter.next(); // { value: 1, done: false }
counter.next(); // { value: 2, done: false }
counter.next(); // { value: 3, done: false }
counter.next(); // { value: undefined, done: true }
\`\`\`

**实际应用：**

**1. 惰性求值：**
\`\`\`javascript
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
fib.next().value; // 0
fib.next().value; // 1
fib.next().value; // 1
\`\`\`

**2. 异步流程控制：**
\`\`\`javascript
function* fetchUser() {
  const user = yield fetch('/api/user');
  const posts = yield fetch(\`/api/posts/\${user.id}\`);
  return { user, posts };
}
\`\`\`

**3. 可迭代协议：**
\`\`\`javascript
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for (const num of range(1, 5)) {
  console.log(num); // 1, 2, 3, 4, 5
}
\`\`\`

**与async/await的关系：**
async/await本质上是Generator的语法糖。`,
    analysis: "Generator是理解async/await原理的基础，也是迭代器协议的重要实现。",
    difficulty: "hard",
    categoryId: 1,
    tags: ["Generator", "迭代器", "ES6"],
  },
  {
    title: "什么是Symbol？有什么用途？",
    content: "请解释ES6 Symbol类型的特性和用途。",
    answer: `**Symbol：**
ES6引入的原始数据类型，表示独一无二的值。

\`\`\`javascript
const s1 = Symbol();
const s2 = Symbol();
s1 === s2; // false

const s3 = Symbol('description');
console.log(s3.toString()); // "Symbol(description)"
\`\`\`

**用途：**

**1. 对象属性的唯一键：**
\`\`\`javascript
const id = Symbol('id');
const user = {
  [id]: 123,
  name: "Tom"
};
console.log(user[id]); // 123
\`\`\`

**2. 防止属性名冲突：**
\`\`\`javascript
const LOG = Symbol('log');
class Logger {
  [LOG](msg) {
    console.log(msg);
  }
}
\`\`\`

**3. 内置Symbol：**
\`\`\`javascript
// Symbol.iterator - 定义迭代行为
class Collection {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
}

// Symbol.toPrimitive - 类型转换
const obj = {
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return 42;
    return 'hello';
  }
};
\`\`\`

**4. 全局Symbol注册表：**
\`\`\`javascript
const s1 = Symbol.for('shared');
const s2 = Symbol.for('shared');
s1 === s2; // true
\`\`\``,
    analysis: "Symbol是JavaScript的第七种原始类型，用于创建唯一标识符。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["Symbol", "ES6", "原始类型"],
  },
  {
    title: "什么是Map和Set？与Object和Array有什么区别？",
    content: "请解释ES6 Map和Set数据结构及其与传统数据结构的区别。",
    answer: `**Map：**
键值对集合，键可以是任何类型。

\`\`\`javascript
const map = new Map();
map.set('name', 'Tom');
map.set(1, 'one');
map.set(true, 'yes');

map.get('name'); // 'Tom'
map.size; // 3
map.has(1); // true
\`\`\`

**Set：**
唯一值集合。

\`\`\`javascript
const set = new Set([1, 2, 3, 2, 1]);
console.log(set); // Set {1, 2, 3}

set.add(4);
set.has(2); // true
set.delete(1);
set.size; // 3
\`\`\`

**Map vs Object：**
| 特性 | Map | Object |
|------|-----|--------|
| 键类型 | 任何类型 | 字符串/Symbol |
| 大小 | map.size | 需要计算 |
| 迭代 | 可直接迭代 | 需要转换 |
| 性能 | 频繁增删更好 | 频繁读取更好 |

**Set vs Array：**
| 特性 | Set | Array |
|------|-----|-------|
| 唯一性 | 自动去重 | 允许重复 |
| 查找 | O(1) | O(n) |
| 顺序 | 有序 | 有序 |

**常见用法：**
\`\`\`javascript
// 数组去重
const unique = [...new Set(arr)];

// Map转Object
const obj = Object.fromEntries(map);

// 交集
const intersection = [...set1].filter(x => set2.has(x));
\`\`\``,
    analysis: "Map和Set是ES6引入的高效数据结构，适合特定场景使用。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["Map", "Set", "ES6", "数据结构"],
  },
  {
    title: "什么是WeakMap和WeakSet？",
    content: "请解释WeakMap和WeakSet的特性和使用场景。",
    answer: `**WeakMap：**
键必须是对象，且为弱引用。

\`\`\`javascript
const weakMap = new WeakMap();
const obj = {};
weakMap.set(obj, 'data');

obj = null; // 键对象可被垃圾回收
\`\`\`

**WeakSet：**
值必须是对象，且为弱引用。

\`\`\`javascript
const weakSet = new WeakSet();
const obj = {};
weakSet.add(obj);
weakSet.has(obj); // true
\`\`\`

**弱引用的含义：**
- 不会阻止垃圾回收
- 对象被回收后，WeakMap/WeakSet中的对应条目自动消失

**使用场景：**

**1. 存储对象的私有数据：**
\`\`\`javascript
const privateData = new WeakMap();

class User {
  constructor(name) {
    privateData.set(this, { name });
  }
  getName() {
    return privateData.get(this).name;
  }
}
\`\`\`

**2. 缓存计算结果：**
\`\`\`javascript
const cache = new WeakMap();

function process(obj) {
  if (cache.has(obj)) return cache.get(obj);
  const result = expensiveCalculation(obj);
  cache.set(obj, result);
  return result;
}
\`\`\`

**3. 标记对象：**
\`\`\`javascript
const visited = new WeakSet();

function traverse(node) {
  if (visited.has(node)) return;
  visited.add(node);
  // 处理节点
}
\`\`\`

**与Map/Set的区别：**
- 键/值必须是对象
- 不可迭代
- 没有size属性
- 弱引用，利于垃圾回收`,
    analysis: "WeakMap和WeakSet用于处理对象引用，避免内存泄漏。",
    difficulty: "hard",
    categoryId: 1,
    tags: ["WeakMap", "WeakSet", "内存管理"],
  },
  {
    title: "什么是Proxy？有什么用途？",
    content: "请解释ES6 Proxy的概念和使用场景。",
    answer: `**Proxy：**
用于创建对象的代理，可以拦截并自定义基本操作。

\`\`\`javascript
const handler = {
  get(target, prop) {
    console.log(\`Getting \${prop}\`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(\`Setting \${prop} = \${value}\`);
    target[prop] = value;
    return true;
  }
};

const proxy = new Proxy({}, handler);
proxy.name = 'Tom'; // Setting name = Tom
proxy.name; // Getting name
\`\`\`

**可拦截的操作：**
- get/set - 属性读写
- has - in操作符
- deleteProperty - delete操作符
- apply - 函数调用
- construct - new操作符

**实际应用：**

**1. 数据验证：**
\`\`\`javascript
const validator = {
  set(target, prop, value) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    target[prop] = value;
    return true;
  }
};
\`\`\`

**2. 默认值：**
\`\`\`javascript
const defaults = { color: 'red', size: 'medium' };
const config = new Proxy(defaults, {
  get(target, prop) {
    return prop in target ? target[prop] : undefined;
  }
});
\`\`\`

**3. Vue3响应式原理：**
\`\`\`javascript
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key);
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      trigger(target, key);
      return true;
    }
  });
}
\`\`\``,
    analysis: "Proxy是Vue3响应式系统的核心，也是元编程的重要工具。",
    difficulty: "hard",
    categoryId: 1,
    tags: ["Proxy", "ES6", "响应式"],
  },
  {
    title: "什么是Reflect？",
    content: "请解释ES6 Reflect API的概念和用途。",
    answer: `**Reflect：**
提供拦截JavaScript操作的方法，与Proxy handler方法对应。

\`\`\`javascript
// 旧写法
obj.name;
delete obj.name;
'name' in obj;

// Reflect写法
Reflect.get(obj, 'name');
Reflect.deleteProperty(obj, 'name');
Reflect.has(obj, 'name');
\`\`\`

**常用方法：**
\`\`\`javascript
Reflect.get(target, key)        // 读取属性
Reflect.set(target, key, value) // 设置属性
Reflect.has(target, key)        // 检查属性
Reflect.deleteProperty(target, key) // 删除属性
Reflect.construct(target, args) // 调用构造函数
Reflect.apply(func, thisArg, args) // 调用函数
\`\`\`

**与Proxy配合使用：**
\`\`\`javascript
const handler = {
  get(target, key, receiver) {
    console.log('get', key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log('set', key, value);
    return Reflect.set(target, key, value, receiver);
  }
};
\`\`\`

**优势：**
1. 返回布尔值，操作更安全
2. 替代Object上的命令式方法
3. 与Proxy方法一一对应
4. 更好的函数式风格`,
    analysis: "Reflect是与Proxy配套的API，提供了更规范的对象操作方式。",
    difficulty: "hard",
    categoryId: 1,
    tags: ["Reflect", "Proxy", "ES6"],
  },
  {
    title: "什么是class语法？与构造函数有什么区别？",
    content: "请解释ES6 class语法及其与传统构造函数的区别。",
    answer: `**ES6 Class语法：**
\`\`\`javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
  
  static create(name, age) {
    return new Person(name, age);
  }
}

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }
  
  study() {
    return \`\${this.name} is studying\`;
  }
}
\`\`\`

**与构造函数的区别：**

**1. 语法层面：**
\`\`\`javascript
// 构造函数
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {};

// Class
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {}
}
\`\`\`

**2. 必须使用new调用：**
\`\`\`javascript
class Foo {}
Foo(); // TypeError

function Bar() {}
Bar(); // 可以（this指向window）
\`\`\`

**3. 方法不可枚举：**
\`\`\`javascript
class Foo {
  method() {}
}
Object.keys(Foo.prototype); // []

function Bar() {}
Bar.prototype.method = function() {};
Object.keys(Bar.prototype); // ['method']
\`\`\`

**4. 没有变量提升：**
\`\`\`javascript
new Foo(); // ReferenceError
class Foo {}
\`\`\`

**本质：**
Class是构造函数的语法糖，本质上还是基于原型链。`,
    analysis: "Class语法使面向对象编程更清晰，但需理解其本质仍是原型链。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["class", "面向对象", "ES6"],
  },
  {
    title: "什么是迭代器（Iterator）？",
    content: "请解释JavaScript迭代器协议和可迭代协议。",
    answer: `**迭代器协议：**
对象实现next()方法，返回{value, done}。

\`\`\`javascript
function createIterator(arr) {
  let index = 0;
  return {
    next() {
      return index < arr.length
        ? { value: arr[index++], done: false }
        : { value: undefined, done: true };
    }
  };
}

const iter = createIterator([1, 2, 3]);
iter.next(); // { value: 1, done: false }
iter.next(); // { value: 2, done: false }
iter.next(); // { value: 3, done: false }
iter.next(); // { value: undefined, done: true }
\`\`\`

**可迭代协议：**
对象实现[Symbol.iterator]方法。

\`\`\`javascript
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    
    return {
      next() {
        return current <= end
          ? { value: current++, done: false }
          : { done: true };
      }
    };
  }
}

for (const num of new Range(1, 5)) {
  console.log(num); // 1, 2, 3, 4, 5
}
\`\`\`

**内置可迭代对象：**
- Array
- String
- Map
- Set
- arguments
- NodeList

**使用场景：**
- for...of循环
- 展开运算符
- 解构赋值
- Promise.all`,
    analysis: "迭代器是JavaScript异步迭代和生成器的基础。",
    difficulty: "hard",
    categoryId: 1,
    tags: ["迭代器", "Symbol.iterator", "ES6"],
  },
  {
    title: "什么是可选链操作符（?.）？",
    content: "请解释ES2020可选链操作符的用法。",
    answer: `**可选链操作符（?.）：**
安全地访问深层嵌套属性，避免TypeError。

\`\`\`javascript
const user = {
  name: "Tom",
  address: {
    city: "Beijing"
  }
};

// 传统写法
const city1 = user && user.address && user.address.city;

// 可选链
const city2 = user?.address?.city;
\`\`\`

**各种用法：**

**1. 属性访问：**
\`\`\`javascript
obj?.prop
obj?.[expr]
\`\`\`

**2. 方法调用：**
\`\`\`javascript
obj.method?.()
\`\`\`

**3. 数组访问：**
\`\`\`javascript
arr?.[index]
\`\`\`

**实际场景：**
\`\`\`javascript
// API响应可能缺少字段
const response = { data: null };
const value = response?.data?.items?.[0]?.name;

// 函数可能不存在
const result = obj.customMethod?.();

// 链式调用
const street = user?.address?.getStreet?.();
\`\`\`

**与空值合并运算符（??）配合：**
\`\`\`javascript
const value = obj?.prop ?? 'default';
\`\`\`

**注意事项：**
- 只短路左侧的操作
- 不用于赋值左侧
- 与delete一起使用`,
    analysis: "可选链是处理null/undefined的利器，使代码更简洁安全。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["可选链", "ES2020", "语法"],
  },
  {
    title: "什么是空值合并运算符（??）？",
    content: "请解释ES2020空值合并运算符的用法。",
    answer: `**空值合并运算符（??）：**
当左侧为null或undefined时返回右侧值。

\`\`\`javascript
const value1 = null ?? 'default'; // 'default'
const value2 = undefined ?? 'default'; // 'default'
const value3 = 0 ?? 'default'; // 0
const value4 = '' ?? 'default'; // ''
const value5 = false ?? 'default'; // false
\`\`\`

**与||的区别：**
\`\`\`javascript
// || 会将假值（0, '', false, null, undefined）视为false
const a = 0 || 'default'; // 'default'

// ?? 只处理null和undefined
const b = 0 ?? 'default'; // 0
\`\`\`

**使用场景：**

**1. 默认值：**
\`\`\`javascript
function greet(name) {
  const user = name ?? 'Guest';
  console.log(\`Hello, \${user}\`);
}
\`\`\`

**2. 配置合并：**
\`\`\`javascript
const config = {
  timeout: userConfig.timeout ?? 3000,
  retries: userConfig.retries ?? 3
};
\`\`\`

**3. 与可选链配合：**
\`\`\`javascript
const city = user?.address?.city ?? 'Unknown';
\`\`\`

**短路求值：**
\`\`\`javascript
// 右侧不会被执行
const value = null ?? expensiveFunction();
\`\`\``,
    analysis: "空值合并运算符是处理默认值的最佳方式，避免了||的误判。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["空值合并", "ES2020", "语法"],
  },
  {
    title: "什么是globalThis？",
    content: "请解释ES2020 globalThis的概念和用途。",
    answer: `**globalThis：**
提供一个统一的方式访问全局对象，无论在什么环境中。

**不同环境的全局对象：**
- 浏览器：window
- Web Worker：self
- Node.js：global
- 混合环境：globalThis

\`\`\`javascript
// 浏览器
window === globalThis; // true

// Node.js
global === globalThis; // true

// Web Worker
self === globalThis; // true
\`\`\`

**使用场景：**

**1. 跨环境代码：**
\`\`\`javascript
function getGlobal() {
  return globalThis;
}
\`\`\`

**2. Polyfill注册：**
\`\`\`javascript
if (!globalThis.fetch) {
  globalThis.fetch = customFetch;
}
\`\`\`

**3. 全局变量存储：**
\`\`\`javascript
globalThis.myAppConfig = {
  apiUrl: 'https://api.example.com'
};
\`\`\`

**4. 检测环境：**
\`\`\`javascript
const isBrowser = typeof globalThis.window !== 'undefined';
const isNode = typeof globalThis.process !== 'undefined';
\`\`\`

**兼容性：**
- Chrome 71+
- Firefox 65+
- Safari 12.1+
- Node.js 12+`,
    analysis: "globalThis解决了跨环境访问全局对象的问题。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["globalThis", "ES2020", "跨平台"],
  },
];

async function batchImport() {
  try {
    const created = await Question.bulkCreate(jsQuestions);
    console.log(`成功导入 ${created.length} 道JavaScript面试题`);
    process.exit(0);
  } catch (error) {
    console.error("导入失败:", error);
    process.exit(1);
  }
}

batchImport();