const sequelize = require("../config/database");
const Question = require("../models/question");

const moreQuestions = [
  // React面试题
  {
    title: "什么是React？React有什么优势？",
    content: "请解释React的概念、核心特性和优势。",
    answer: `**React是什么：**
React是Facebook开发的JavaScript库，用于构建用户界面，特别是单页应用（SPA）。

**核心特性：**
1. **组件化** - UI拆分为独立、可复用的组件
2. **虚拟DOM** - 高效的DOM更新机制
3. **单向数据流** - 数据从父组件流向子组件
4. **JSX语法** - JavaScript和HTML的混合语法
5. **声明式编程** - 描述UI应该是什么样子

**优势：**
- 高效的性能（虚拟DOM diff算法）
- 组件复用性强
- 生态系统丰富
- 社区活跃
- React Native可开发移动应用

**基本示例：**
\`\`\`jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Tom" />
      <Welcome name="Jerry" />
    </div>
  );
}
\`\`\`

**与其他框架对比：**
- React：灵活、JSX、单向数据流
- Vue：易学、模板语法、双向绑定
- Angular：完整方案、TypeScript、强类型`,
    analysis: "React是目前最流行的前端框架之一，需要理解其核心概念和优势。",
    difficulty: "easy",
    categoryId: 4,
    tags: ["React", "基础", "核心概念"],
  },
  {
    title: "React Hooks是什么？常用Hooks有哪些？",
    content: "请解释React Hooks的概念、使用规则以及常用Hooks。",
    answer: `**React Hooks是什么：**
Hooks是React 16.8引入的特性，让函数组件可以使用状态和其他React特性。

**使用规则：**
1. 只在函数组件或自定义Hook中调用
2. 只在顶层调用，不能在循环、条件或嵌套函数中调用

**常用Hooks：**

**1. useState - 状态管理**
\`\`\`jsx
const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: '', age: 0 });
\`\`\`

**2. useEffect - 副作用处理**
\`\`\`jsx
useEffect(() => {
  // 组件挂载后执行
  fetchData();
  
  return () => {
    // 清理函数，组件卸载前执行
    cleanup();
  };
}, [deps]); // 依赖数组
\`\`\`

**3. useContext - 上下文**
\`\`\`jsx
const theme = useContext(ThemeContext);
\`\`\`

**4. useReducer - 复杂状态逻辑**
\`\`\`jsx
const [state, dispatch] = useReducer(reducer, initialState);
\`\`\`

**5. useMemo - 性能优化**
\`\`\`jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
\`\`\`

**6. useCallback - 缓存函数**
\`\`\`jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
\`\`\`

**7. useRef - 引用DOM或保存值**
\`\`\`jsx
const inputRef = useRef(null);
inputRef.current.focus();
\`\`\`

**自定义Hook：**
\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}
\`\`\``,
    analysis: "Hooks是现代React开发的核心，需要熟练掌握各种Hooks的使用场景。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["Hooks", "useState", "useEffect"],
  },
  {
    title: "什么是虚拟DOM？React的Diff算法是如何工作的？",
    content: "请解释虚拟DOM的概念以及React的Diff算法原理。",
    answer: `**虚拟DOM是什么：**
虚拟DOM是真实DOM的JavaScript对象表示，用于提高性能。

\`\`\`javascript
// 虚拟DOM对象示例
const vdom = {
  type: 'div',
  props: { className: 'container' },
  children: [
    { type: 'h1', props: {}, children: ['Hello'] }
  ]
};
\`\`\`

**工作流程：**
1. 状态更新时，创建新的虚拟DOM树
2. 比较新旧虚拟DOM树（Diff算法）
3. 计算最小更新操作
4. 批量更新真实DOM

**Diff算法策略：**

**1. 同层比较：**
只比较同一层级的节点，不跨层比较。

**2. 类型比较：**
- 类型不同：整个组件重建
- 类型相同：更新属性和子节点

**3. Key的作用：**
通过key标识节点，提高列表diff效率。

\`\`\`jsx
// 不推荐：使用index作为key
{items.map((item, index) => (
  <li key={index}>{item}</li>
))}

// 推荐：使用唯一id作为key
{items.map(item => (
  <li key={item.id}>{item}</li>
))}
\`\`\`

**React 18优化：**
- 自动批处理更新
- 并发渲染
- Suspense改进

**性能优化建议：**
- 使用React.memo缓存组件
- 使用useMemo缓存计算结果
- 使用useCallback缓存函数
- 避免不必要的重新渲染`,
    analysis: "虚拟DOM是React性能优化的基础，理解Diff算法对于性能优化非常重要。",
    difficulty: "hard",
    categoryId: 4,
    tags: ["虚拟DOM", "Diff算法", "性能优化"],
  },

  // TypeScript面试题
  {
    title: "TypeScript中的泛型是什么？如何使用？",
    content: "请解释TypeScript泛型的概念、使用场景和常见用法。",
    answer: `**泛型是什么：**
泛型允许创建可复用的组件，支持多种类型而不仅仅是单一类型。

**基本语法：**
\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

// 使用
const num = identity<number>(123);
const str = identity<string>('hello');
// 类型推断
const auto = identity(123); // 自动推断为number
\`\`\`

**泛型接口：**
\`\`\`typescript
interface GenericIdentity<T> {
  (arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

const myIdentity: GenericIdentity<number> = identity;
\`\`\`

**泛型类：**
\`\`\`typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

const myGeneric = new GenericNumber<number>();
myGeneric.zeroValue = 0;
myGeneric.add = (x, y) => x + y;
\`\`\`

**泛型约束：**
\`\`\`typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// 正确
loggingIdentity('hello');
loggingIdentity([1, 2, 3]);

// 错误：number没有length属性
loggingIdentity(3);
\`\`\`

**常用工具类型：**
\`\`\`typescript
// Partial - 所有属性变为可选
type Partial<T> = { [P in keyof T]?: T[P] };

// Required - 所有属性变为必选
type Required<T> = { [P in keyof T]-?: T[P] };

// Pick - 选取部分属性
type Pick<T, K extends keyof T> = { [P in K]: T[P] };

// Omit - 排除部分属性
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
\`\`\``,
    analysis: "泛型是TypeScript的核心特性，掌握泛型对于编写可复用的类型安全代码非常重要。",
    difficulty: "medium",
    categoryId: 6,
    tags: ["泛型", "TypeScript", "类型系统"],
  },
  {
    title: "TypeScript中的interface和type有什么区别？",
    content: "请解释TypeScript中interface和type的区别和使用场景。",
    answer: `**主要区别：**

**1. 定义方式：**
\`\`\`typescript
// interface - 接口
interface User {
  name: string;
  age: number;
}

// type - 类型别名
type User = {
  name: string;
  age: number;
};
\`\`\`

**2. 扩展方式：**
\`\`\`typescript
// interface - 使用extends继承
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}

// type - 使用交叉类型
type Animal = { name: string };
type Dog = Animal & { breed: string };
\`\`\`

**3. 合并声明：**
\`\`\`typescript
// interface - 同名自动合并
interface Box {
  height: number;
}
interface Box {
  width: number;
}
// Box现在有height和width两个属性

// type - 不能重复定义
type Box = { height: number };
type Box = { width: number }; // 错误
\`\`\`

**4. 联合类型：**
\`\`\`typescript
// type可以定义联合类型
type ID = string | number;

// interface不能直接定义联合类型
\`\`\`

**5. 原始类型：**
\`\`\`typescript
// type可以定义原始类型别名
type Name = string;

// interface不能
\`\`\`

**使用建议：**
- 优先使用interface定义对象结构
- 使用type定义联合类型、元组、原始类型别名
- 需要合并声明时使用interface
- 需要使用交叉类型时使用type

**React组件Props示例：**
\`\`\`typescript
// 推荐使用interface
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, size = 'md', onClick, children }) => {
  return <button className={\`btn btn-\${variant} btn-\${size}\`} onClick={onClick}>{children}</button>;
};
\`\`\``,
    analysis: "interface和type的区别是TypeScript面试的高频考点，需要理解它们的使用场景。",
    difficulty: "medium",
    categoryId: 6,
    tags: ["interface", "type", "TypeScript"],
  },

  // 算法与数据结构
  {
    title: "请手写实现快速排序（Quick Sort）",
    content: "请手写实现快速排序算法，并解释其原理和时间复杂度。",
    answer: `**快速排序原理：**
1. 选择一个基准元素（pivot）
2. 将数组分为两部分：小于基准的和大于基准的
3. 递归地对两部分进行快速排序

**时间复杂度：**
- 平均：O(n log n)
- 最坏：O(n²)（已排序数组）
- 空间复杂度：O(log n)

**实现方式1：简洁版**
\`\`\`javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}
\`\`\`

**实现方式2：原地排序版**
\`\`\`javascript
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left - 1;
  
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}
\`\`\`

**使用示例：**
\`\`\`javascript
const arr = [3, 6, 8, 10, 1, 2, 1];
console.log(quickSort(arr)); // [1, 1, 2, 3, 6, 8, 10]
\`\`\`

**特点：**
- 不稳定排序
- 原地排序（优化版）
- 分治思想的典型应用`,
    analysis: "快速排序是经典的排序算法，需要理解其分治思想和实现方式。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["排序", "算法", "快速排序"],
  },
  {
    title: "请手写实现防抖函数（Debounce）",
    content: "请手写实现防抖函数，并解释其原理和应用场景。",
    answer: `**防抖原理：**
在事件触发n秒后才执行回调，如果在n秒内再次触发，则重新计时。

**应用场景：**
- 搜索框输入联想
- 窗口resize
- 按钮提交（防止重复点击）

**基础实现：**
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

**支持立即执行版本：**
\`\`\`javascript
function debounce(fn, delay, immediate = false) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    
    if (immediate && !timer) {
      fn.apply(this, args);
    }
    
    timer = setTimeout(() => {
      if (!immediate) {
        fn.apply(this, args);
      }
      timer = null;
    }, delay);
  };
}
\`\`\`

**TypeScript版本：**
\`\`\`typescript
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    
    if (immediate && !timer) {
      fn.apply(this, args);
    }
    
    timer = setTimeout(() => {
      if (!immediate) {
        fn.apply(this, args);
      }
      timer = null;
    }, delay);
  };
}
\`\`\`

**使用示例：**
\`\`\`javascript
// 搜索框输入
const searchInput = document.getElementById('search');
const handleSearch = debounce((value) => {
  console.log('搜索:', value);
  fetchResults(value);
}, 300);

searchInput.addEventListener('input', (e) => {
  handleSearch(e.target.value);
});

// 按钮点击（立即执行）
const handleClick = debounce(() => {
  console.log('提交表单');
}, 1000, true);
\`\`\`

**与节流的区别：**
- 防抖：等待一段时间后执行，重新触发则重新计时
- 节流：每隔一段时间执行一次`,
    analysis: "防抖是性能优化的重要手段，也是手写题的高频考点。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["防抖", "手写", "性能优化"],
  },
  {
    title: "请手写实现Promise",
    content: "请手写实现一个简化版的Promise，支持then、catch和finally。",
    answer: `**Promise核心概念：**
1. 三种状态：pending、fulfilled、rejected
2. 状态只能从pending变为fulfilled或rejected
3. 支持链式调用

**简化版实现：**
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
    
    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.value = reason;
        this.callbacks.forEach(cb => cb.onRejected(reason));
      }
    };
    
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
    
    const promise2 = new MyPromise((resolve, reject) => {
      const handle = (callback, value) => {
        try {
          const result = callback(value);
          if (result === promise2) {
            throw new Error('Chaining cycle detected');
          }
          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      };
      
      if (this.state === 'fulfilled') {
        setTimeout(() => handle(onFulfilled, this.value), 0);
      } else if (this.state === 'rejected') {
        setTimeout(() => handle(onRejected, this.value), 0);
      } else {
        this.callbacks.push({
          onFulfilled: value => setTimeout(() => handle(onFulfilled, value), 0),
          onRejected: reason => setTimeout(() => handle(onRejected, reason), 0)
        });
      }
    });
    
    return promise2;
  }
  
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  
  finally(callback) {
    return this.then(
      value => MyPromise.resolve(callback()).then(() => value),
      reason => MyPromise.resolve(callback()).then(() => { throw reason })
    );
  }
  
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
  }
  
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
  
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = [];
      let count = 0;
      
      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          value => {
            results[index] = value;
            count++;
            if (count === promises.length) resolve(results);
          },
          reject
        );
      });
    });
  }
}
\`\`\`

**使用示例：**
\`\`\`javascript
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('success'), 1000);
});

p.then(value => {
  console.log(value); // 'success'
  return 'next';
}).then(value => {
  console.log(value); // 'next'
});
\`\`\``,
    analysis: "手写Promise是高级面试题，需要深入理解Promise的工作原理。",
    difficulty: "hard",
    categoryId: 8,
    tags: ["Promise", "手写", "异步"],
  },
  {
    title: "什么是深拷贝？如何实现深拷贝？",
    content: "请解释深拷贝和浅拷贝的区别，并手写实现深拷贝函数。",
    answer: `**浅拷贝：**
只复制第一层，嵌套对象仍然是引用。

\`\`\`javascript
const obj = { a: 1, b: { c: 2 } };
const shallow = { ...obj };
shallow.b.c = 3;
console.log(obj.b.c); // 3，原对象被修改
\`\`\`

**深拷贝：**
递归复制所有层级，完全独立。

**实现方式1：JSON.parse/stringify**
\`\`\`javascript
const deep = JSON.parse(JSON.stringify(obj));
\`\`\`
限制：不能处理undefined、函数、Symbol、循环引用

**实现方式2：递归实现**
\`\`\`javascript
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  
  // 处理循环引用
  if (map.has(obj)) return map.get(obj);
  
  // 处理特殊对象
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  
  // 创建新对象
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

**使用示例：**
\`\`\`javascript
const original = {
  name: 'Tom',
  address: { city: 'Beijing' },
  hobbies: ['reading', 'coding'],
  date: new Date(),
  fn: () => console.log('hello')
};

const cloned = deepClone(original);
cloned.address.city = 'Shanghai';
console.log(original.address.city); // 'Beijing'，原对象不受影响
\`\`\`

**structuredClone（新API）：**
\`\`\`javascript
const cloned = structuredClone(original);
// 支持循环引用，但不支持函数
\`\`\``,
    analysis: "深拷贝是手写题的高频考点，需要处理各种边界情况。",
    difficulty: "medium",
    categoryId: 8,
    tags: ["深拷贝", "手写", "对象"],
  },
];

async function addMoreQuestions() {
  try {
    const created = await Question.bulkCreate(moreQuestions);
    console.log(`成功添加 ${created.length} 道题目`);
    process.exit(0);
  } catch (error) {
    console.error("添加失败:", error);
    process.exit(1);
  }
}

addMoreQuestions();