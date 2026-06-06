const sequelize = require("../config/database");
const Question = require("../models/question");

const algorithmHandwritingQuestions = [
  // 算法题
  {
    title: "请实现数组去重？",
    content: "请写出数组去重的多种实现方式。",
    answer: `**方法1：Set**
\`\`\`javascript
const unique = arr => [...new Set(arr)];
\`\`\`

**方法2：filter+indexOf**
\`\`\`javascript
const unique = arr => arr.filter((v, i) => arr.indexOf(v) === i);
\`\`\`

**方法3：reduce**
\`\`\`javascript
const unique = arr => arr.reduce((acc, cur) => {
  return acc.includes(cur) ? acc : [...acc, cur];
}, []);
\`\`\``,
    analysis: "基础算法题，考察数组API。",
    difficulty: "easy",
    categoryId: 8,
    tags: ["数组去重", "算法", "手写"],
  },
  {
    title: "请实现数组扁平化？",
    content: "请写出数组扁平化的实现。",
    answer: `**方法1：flat**
\`\`\`javascript
arr.flat(Infinity);
\`\`\`

**方法2：递归**
\`\`\`javascript
function flatten(arr) {
  let res = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      res = res.concat(flatten(item));
    } else {
      res.push(item);
    }
  }
  return res;
}
\`\`\``,
    analysis: "数组处理的经典问题。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["数组扁平化", "算法", "手写"],
  },
  {
    title: "请实现深拷贝？",
    content: "请写出深拷贝的实现。",
    answer: `**简单版：**
\`\`\`javascript
const deepClone = obj => JSON.parse(JSON.stringify(obj));
\`\`\`

**完整版：**
\`\`\`javascript
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (map.has(obj)) return map.get(obj);
  
  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], map);
    }
  }
  return clone;
}
\`\`\``,
    analysis: "经典面试题。",
    difficulty: "hard",
    categoryId: 8,
    tags: ["深拷贝", "算法", "手写"],
  },
  {
    title: "请实现防抖debounce？",
    content: "请写出防抖函数的实现。",
    answer: `**实现：**
\`\`\`javascript
function debounce(fn, delay = 300) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
\`\`\``,
    analysis: "性能优化常用函数。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["防抖", "debounce", "手写"],
  },
  {
    title: "请实现节流throttle？",
    content: "请写出节流函数的实现。",
    answer: `**实现：**
\`\`\`javascript
function throttle(fn, delay = 300) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= delay) {
      fn.apply(this, args);
      last = now;
    }
  };
}
\`\`\``,
    analysis: "性能优化常用函数。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["节流", "throttle", "手写"],
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
    analysis: "函数式编程的重要概念。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["柯里化", "curry", "手写"],
  },
  {
    title: "请实现bind方法？",
    content: "请手写Function.prototype.bind。",
    answer: `**实现：**
\`\`\`javascript
Function.prototype.myBind = function(context, ...args) {
  const fn = this;
  return function(...args2) {
    return fn.apply(context, [...args, ...args2]);
  };
};
\`\`\``,
    analysis: "考察对this和函数的理解。",
    difficulty: "hard",
    categoryId: 8,
    tags: ["bind", "手写", "原型"],
  },
  {
    title: "请实现Promise.all？",
    content: "请手写Promise.all的实现。",
    answer: `**实现：**
\`\`\`javascript
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    const res = [];
    let count = 0;
    
    promises.forEach((p, i) => {
      Promise.resolve(p).then(val => {
        res[i] = val;
        count++;
        if (count === promises.length) {
          resolve(res);
        }
      }).catch(reject);
    });
  });
};
\`\`\``,
    analysis: "Promise的高级用法。",
    difficulty: "hard",
    categoryId: 8,
    tags: ["Promise.all", "手写", "Promise"],
  },
  {
    title: "请实现instanceof？",
    content: "请手写instanceof的实现。",
    answer: `**实现：**
\`\`\`javascript
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left);
  while (proto) {
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
\`\`\``,
    analysis: "考察原型链的理解。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["instanceof", "原型链", "手写"],
  },
  {
    title: "请实现new操作符？",
    content: "请手写new的实现。",
    answer: `**实现：**
\`\`\`javascript
function myNew(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}
\`\`\``,
    analysis: "考察对new过程的理解。",
    difficulty: "hard",
    categoryId: 8,
    tags: ["new", "构造函数", "手写"],
  },
  {
    title: "请实现数组reduce方法？",
    content: "请手写Array.prototype.reduce。",
    answer: `**实现：**
\`\`\`javascript
Array.prototype.myReduce = function(callback, init) {
  let acc = init !== undefined ? init : this[0];
  let start = init !== undefined ? 0 : 1;
  
  for (let i = start; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }
  return acc;
};
\`\`\``,
    analysis: "数组方法的底层实现。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["reduce", "数组方法", "手写"],
  },
  {
    title: "请实现数组map方法？",
    content: "请手写Array.prototype.map。",
    answer: `**实现：**
\`\`\`javascript
Array.prototype.myMap = function(callback) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    res.push(callback(this[i], i, this));
  }
  return res;
};
\`\`\``,
    analysis: "数组方法的底层实现。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["map", "数组方法", "手写"],
  },
  {
    title: "请实现数组filter方法？",
    content: "请手写Array.prototype.filter。",
    answer: `**实现：**
\`\`\`javascript
Array.prototype.myFilter = function(callback) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      res.push(this[i]);
    }
  }
  return res;
};
\`\`\``,
    analysis: "数组方法的底层实现。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["filter", "数组方法", "手写"],
  },
  {
    title: "请实现冒泡排序？",
    content: "请手写冒泡排序的实现。",
    answer: `**实现：**
\`\`\`javascript
function bubbleSort(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  }
  return arr;
}
\`\`\``,
    analysis: "基础排序算法。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["冒泡排序", "排序", "算法"],
  },
  {
    title: "请实现快速排序？",
    content: "请手写快速排序的实现。",
    answer: `**实现：**
\`\`\`javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = [];
  const right = [];
  
  for (let i = 1; i < arr.length; i++) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}
\`\`\``,
    analysis: "最重要的排序算法。",
    difficulty: "hard",
    categoryId: 8,
    tags: ["快速排序", "排序", "算法"],
  },
  {
    title: "请实现二分查找？",
    content: "请手写二分查找的实现。",
    answer: `**实现：**
\`\`\`javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}
\`\`\``,
    analysis: "经典查找算法。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["二分查找", "查找", "算法"],
  },
  {
    title: "请实现字符串反转？",
    content: "请写出字符串反转的多种实现。",
    answer: `**方法1：**
\`\`\`javascript
const reverse = str => str.split('').reverse().join('');
\`\`\`

**方法2：**
\`\`\`javascript
function reverse(str) {
  let res = '';
  for (let char of str) {
    res = char + res;
  }
  return res;
}
\`\`\``,
    analysis: "基础字符串处理。",
    difficulty: "easy",
    categoryId: 8,
    tags: ["字符串反转", "字符串", "算法"],
  },
  {
    title: "请实现两数之和？",
    content: "请写出两数之和的实现。",
    answer: `**哈希表版：**
\`\`\`javascript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
\`\`\``,
    analysis: "LeetCode第一题。",
    difficulty: "easy",
    categoryId: 8,
    tags: ["两数之和", "LeetCode", "算法"],
  },
  {
    title: "请实现无重复字符的最长子串？",
    content: "请写出最长无重复子串的实现。",
    answer: `**滑动窗口：**
\`\`\`javascript
function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0;
  let max = 0;
  
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      left = Math.max(map.get(s[right]) + 1, left);
    }
    map.set(s[right], right);
    max = Math.max(max, right - left + 1);
  }
  return max;
}
\`\`\``,
    analysis: "滑动窗口经典题。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["最长子串", "滑动窗口", "算法"],
  },
  // 浏览器原理补充
  {
    title: "什么是浏览器的渲染过程？",
    content: "请解释从HTML到页面显示的过程。",
    answer: `**渲染过程：**
1. 解析HTML，构建DOM树
2. 解析CSS，构建CSSOM树
3. 合并DOM和CSSOM，构建渲染树
4. 布局Layout：计算位置大小
5. 绘制Paint：渲染像素
6. 合成Composite：合并图层`,
    analysis: "理解浏览器工作原理。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["渲染过程", "浏览器", "DOM"],
  },
  {
    title: "什么是重排和重绘？",
    content: "请解释reflow和repaint。",
    answer: `**重排：**
几何属性变化，重新计算布局

**重绘：**
外观变化，不影响布局，重新绘制

**优化：**
- 使用transform
- 批量更新
- 使用DocumentFragment
- 避免频繁读取布局属性`,
    analysis: "性能优化的重要方面。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["重排", "重绘", "性能优化"],
  },
  {
    title: "什么是浏览器的垃圾回收？",
    content: "请解释垃圾回收的机制。",
    answer: `**垃圾回收：**
回收不再使用的内存

**算法：**
- 标记清除
- 引用计数

**现代浏览器：**
- 分代收集
- 新生代（存活短）
- 老生代（存活长）`,
    analysis: "前端进阶知识。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["垃圾回收", "内存", "浏览器"],
  },
  {
    title: "什么是Service Worker？",
    content: "请解释Service Worker的概念。",
    answer: `**Service Worker：**
独立于网页的脚本

**能力：**
- 缓存资源
- 离线可用
- 推送通知
- 后台同步

**生命周期：**
- install
- activate
- fetch`,
    analysis: "PWA的核心技术。",
    difficulty: "hard",
    categoryId: 5,
    tags: ["Service Worker", "PWA", "缓存"],
  },
  {
    title: "什么是Web Worker？",
    content: "请解释Web Worker的作用。",
    answer: `**Web Worker：**
后台线程运行JS，不阻塞主线程

**用途：**
- 大量计算
- 复杂操作
- 不影响UI响应

**限制：**
- 不能操作DOM
- 通过postMessage通信`,
    analysis: "性能优化的重要手段。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["Web Worker", "多线程", "性能"],
  },
  {
    title: "什么是浏览器的同源策略？",
    content: "请解释同源策略的概念。",
    answer: `**同源：**
协议、域名、端口相同

**跨域解决方案：**
- CORS
- JSONP
- 代理
- postMessage
- WebSocket`,
    analysis: "前端网络基础。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["同源策略", "跨域", "浏览器"],
  },
];

async function batchImport() {
  try {
    const created = await Question.bulkCreate(algorithmHandwritingQuestions);
    console.log(`成功导入 ${created.length} 道算法和手写题`);
    process.exit(0);
  } catch (error) {
    console.error("导入失败:", error);
    process.exit(1);
  }
}

batchImport();
