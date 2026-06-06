const sequelize = require("../config/database");
const Question = require("../models/question");

const securityDesignQuestions = [
  {
    title: "什么是XSS攻击？如何防范？",
    content: "请解释XSS攻击的原理和防范措施。",
    answer: `**XSS（跨站脚本攻击）：**
- 原理：攻击者在页面注入恶意脚本，用户打开时执行
- 分类：存储型、反射型、DOM型

**防范措施：**
1. 输出编码
2. CSP内容安全策略
3. HttpOnly防止Cookie被窃取
4. 输入验证过滤
5. 转义HTML特殊字符`,
    analysis: "XSS是常见的前端安全问题，必须掌握。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["XSS", "安全", "前端安全"],
  },
  {
    title: "什么是CSRF攻击？如何防范？",
    content: "请解释CSRF攻击的原理和防范措施。",
    answer: `**CSRF（跨站请求伪造）：**
- 原理：利用用户已登录的身份，伪造请求发送给服务器

**防范措施：**
1. Token验证
2. SameSite Cookie
3. 验证码
4. Referer校验`,
    analysis: "CSRF也是常见安全问题，需要理解防范措施。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["CSRF", "安全", "前端安全"],
  },
  {
    title: "什么是SQL注入？如何防范？",
    content: "请解释SQL注入的原理和防范措施。",
    answer: `**SQL注入：**
- 原理：在输入中注入SQL代码，被服务器执行

**防范措施：**
1. 预编译语句（PreparedStatement）
2. ORM框架
3. 输入验证和过滤
4. 最小权限原则`,
    analysis: "SQL注入是数据库安全问题，前后端都需要注意。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["SQL注入", "安全", "数据库"],
  },
  {
    title: "前端有哪些常见的安全问题？",
    content: "请列举前端常见的安全问题。",
    answer: `**常见安全问题：**
1. XSS
2. CSRF
3. SQL注入
4. 点击劫持
5. 中间人攻击
6. 文件上传漏洞
7. 本地存储安全
8. 权限控制

**安全最佳实践：**
- 使用HTTPS
- 验证输入输出
- 设置安全头
- 内容安全策略CSP`,
    analysis: "前端安全是重要话题，需要了解常见问题和防护。",
    difficulty: "easy",
    categoryId: 3,
    tags: ["安全", "前端安全", "最佳实践"],
  },
  {
    title: "什么是单例模式？如何实现？",
    content: "请解释单例模式的概念和JavaScript实现。",
    answer: `**单例模式：**
确保一个类只有一个实例

**实现：**
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
    analysis: "单例模式是常见的设计模式。",
    difficulty: "easy",
    categoryId: 3,
    tags: ["设计模式", "单例模式"],
  },
  {
    title: "什么是观察者模式？应用场景？",
    content: "请解释观察者模式的概念和应用。",
    answer: `**观察者模式：**
定义对象间的一对多依赖关系

\`\`\`javascript
class Subject {
  constructor() {
    this.observers = [];
  }
  add(observer) {
    this.observers.push(observer);
  }
  notify() {
    this.observers.forEach(ob => ob.update());
  }
}
\`\`\`

**应用：**
- 事件监听
- 状态变化通知
- MVVM框架响应式`,
    analysis: "观察者模式是常用模式，事件系统就是此模式。",
    difficulty: "medium",
    categoryId: 3,
    tags: ["设计模式", "观察者模式"],
  },
  {
    title: "什么是工厂模式？",
    content: "请解释工厂模式的概念和应用。",
    answer: `**工厂模式：**
封装创建对象的逻辑

\`\`\`javascript
function createUser(type) {
  switch(type) {
    case 'admin': return new Admin();
    case 'user': return new User();
  }
}
\`\`\``,
    analysis: "工厂模式也是常见的创建型模式。",
    difficulty: "easy",
    categoryId: 3,
    tags: ["设计模式", "工厂模式"],
  },
  {
    title: "请实现深拷贝？",
    content: "请写出深拷贝的实现方式。",
    answer: `**方法1：JSON.parse(JSON.stringify())**
\`\`\`javascript
const deepCopy = obj => JSON.parse(JSON.stringify(obj));
\`\`\`
*缺点：不能处理函数、正则、循环引用等*

**方法2：递归**
\`\`\`javascript
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (hash.has(obj)) return hash.get(obj);
  
  const copy = Array.isArray(obj) ? [] : {};
  hash.set(obj, copy);
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepClone(obj[key], hash);
    }
  }
  return copy;
}
\`\`\``,
    analysis: "深拷贝是常见手写题。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["深拷贝", "手写", "算法"],
  },
  {
    title: "请实现Promise？",
    content: "请手写一个简单的Promise实现。",
    answer: `**简单实现：**
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
      this.onFulfilled.forEach(cb => cb(this.value));
    };
    
    const reject = (reason) => {
      if (this.state !== 'pending') return;
      this.state = 'rejected';
      this.reason = reason;
      this.onRejected.forEach(cb => cb(this.reason));
    };
    
    try {
      fn(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  
  then(onFulfilled, onRejected) {
    if (this.state === 'fulfilled') onFulfilled(this.value);
    if (this.state === 'rejected') onRejected(this.reason);
    if (this.state === 'pending') {
      this.onFulfilled.push(onFulfilled);
      this.onRejected.push(onRejected);
    }
  }
}
\`\`\``,
    analysis: "手写Promise是高频面试题，考察对Promise的理解。",
    difficulty: "hard",
    categoryId: 8,
    tags: ["Promise", "手写", "异步"],
  },
  {
    title: "请实现instanceof？",
    content: "请手写instanceof的实现。",
    answer: `**实现：**
\`\`\`javascript
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
\`\`\``,
    analysis: "考察对原型链的理解。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["instanceof", "手写", "原型链"],
  },
  {
    title: "请实现new操作符？",
    content: "请手写new操作符的实现。",
    answer: `**实现：**
\`\`\`javascript
function myNew(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}
\`\`\``,
    analysis: "考察对new过程的理解。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["new", "手写", "构造函数"],
  },
  {
    title: "请实现函数柯里化？",
    content: "请写出柯里化函数的实现。",
    answer: `**实现：**
\`\`\`javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}
\`\`\``,
    analysis: "柯里化也是常用的面试手写题。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["柯里化", "手写", "函数"],
  },
  {
    title: "请实现数组flat？",
    content: "请手写数组flat方法的实现。",
    answer: `**实现：**
\`\`\`javascript
Array.prototype.myFlat = function(depth = 1) {
  if (depth <= 0) return this;
  return this.reduce((prev, curr) => {
    return prev.concat(
      Array.isArray(curr) ? curr.myFlat(depth - 1) : curr
    );
  }, []);
};
\`\`\``,
    analysis: "数组flat也是常见手写题。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["flat", "手写", "数组"],
  },
];

async function batchImport() {
  try {
    const created = await Question.bulkCreate(securityDesignQuestions);
    console.log(`成功导入 ${created.length} 道安全和设计模式面试题`);
    process.exit(0);
  } catch (error) {
    console.error("导入失败:", error);
    process.exit(1);
  }
}

batchImport();
