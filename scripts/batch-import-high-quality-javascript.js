const sequelize = require("../config/database");
const Question = require("../models/question");

const highQualityQuestions = [
  {
    title: "JavaScript的闭包是什么？请详细解释原理和应用",
    content: "请深入解释JavaScript闭包的概念、原理、应用场景以及常见面试题。",
    answer: `## 闭包的定义

闭包是指有权访问另一个函数作用域中变量的函数。简单来说，一个函数内部的函数可以访问外层函数的变量，即使外层函数已经执行完毕。

## 闭包形成的原理

1. **词法作用域**：函数可以访问其定义时所在作用域的变量
2. **函数作为返回值或参数传递**
3. **作用域链不被销毁**：即使外层函数执行完毕，其作用域仍然保留在内存中

## 简单示例

\`\`\`javascript
function makeCounter() {
  let count = 0; // 自由变量
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = makeCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
\`\`\`

## 闭包的核心特点

1. **函数嵌套函数**
2. **内部函数引用外部函数变量**
3. **内部函数被返回或传递到外部**

## 闭包的实际应用场景

### 1. 数据私有化/封装

\`\`\`javascript
function createPerson(name, age) {
  let privateAge = age; // 私有变量
  
  return {
    getName: function() {
      return name;
    },
    getAge: function() {
      return privateAge;
    },
    birthday: function() {
      privateAge++;
    }
  };
}

const person = createPerson('张三', 25);
console.log(person.getName());  // "张三"
console.log(person.getAge());   // 25
person.birthday();
console.log(person.getAge());   // 26
// 无法直接访问 privateAge
\`\`\`

### 2. 函数柯里化

\`\`\`javascript
function add(a) {
  return function(b) {
    return a + b;
  };
}

const add5 = add(5);
console.log(add5(3));  // 8
console.log(add5(10)); // 15
\`\`\`

### 3. 防抖和节流

\`\`\`javascript
// 防抖
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 节流
function throttle(fn, delay) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime > delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}
\`\`\`

### 4. 模块模式

\`\`\`javascript
const Calculator = (function() {
  let lastResult = 0;
  
  function add(a, b) {
    lastResult = a + b;
    return lastResult;
  }
  
  function getLast() {
    return lastResult;
  }
  
  return {
    add,
    getLast
  };
})();

Calculator.add(3, 4); // 7
Calculator.getLast(); // 7
\`\`\`

## 闭包常见的面试陷阱

### 1. 循环中的变量问题

\`\`\`javascript
// ❌ 常见问题：输出都是10
for (var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i); // 10, 10, 10...
  }, 100);
}

// ✅ 解决方法1：使用let
for (let i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i); // 0, 1, 2...
  }, 100);
}

// ✅ 解决方法2：使用立即执行函数
for (var i = 0; i < 10; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // 0, 1, 2...
    }, 100);
  })(i);
}
\`\`\`

### 2. 内存泄漏风险

\`\`\`javascript
// ❌ 可能导致内存泄漏
function badPractice() {
  const data = new Array(1000000).fill('*');
  return function() {
    return data.length;
  };
}

const leak = badPractice(); 
// data不会被GC回收，因为leak闭包引用了它

// ✅ 正确做法
function goodPractice() {
  let data = new Array(1000000).fill('*');
  const getLength = () => data.length;
  getLength.clear = () => {
    data = null; // 手动释放
  };
  return getLength;
}
\`\`\`

## 闭包的优缺点

### 优点
- 数据私有化，避免全局污染
- 数据持久化，维持状态
- 实现函数式编程风格

### 缺点
- 过度使用会导致内存泄漏
- 闭包会增加内存消耗
- 可能影响性能

## 面试回答技巧

回答闭包问题时，建议：
1. **先定义**：一句话说明什么是闭包
2. **给例子**：展示一个简单但清晰的例子
3. **讲原理**：词法作用域、作用域链
4. **说应用**：展示实际应用场景
5. **提注意点**：内存泄漏、变量问题

这样会让你的回答非常全面且有深度！
`,
    analysis:
      "闭包是JavaScript最核心的概念，也是面试必考题。理解闭包不仅需要理论，更需要实际应用经验。",
    difficulty: "hard",
    categoryId: 1,
    tags: ["闭包", "JavaScript", "高频面试"],
  },
  {
    title: "JavaScript的原型和原型链是什么？",
    content: "请详细解释原型、原型链的概念，以及在实际开发中的应用。",
    answer: `## 原型的基本概念

### 什么是原型？

在JavaScript中，每个函数都有一个特殊的属性叫**prototype**（函数原型），每个对象都有一个隐藏属性叫**__proto__**（对象原型）。

### 简单示例

\`\`\`javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(\`你好，我是\${this.name}\`);
};

const person1 = new Person('张三');
const person2 = new Person('李四');

person1.sayHello(); // "你好，我是张三"
person2.sayHello(); // "你好，我是李四"

// 注意：person1和person2共享同一个sayHello方法
\`\`\`

## 原型链的工作原理

### 原型链图解

\`\`\`
person1.__proto__ → Person.prototype
Person.prototype.__proto__ → Object.prototype
Object.prototype.__proto__ → null
\`\`\`

### 代码演示

\`\`\`javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  console.log(\`\${this.name}正在吃东西\`);
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// 原型链继承
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log('汪汪汪！');
};

const myDog = new Dog('旺财', '柴犬');
myDog.eat();  // "旺财正在吃东西"（来自Animal原型）
myDog.bark(); // "汪汪汪！"（来自Dog原型）
\`\`\`

## 原型和原型链的核心关系

### 三句话总结

1. **每个函数都有prototype属性**
2. **每个对象都有__proto__属性**
3. **对象的__proto__指向其构造函数的prototype**

### 代码验证

\`\`\`javascript
const obj = {};
console.log(obj.__proto__ === Object.prototype); // true

function Foo() {}
console.log(Foo.prototype.constructor === Foo); // true
console.log(new Foo().__proto__ === Foo.prototype); // true
\`\`\`

## 基于原型的继承模式

### 1. 原型链继承

\`\`\`javascript
function Parent() {
  this.name = 'Parent';
}

Parent.prototype.sayParent = function() {
  console.log('Parent method');
};

function Child() {}

Child.prototype = new Parent(); // 原型链继承

const child = new Child();
child.sayParent(); // "Parent method"
\`\`\`

### 2. 构造函数继承

\`\`\`javascript
function Parent() {
  this.name = 'Parent';
}

function Child() {
  Parent.call(this); // 借用构造函数
}

const child = new Child();
console.log(child.name); // "Parent"
\`\`\`

### 3. 组合继承

\`\`\`javascript
function Parent(name) {
  this.name = name;
}

Parent.prototype.say = function() {
  console.log('I am ' + this.name);
};

function Child(name, age) {
  Parent.call(this, name); // 构造函数继承属性
  this.age = age;
}

Child.prototype = Object.create(Parent.prototype); // 原型链继承方法
Child.prototype.constructor = Child;

const child = new Child('张三', 18);
\`\`\`

### 4. 寄生组合式继承（最推荐）

\`\`\`javascript
function inheritPrototype(child, parent) {
  const prototype = Object.create(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}

function Child() {
  Parent.call(this);
}

inheritPrototype(Child, Parent);
\`\`\`

## ES6 class的原型实现

\`\`\`javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  eat() {
    console.log(\`\${this.name} is eating\`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  bark() {
    console.log('Woof!');
  }
}

// 本质还是原型链，但语法更清晰
\`\`\`

## 实际开发中的原型应用

### 1. 扩展内置对象方法

\`\`\`javascript
// 给Array添加一个求和方法
Array.prototype.sum = function() {
  return this.reduce((a, b) => a + b, 0);
};

[1, 2, 3].sum(); // 6

// 注意：不要直接修改原生原型，可能会污染全局
\`\`\`

### 2. 实现工具函数库

\`\`\`javascript
function Utils() {}

Utils.prototype.formatDate = function(date) {
  return new Date(date).toLocaleDateString();
};

Utils.prototype.clone = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};

const utils = new Utils();
\`\`\`

## 常见面试题

### 题目1：检测某个属性是原型上的还是自身的？

\`\`\`javascript
const obj = { a: 1 };
Object.prototype.b = 2;

console.log(obj.a);        // 1
console.log(obj.hasOwnProperty('a')); // true
console.log(obj.hasOwnProperty('b')); // false
\`\`\`

### 题目2：如何获取一个对象的所有属性（包括原型链上的）？

\`\`\`javascript
function getAllProperties(obj) {
  const props = [];
  let current = obj;
  while (current) {
    for (let prop of Object.keys(current)) {
      if (!props.includes(prop)) {
        props.push(prop);
      }
    }
    current = Object.getPrototypeOf(current);
  }
  return props;
}
\`\`\`

### 题目3：实现instanceof？

\`\`\`javascript
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left);
  const prototype = right.prototype;
  
  while (true) {
    if (proto === null) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
\`\`\`

## 面试回答建议

1. **从基础讲起**：prototype和__proto__的区别
2. **画原型链图**：展示查找过程
3. **讲继承**：各种继承方式的优缺点
4. **举例子**：让问题更具体
5. **提ES6**：class语法糖的本质`,
    analysis:
      "原型和原型链是JavaScript的核心，也是面向对象编程的基础。面试时常问。",
    difficulty: "hard",
    categoryId: 1,
    tags: ["原型链", "JavaScript", "继承"],
  },
];

async function batchImport() {
  try {
    const created = await Question.bulkCreate(highQualityQuestions);
    console.log(`成功导入 ${created.length} 道高质量JavaScript面试题`);
    process.exit(0);
  } catch (error) {
    console.error("导入失败:", error);
    process.exit(1);
  }
}

batchImport();
