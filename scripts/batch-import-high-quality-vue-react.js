const sequelize = require("../config/database");
const Question = require("../models/question");

const highQualityVueReactQuestions = [
  {
    title: "Vue的响应式原理是什么？Vue2和Vue3有什么区别？",
    content: "请详细解释Vue的响应式系统原理，以及Vue2和Vue3实现方式的对比。",
    answer: `## Vue2的响应式原理

### 核心实现：Object.defineProperty

\`\`\`javascript
// Vue2响应式简化实现
function defineReactive(obj, key, val) {
  const dep = new Dep(); // 依赖收集器
  
  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.depend(); // 收集依赖
      }
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      val = newVal;
      dep.notify(); // 触发更新
    }
  });
}

// Dep类（依赖收集）
class Dep {
  constructor() {
    this.subscribers = [];
  }
  
  depend() {
    if (Dep.target) {
      this.subscribers.push(Dep.target);
    }
  }
  
  notify() {
    this.subscribers.forEach(watcher => watcher.update());
  }
}

// Watcher类（订阅者）
class Watcher {
  constructor(updateFn) {
    this.updateFn = updateFn;
    Dep.target = this;
    updateFn(); // 触发依赖收集
    Dep.target = null;
  }
  
  update() {
    this.updateFn();
  }
}

// 示例使用
const data = { count: 0 };
defineReactive(data, 'count', 0);

new Watcher(() => {
  console.log('count变为了：', data.count);
});

data.count++; // 输出 "count变为了：1"
\`\`\`

### Vue2的局限性

1. **无法监听新增属性**：
\`\`\`javascript
const obj = { a: 1 };
Vue.set(obj, 'b', 2); // 需要用Vue.set
\`\`\`

2. **无法监听属性删除**：
\`\`\`javascript
Vue.delete(obj, 'a');
\`\`\`

3. **数组监听有限**：只能监听通过7个变异方法的修改：
\`\`\`javascript
// push, pop, shift, unshift, splice, sort, reverse
const arr = [1, 2, 3];
arr[0] = 0; // ❌ 不会响应
arr.push(4); // ✅ 会响应
\`\`\`

## Vue3的响应式原理

### 核心实现：Proxy

\`\`\`javascript
// Vue3响应式简化实现
function reactive(obj) {
  const depsMap = new Map(); // 存储每个属性的依赖
  
  const proxy = new Proxy(obj, {
    get(target, key, receiver) {
      // 收集依赖
      track(target, key, depsMap);
      return Reflect.get(target, key, receiver);
    },
    
    set(target, key, value, receiver) {
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);
      if (oldValue !== value) {
        // 触发更新
        trigger(target, key, depsMap);
      }
      return result;
    },
    
    deleteProperty(target, key) {
      const hadKey = Object.prototype.hasOwnProperty.call(target, key);
      const result = Reflect.deleteProperty(target, key);
      if (hadKey) {
        trigger(target, key, depsMap);
      }
      return result;
    }
  });
  
  return proxy;
}

function track(target, key, depsMap) {
  if (!activeEffect) return;
  
  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set();
    depsMap.set(key, deps);
  }
  
  deps.add(activeEffect);
}

function trigger(target, key, depsMap) {
  const deps = depsMap.get(key);
  if (deps) {
    deps.forEach(effect => effect());
  }
}

// 使用示例
let activeEffect = null;

function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

const data = reactive({ count: 0 });

effect(() => {
  console.log('count变为了：', data.count);
});

data.count++; // 输出 "count变为了：1"
data.newProp = 10; // ✅ Proxy可以监听新增属性
\`\`\`

### Vue3的优势

| 特性 | Vue2 | Vue3 |
|------|------|------|
| **监听方式** | Object.defineProperty | Proxy |
| **新增属性** | ❌ 不支持，需Vue.set | ✅ 原生支持 |
| **删除属性** | ❌ 不支持，需Vue.delete | ✅ 原生支持 |
| **数组索引** | ❌ 不支持 | ✅ 原生支持 |
| **Map/Set** | ❌ 不支持 | ✅ 原生支持 |
| **性能** | 初始化时递归整个对象 | 懒加载，访问时才代理 |
| **内存** | 更高 | 更低 |

## 完整的响应式流程

### Vue2的响应式流程

1. **初始化阶段**：\`new Vue()\` → 初始化data → \`Observer\`递归处理
2. **依赖收集阶段**：首次渲染 → 访问数据 → \`getter\`收集依赖
3. **通知更新阶段**：修改数据 → \`setter\` → \`Dep.notify\` → \`Watcher.update\` → 重新渲染

### Vue3的响应式流程

1. **Proxy代理**：返回Proxy对象
2. **track追踪**：访问数据时收集依赖
3. **trigger触发**：修改数据时通知更新
4. **effect执行**：更新UI

## Composition API的响应式API

\`\`\`javascript
import { ref, reactive, computed, watch } from 'vue';

// ref - 基本类型
const count = ref(0);
console.log(count.value); // 0
count.value++;

// reactive - 对象类型
const state = reactive({ name: 'Vue3', version: 3 });

// computed - 计算属性
const doubleCount = computed(() => count.value * 2);

// watch - 监听
watch(count, (newVal, oldVal) => {
  console.log(\`count从\${oldVal}变为\${newVal}\`);
});
\`\`\`

## 实际开发中的最佳实践

### 1. 合理使用ref和reactive

\`\`\`javascript
// ✅ 推荐写法
const count = ref(0);
const form = reactive({ name: '', email: '' });

// ❌ 避免写法
const count = reactive(0); // 没必要，直接用ref
\`\`\`

### 2. 避免直接解构reactive对象

\`\`\`javascript
const state = reactive({ a: 1, b: 2 });

// ❌ 会丢失响应性
const { a, b } = state;

// ✅ 用toRefs保持响应性
const { a, b } = toRefs(state);
\`\`\`

### 3. shallowReactive和shallowRef用于优化

\`\`\`javascript
// 大型对象，只需要顶层响应式
const bigData = shallowReactive({
  list: []
});
\`\`\`

## 面试回答思路

1. **先讲Vue2**：Object.defineProperty的实现，以及它的问题
2. **再讲Vue3**：Proxy的实现和优势
3. **对比**：对比两者的差异
4. **举例子**：最好能手写简化版
5. **扩展**：提一下Composition API的响应式函数

这样回答会非常全面！
`,
    analysis: "响应式原理是Vue面试的重中之重，必须理解其实现原理和两者的区别。",
    difficulty: "hard",
    categoryId: 2,
    tags: ["Vue响应式", "Proxy", "Vue3", "核心原理"],
  },
  {
    title: "React的diff算法是什么？有什么优化？",
    content:
      "请详细解释React的虚拟DOM和diff算法的工作原理，以及React16/17/18的优化。",
    answer: `## 虚拟DOM基础

### 什么是虚拟DOM？

虚拟DOM是用JavaScript对象表示真实DOM的结构：

\`\`\`javascript
// 真实DOM
<div class="container">
  <h1>Hello</h1>
</div>

// 虚拟DOM（ReactElement）
{
  type: 'div',
  props: { className: 'container' },
  children: [
    { type: 'h1', props: {}, children: 'Hello' }
  ]
}
\`\`\`

### 为什么需要虚拟DOM？

1. **性能优化**：批量更新，减少DOM操作
2. **跨平台**：React Native、服务器渲染等
3. **声明式UI**：更易理解和维护

## Diff算法核心

### React的三个核心策略

#### 1. 只比较同层节点

\`\`\`
旧DOM树：             新DOM树：
       A                   A
      / \\                 / \\
     B   D               B   E
    /                   / \\
   C                   C   F
   
只会比较：A→A, B→B, (原D和新E)
不会把B和E比较（不是同层）
\`\`\`

#### 2. 类型不同直接替换

\`\`\`javascript
// 旧：<div>hello</div>
// 新：<span>hello</span>
// 结果：直接销毁div，创建span，不会复用
\`\`\`

#### 3. key优化列表渲染

\`\`\`javascript
// ❌ 不要用index作为key（顺序变化时会有问题）
{items.map((item, index) => (
  <div key={index}>{item}</div>
))}

// ✅ 用唯一id作为key
{items.map(item => (
  <div key={item.id}>{item}</div>
))}
\`\`\`

## React16+的Fiber架构

### 旧Stack Reconciler的问题

1. **同步不可中断**：更新任务很耗时
2. **无法优先处理重要更新**：用户点击、动画等

### Fiber架构解决的问题

\`\`\`
React 16之前的更新：
[──────────────────────] 同步更新，无法中断

React 16+的更新：
[──────┐  ┌──────┐  ┌──────]
       └──┘      └──┘       分片更新，可以中断
\`\`\`

### Fiber的工作原理

1. **Scheduler调度**：给任务分优先级
2. **Reconciler协调**：找出变化
3. **Renderer渲染**：操作DOM

### 优先级系统

\`\`\`
高优先级：用户输入、动画
中优先级：更新、数据加载
低优先级：后台任务

React可以先处理高优先级任务！
\`\`\`

## 双缓冲机制（Double Buffering）

React维护两棵树：

\`\`\`
current树：当前屏幕上显示的树
workInProgress树：正在构建的树

当构建完成后，直接交换！
\`\`\`

## Diff算法的具体过程

### 1. 单节点比较

\`\`\`javascript
function reconcileSingleElement(oldFiber, element) {
  // 相同类型，复用
  if (oldFiber.type === element.type) {
    const existing = useFiber(oldFiber, element.props);
    return existing;
  }
  // 不同类型，创建新的
  const newFiber = createFiber(element);
  return newFiber;
}
\`\`\`

### 2. 多节点比较（最复杂的部分）

React16的多节点diff经过了优化：

\`\`\`javascript
// 简化的多节点diff逻辑
function reconcileChildren(oldFiber, children) {
  let oldChild = oldFiber.child;
  let newIndex = 0;
  let lastPlacedIndex = 0;
  
  // 第一轮遍历：找相同key的连续节点
  while (oldChild && newIndex < children.length) {
    if (oldChild.key === children[newIndex].key) {
      // 相同key，复用节点
      const newFiber = useFiber(oldChild, children[newIndex].props);
      newFiber.index = newIndex;
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex);
      oldChild = oldChild.sibling;
      newIndex++;
    } else {
      break;
    }
  }
  
  // 第二轮遍历：处理剩余的新旧节点...
  // 使用key快速查找需要移动的节点
}
\`\`\`

### 3. key的作用（重要！）

\`\`\`javascript
// 例子：列表反转
旧列表：[A(0), B(1), C(2), D(3)]
新列表：[D(0), C(1), B(2), A(3)]

// 有key的情况：
// 对比key → 知道只是顺序变了 → 移动节点

// 没有key的情况：
// 认为每个位置的节点都变了 → 销毁重建所有节点！
\`\`\`

## React18的最新优化

### 1. 自动批处理

\`\`\`javascript
// React 18之前：只有在React事件中批处理
function handleClick() {
  setCount(c => c + 1); // 立即渲染？
  setFlag(f => !f);     // 立即渲染？
}
// 实际上合并了，只渲染一次

// React 18：即使在setTimeout、Promise中也会批处理
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // 只渲染一次！
}, 1000);
\`\`\`

### 2. 并发特性

\`\`\`javascript
import { useTransition, useDeferredValue } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  
  function handleClick() {
    startTransition(() => {
      // 这个更新可以被中断
      setSearchQuery(input);
    });
  }
  
  const deferredValue = useDeferredValue(value);
  
  return (
    <div>
      {isPending && <Spinner />}
      <Results data={deferredValue} />
    </div>
  );
}
\`\`\`

## 常见面试题

### 问题1：为什么不要用index作为key？

\`\`\`javascript
// 场景：列表删除第一项
旧：[A(key=0), B(key=1), C(key=2)]
新：[B(key=0), C(key=1)]

// 问题：B被当作A来更新，C被当作B来更新...
// 反而不如不设key效率高！

// 而且如果有状态的话，状态会错误！
\`\`\`

### 问题2：setState是同步还是异步？

\`\`\`javascript
// React 18之前：
// 同步？不，是异步，但在某些情况下看起来是同步！

// React 18：全部批处理，都是"异步"的
setCount(c => c + 1);
console.log(count); // 还是旧值

// 如果要拿到新值：
setCount(c => {
  const newValue = c + 1;
  console.log(newValue); // 新值
  return newValue;
});
\`\`\`

## 性能优化建议

1. **合理使用memo/useMemo/useCallback**
2. **给列表项正确的key**
3. **避免内联对象和函数**
4. **代码分割**
5. **虚拟列表**（长列表时）

## 面试回答建议

1. **先讲虚拟DOM**：为什么需要，是什么
2. **讲diff策略**：三个核心策略
3. **讲Fiber架构**：React 16+的改进
4. **举例子**：展示key的重要性
5. **讲最新优化**：React 18的特性
`,
    analysis: "diff算法是React的核心，理解它有助于写出更好的React代码。",
    difficulty: "hard",
    categoryId: 4,
    tags: ["虚拟DOM", "diff算法", "Fiber", "React"],
  },
];

async function batchImport() {
  try {
    const created = await Question.bulkCreate(highQualityVueReactQuestions);
    console.log(`成功导入 ${created.length} 道高质量Vue/React面试题`);
    process.exit(0);
  } catch (error) {
    console.error("导入失败:", error);
    process.exit(1);
  }
}

batchImport();
