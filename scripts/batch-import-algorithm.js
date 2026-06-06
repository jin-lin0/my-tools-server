const sequelize = require("../config/database");
const Question = require("../models/question");

const algorithmQuestions = [
  {
    title: "什么是时间复杂度和空间复杂度？",
    content: "请解释算法复杂度的概念和常见复杂度。",
    answer: `**时间复杂度：**
表示程序执行时间随数据规模增长的趋势
- O(1)：常数时间
- O(n)：线性时间
- O(n²)：平方时间
- O(log n)：对数时间
- O(n log n)：线性对数时间

**空间复杂度：**
表示程序执行所需的额外空间

**排序算法复杂度：**
| 算法 | 时间(平均) | 空间 | 稳定性 |
|------|----------|------|------ |
| 冒泡 | O(n²) | O(1) | |
| 选择 | O(n²) | O(1) | |
| 插入 | O(n²) | O(1) | |
| 快速 | O(n log n) | O(log n) | | |
| 归并 | O(n log n) | O(n) | | |
| 堆排序 | O(n log n) | O(1) | | |
| 计数 | O(n+k) | O(k) | |
| 桶排序 | O(n+k) | O(n+k) | |
| 基数 | O(n*k) | O(n+k) | |`,
    analysis: "算法复杂度是算法分析的基础。",
    difficulty: "easy",
    categoryId: 8,
    tags: ["复杂度", "算法", "基础"],
  },
  {
    title: "常见排序算法有哪些？请描述实现思路？",
    content: "请列举常见排序算法及其实现思路。",
    answer: `**冒泡排序：**
两两交换，大的往后跑
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
\`\`\`

**选择排序：**
每次找最小的，放到前面
\`\`\`javascript
function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}
\`\`\`

**快速排序：**
选基准，小放左，大放右，递归处理
\`\`\`javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let pivot = arr[0];
  let left = arr.slice(1).filter(x => x <= pivot);
  let right = arr.slice(1).filter(x => x > pivot);
  return quickSort(left).concat([pivot], quickSort(right));
}
\`\`\`

**归并排序：**
分两半，分别排序，最后合并
\`\`\`javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
function merge(a, b) {
  const res = [];
  while (a.length && b.length) {
    res.push(a[0] < b[0] ? a.shift() : b.shift());
  }
  return res.concat(a, b);
}
\`\`\``,
    analysis: "排序算法是基础，需要掌握快排、归并等。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["排序", "算法", "冒泡", "快排"],
  },
  {
    title: "请实现数组去重？",
    content: "请写出几种数组去重的实现方式。",
    answer: `**方法1：Set（ES6）**
\`\`\`javascript
const unique = arr => [...new Set(arr)];
\`\`\`

**方法2：filter**
\`\`\`javascript
const unique = arr => arr.filter((v, i) => arr.indexOf(v) === i);
\`\`\`

**方法3：Map**
\`\`\`javascript
const unique = arr => {
  const map = new Map();
  return arr.filter(v => !map.has(v) && map.set(v, true));
};
\`\`\`

**方法4：双层循环**
\`\`\`javascript
const unique = arr => {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (!res.includes(arr[i])) res.push(arr[i]);
  }
  return res;
};
\`\`\``,
    analysis: "数组去重是常见笔试题，考察对API的熟悉度。",
    difficulty: "easy",
    categoryId: 8,
    tags: ["数组", "去重", "算法"],
  },
  {
    title: "请实现数组扁平化？",
    content: "请写出几种数组扁平化的实现方式。",
    answer: `**方法1：flat（ES10）**
\`\`\`javascript
arr.flat(Infinity);
\`\`\`

**方法2：递归**
\`\`\`javascript
const flatten = arr => {
  const res = [];
  arr.forEach(v => {
    if (Array.isArray(v)) {
      res.push(...flatten(v));
    } else {
      res.push(v);
    }
  });
  return res;
};
\`\`\`

**方法3：reduce**
\`\`\`javascript
const flatten = arr => arr.reduce(
  (prev, curr) => prev.concat(Array.isArray(curr) ? flatten(curr) : curr),
  []
);
\`\`\`

**方法4：while+some**
\`\`\`javascript
const flatten = arr => {
  while (arr.some(v => Array.isArray(v))) {
    arr = [].concat(...arr);
  }
  return arr;
};
\`\`\``,
    analysis: "数组扁平化也是常见笔试题。",
    difficulty: "easy",
    categoryId: 8,
    tags: ["数组", "扁平化", "算法"],
  },
  {
    title: "什么是防抖和节流？如何实现？",
    content: "请解释防抖节流的概念和实现。",
    answer: `**防抖：**
触发后延迟执行，期间再触发则重置定时器
\`\`\`javascript
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
\`\`\`

**节流：**
一定时间内只执行一次
\`\`\`javascript
function throttle(fn, delay) {
  let canRun = true;
  return function(...args) {
    if (!canRun) return;
    canRun = false;
    fn.apply(this, args);
    setTimeout(() => canRun = true, delay);
  };
}
\`\`\`

**使用场景：**
- 防抖：输入框搜索
- 节流：滚动事件`,
    analysis: "防抖节流是性能优化的常用方法。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["防抖", "节流", "性能优化"],
  },
];

async function batchImport() {
  try {
    const created = await Question.bulkCreate(algorithmQuestions);
    console.log(`成功导入 ${created.length} 道算法面试题`);
    process.exit(0);
  } catch (error) {
    console.error("导入失败:", error);
    process.exit(1);
  }
}

batchImport();
