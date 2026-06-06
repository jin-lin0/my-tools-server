const sequelize = require("../config/database");
const Question = require("../models/question");

const reactQuestions = [
  // ==================== React基础概念 ====================
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
    title: "什么是JSX？为什么要用JSX？",
    content: "请解释JSX的概念、优势和原理。",
    answer: `**JSX是什么：**
JavaScript XML，JavaScript的语法扩展，让React开发更简洁直观。

\`\`\`jsx
// JSX写法
const element = <h1 className="title">Hello, {name}</h1>;

// 编译后的JavaScript
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello, ',
  name
);
\`\`\`

**JSX优势：**
1. 更直观的语法 - 类似HTML，易于理解
2. 类型安全 - 编译时检查错误
3. 代码提示 - IDE支持更好
4. 更好的复用性 - 组件封装

**JSX规则：**
\`\`\`jsx
// 1. 必须有一个根元素
function App() {
  return (
    <div>
      <Header />
      <Content />
    </div>
  );
}

// React 18可以使用Fragment
function App() {
  return (
    <>
      <Header />
      <Content />
    </>
  );
}

// 2. 注释使用大括号
{/* 这是注释 */}

// 3. 类名用className
<div className="container">Content</div>

// 4. 内联样式使用对象
<div style={{ color: 'red', fontSize: '16px' }}>Text</div>

// 5. 条件渲染
{isLoggedIn && <UserPanel />}
{isLoggedIn ? <UserPanel /> : <Login />}

// 6. 列表渲染（必须有key）
{items.map(item => (
  <Item key={item.id} data={item} />
))}
\`\`\``,
    analysis: "JSX是React的基础，理解其工作原理很重要。",
    difficulty: "easy",
    categoryId: 4,
    tags: ["JSX", "基础", "语法"],
  },
  {
    title: "React的虚拟DOM和Diff算法是什么？",
    content: "请解释React虚拟DOM的概念和Diff算法的工作原理。",
    answer: `**虚拟DOM（Virtual DOM）：**
用JavaScript对象描述真实DOM结构，减少直接操作DOM。

\`\`\`javascript
// 虚拟DOM结构
const vnode = {
  type: 'div',
  props: { className: 'container' },
  children: [
    { type: 'h1', props: {}, children: 'Title' }
  ]
};
\`\`\`

**为什么需要虚拟DOM：**
1. DOM操作很慢，JS操作很快
2. 批量更新，减少重排重绘
3. 跨平台（React Native、VR等）

**Diff算法核心原则：**
1. **同层比较** - 只比较同一层级的节点
2. **类型不同** - 直接替换整个子树
3. **Key对比** - 相同key的节点复用

**Diff算法流程：**
\`\`\`javascript
// 1. 不同类型，直接替换
// 旧: <div>...
// 新: <span>...
// -> 删除div，创建span

// 2. 相同类型，更新属性
// 旧: <div className="old">
// 新: <div className="new">
// -> 只更新className

// 3. 列表对比（Key很重要）
// 旧: [A(1), B(2), C(3)]
// 新: [C(3), B(2), A(1)]
// -> 移动节点，不重新创建

// 4. 没有key，可能导致问题
// 旧: [A, B, C] 插入到前面: D
// 新: [D, A, B, C]
// -> 所有节点都重新创建（如果没有key）
\`\`\`

**Key的最佳实践：**
\`\`\`jsx
// ✅ 使用唯一id
{items.map(item => <Item key={item.id} data={item} />)}

// ❌ 避免使用index（可能导致bug）
{items.map((item, index) => <Item key={index} data={item} />)}
\`\`\``,
    analysis: "虚拟DOM和Diff算法是React性能优化的核心，需要理解其工作原理。",
    difficulty: "hard",
    categoryId: 4,
    tags: ["虚拟DOM", "Diff算法", "性能优化"],
  },
  {
    title: "React组件有哪几种类型？",
    content: "请解释React组件的类型和区别。",
    answer: `**函数组件（Function Component）：**
\`\`\`jsx
// 基础函数组件
function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}

// 箭头函数组件
const Welcome = ({ name }) => <h1>Hello, {name}</h1>;

// 使用Hooks
function Counter() {
  const [count, setCount] = useState(0);
  return <div onClick={() => setCount(count + 1)}>{count}</div>;
}
\`\`\`

**类组件（Class Component）：**
\`\`\`jsx
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
\`\`\`

**类组件生命周期：**
\`\`\`jsx
class Component extends React.Component {
  // 挂载阶段
  constructor() {}
  static getDerivedStateFromProps() {}
  render() {}
  componentDidMount() {}
  
  // 更新阶段
  static getDerivedStateFromProps() {}
  shouldComponentUpdate() {}
  render() {}
  getSnapshotBeforeUpdate() {}
  componentDidUpdate() {}
  
  // 卸载阶段
  componentWillUnmount() {}
}
\`\`\`

**对比：**
| 特性 | 函数组件 | 类组件 |
|------|----------|--------|
| 代码量 | 少 | 多 |
| this | 无 | 有 |
| 生命周期 | 无（用Hooks） | 有 |
| 性能 | 更高 | 一般 |
| 复用性 | 更好（自定义Hooks） | 一般 |

**React 16.8+推荐：**
优先使用函数组件 + Hooks。`,
    analysis: "函数组件和类组件是React的两种组件类型，现在推荐函数组件。",
    difficulty: "easy",
    categoryId: 4,
    tags: ["函数组件", "类组件", "Hooks"],
  },
  {
    title: "React的Props和State有什么区别？",
    content: "请解释React中Props和State的区别和使用场景。",
    answer: `**Props（属性）：**
- 组件外部传入的数据
- 只读，不能修改
- 父组件传给子组件
- Props变化会触发重新渲染

\`\`\`jsx
// 父组件
<Child name="Tom" age={18} />

// 子组件
function Child({ name, age }) {
  return <div>{name} - {age}</div>;
}
\`\`\`

**State（状态）：**
- 组件内部管理的数据
- 可修改
- useState创建
- State变化会触发重新渲染

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
\`\`\`

**对比表：**
| 特性 | Props | State |
|------|-------|-------|
| 来源 | 外部传入 | 内部管理 |
| 可变性 | 只读 | 可变 |
| 用途 | 组件通信 | 内部状态 |
| 触发渲染 | 是 | 是 |
| 默认值 | props默认值 | useState初始值 |

**Props默认值：**
\`\`\`jsx
function Button({ type = 'primary', size = 'medium' }) {
  return <button className={\`btn-\${type} btn-\${size}\`}>Click</button>;
}

// 或者
Button.defaultProps = {
  type: 'primary',
  size: 'medium'
};
\`\`\``,
    analysis: "Props和State是React组件数据管理的基础，需要清楚它们的区别。",
    difficulty: "easy",
    categoryId: 4,
    tags: ["Props", "State", "数据管理"],
  },
  {
    title: "React的事件处理有什么特点？",
    content: "请解释React事件处理的特点和最佳实践。",
    answer: `**React事件特点：**
1. 事件名使用驼峰命名（onClick而非onclick）
2. 传入函数而非字符串
3. 事件对象是SyntheticEvent（跨浏览器兼容）
4. 默认行为需要显式preventDefault

\`\`\`jsx
// 基本事件处理
function Button() {
  function handleClick(e) {
    e.preventDefault(); // 阻止默认行为
    console.log('Clicked!');
  }
  
  return <button onClick={handleClick}>Click me</button>;
}

// 箭头函数写法
function Button() {
  return <button onClick={() => console.log('Clicked!')}>Click</button>;
}

// 传递参数
function ItemList({ items }) {
  function handleItemClick(id) {
    console.log('Item clicked:', id);
  }
  
  return (
    <div>
      {items.map(item => (
        <div key={item.id} onClick={() => handleItemClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
}
\`\`\`

**事件绑定问题（类组件）：**
\`\`\`jsx
class Button extends React.Component {
  constructor(props) {
    super(props);
    // 方法1: 在构造函数中bind
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    console.log(this.props);
  }
  
  // 方法2: 使用箭头函数作为类属性
  handleClick = () => {
    console.log(this.props);
  };
  
  render() {
    // 方法3: 渲染时bind（每次渲染都会创建新函数）
    // <button onClick={this.handleClick.bind(this)}>Click</button>
    
    // 方法4: 渲染时箭头函数（每次渲染都会创建新函数）
    // <button onClick={() => this.handleClick()}>Click</button>
    
    return <button onClick={this.handleClick}>Click</button>;
  }
}
\`\`\``,
    analysis: "React事件处理有自己的特点，需要注意this绑定问题。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["事件处理", "this绑定"],
  },
  {
    title: "什么是受控组件和非受控组件？",
    content: "请解释React中受控组件和非受控组件的区别。",
    answer: `**受控组件（Controlled Component）：**
表单数据由React state控制。

\`\`\`jsx
function Form() {
  const [value, setValue] = useState('');
  
  function handleChange(e) {
    setValue(e.target.value);
  }
  
  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
    />
  );
}
\`\`\`

**非受控组件（Uncontrolled Component）：**
表单数据由DOM自己管理，使用ref获取。

\`\`\`jsx
function Form() {
  const inputRef = useRef(null);
  
  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputRef.current.value);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

**对比：**
| 特性 | 受控组件 | 非受控组件 |
|------|----------|------------|
| 数据来源 | state | ref/DOM |
| 验证时机 | 实时 | 提交时 |
| 灵活性 | 高 | 低 |
| 代码量 | 多 | 少 |
| 使用场景 | 大多数表单 | 简单表单、文件上传 |

**常见表单控件：**
\`\`\`jsx
// 输入框
<input value={value} onChange={handleChange} />

// 复选框
<input type="checkbox" checked={checked} onChange={handleChange} />

// 选择框
<select value={selected} onChange={handleChange}>
  <option value="1">Option 1</option>
</select>

// 多选框
<select multiple value={selected} onChange={handleChange} />
\`\`\``,
    analysis: "受控组件是React推荐的方式，便于表单验证和数据管理。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["受控组件", "非受控组件", "表单"],
  },
  {
    title: "React组件通信有哪些方式？",
    content: "请列举并解释React组件间通信的各种方式。",
    answer: `**1. Props（父子组件）：**
\`\`\`jsx
// 父传子
<Child data={data} />

// 子传父（回调函数）
<Child onUpdate={handleUpdate} />
function Child({ onUpdate }) {
  return <button onClick={() => onUpdate('new data')}>Update</button>;
}
\`\`\`

**2. Context（跨层级）：**
\`\`\`jsx
// 创建Context
const ThemeContext = React.createContext('light');

// 提供Context
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 消费Context（useContext Hook）
function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div style={{ color: theme }}>Content</div>;
}
\`\`\`

**3. 状态提升（兄弟组件）：**
\`\`\`jsx
// 父组件管理状态
function Parent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <ChildA count={count} />
      <ChildB onIncrement={() => setCount(count + 1)} />
    </div>
  );
}
\`\`\`

**4. Redux/Zustand（全局状态）：**
\`\`\`jsx
// Zustand示例
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}));

function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  return <button onClick={increment}>{count}</button>;
}
\`\`\`

**5. 自定义Hook（逻辑复用）：**
\`\`\`jsx
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(count + 1);
  return { count, increment };
}
\`\`\``,
    analysis: "React提供了多种组件通信方式，根据场景选择合适的方式。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["组件通信", "Props", "Context", "Redux"],
  },
  {
    title: "React生命周期有哪些？",
    content: "请解释React类组件的生命周期钩子。",
    answer: `**挂载阶段（Mounting）：**
1. **constructor** - 组件初始化
2. **getDerivedStateFromProps** - 从props派生state（静态方法）
3. **render** - 渲染UI
4. **componentDidMount** - 组件挂载后（发送请求、初始化）

\`\`\`jsx
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }
  
  static getDerivedStateFromProps(props, state) {
    // 根据props更新state
    return null; // 返回null不更新
  }
  
  componentDidMount() {
    // 发送API请求
    fetchData().then(data => this.setState({ data }));
  }
  
  render() {
    return <div>{this.state.data}</div>;
  }
}
\`\`\`

**更新阶段（Updating）：**
1. **getDerivedStateFromProps**
2. **shouldComponentUpdate** - 是否更新（性能优化）
3. **render**
4. **getSnapshotBeforeUpdate** - 更新前获取快照
5. **componentDidUpdate** - 更新后（可以获取prevProps/prevState）

\`\`\`jsx
shouldComponentUpdate(nextProps, nextState) {
  // 只有数据变化时才更新
  return nextProps.id !== this.props.id;
}

componentDidUpdate(prevProps, prevState, snapshot) {
  if (prevProps.id !== this.props.id) {
    this.fetchData();
  }
}
\`\`\`

**卸载阶段（Unmounting）：**
1. **componentWillUnmount** - 组件卸载前（清理工作）

\`\`\`jsx
componentWillUnmount() {
  // 清除定时器、事件监听器等
  clearInterval(this.interval);
  window.removeEventListener('resize', this.handleResize);
}
\`\`\`

**函数组件替代方案：**
使用Hooks：useEffect、useState等。`,
    analysis: "生命周期是类组件的重要概念，现在函数组件用Hooks替代。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["生命周期", "类组件"],
  },
  {
    title: "什么是React Hooks？有哪些常用Hooks？",
    content: "请解释React Hooks的概念和常用Hooks的使用。",
    answer: `**Hooks是什么：**
React 16.8新增特性，让函数组件可以使用state和其他React特性。

**useState - 状态管理：**
\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

// 函数式更新
setCount(prevCount => prevCount + 1);
\`\`\`

**useEffect - 副作用处理：**
\`\`\`jsx
function Component() {
  const [data, setData] = useState(null);
  
  // 类似 componentDidMount + componentDidUpdate
  useEffect(() => {
    // 执行副作用
    fetchData().then(setData);
    
    // 清理函数（类似 componentWillUnmount）
    return () => {
      console.log('Cleanup');
    };
  }, []); // 依赖数组
  
  // 不同依赖情况
  useEffect(() => {}, []); // 只在挂载时执行
  useEffect(() => {}, [prop]); // prop变化时执行
  useEffect(() => {}); // 每次渲染都执行
}
\`\`\`

**useContext - 消费Context：**
\`\`\`jsx
const ThemeContext = createContext('light');

function Component() {
  const theme = useContext(ThemeContext);
  return <div style={{ color: theme }}>Content</div>;
}
\`\`\`

**useRef - 引用：**
\`\`\`jsx
function Component() {
  const inputRef = useRef(null);
  
  const handleClick = () => {
    inputRef.current.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus</button>
    </div>
  );
}
\`\`\`

**useCallback - 缓存函数：**
\`\`\`jsx
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []); // 依赖数组
\`\`\`

**useMemo - 缓存计算结果：**
\`\`\`jsx
const expensiveValue = useMemo(() => {
  return expensiveFunction(data);
}, [data]); // 依赖变化时重新计算
\`\`\`

**useReducer - 复杂状态管理：**
\`\`\`jsx
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <div>Count: {state.count}</div>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
\`\`\``,
    analysis: "Hooks是React 16.8最重要的特性，让函数组件功能完整。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["Hooks", "useState", "useEffect", "函数组件"],
  },
  {
    title: "useEffect的依赖数组有什么作用？",
    content: "请解释useEffect依赖数组的工作原理和注意事项。",
    answer: `**依赖数组（Dependency Array）：**
告诉useEffect什么时候重新执行。

\`\`\`jsx
// 1. 空数组 - 只在挂载时执行一次
useEffect(() => {
  console.log('Mounted');
  return () => console.log('Unmounted');
}, []);

// 2. 有依赖 - 依赖变化时重新执行
useEffect(() => {
  console.log('Name changed:', name);
}, [name]);

// 3. 没有数组 - 每次渲染都执行
useEffect(() => {
  console.log('Every render');
});
\`\`\`

**常见场景：**
\`\`\`jsx
// 数据获取
useEffect(() => {
  async function fetchData() {
    const res = await fetch(\`/api/users/\${userId}\`);
    const data = await res.json();
    setUser(data);
  }
  fetchData();
}, [userId]); // userId变化时重新获取

// 事件监听
useEffect(() => {
  function handleResize() {
    console.log('Resize');
  }
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []); // 只在挂载和卸载时处理
\`\`\`

**useEffect完整例子：**
\`\`\`jsx
useEffect(() => {
  // 副作用
  const subscription = subscribe();
  
  // 清理函数（返回值）
  return () => {
    subscription.unsubscribe();
  };
}, [dependency]);
\`\`\``,
    analysis: "理解useEffect的依赖数组是使用Hooks的关键。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["useEffect", "Hooks", "依赖数组"],
  },
  {
    title: "useCallback和useMemo有什么区别？",
    content: "请解释useCallback和useMemo的区别和使用场景。",
    answer: `**useCallback - 缓存函数：**
缓存函数引用，避免子组件不必要的重新渲染。

\`\`\`jsx
const handleClick = useCallback(() => {
  console.log('Clicked', count);
}, [count]); // count变化时才更新
\`\`\`

**useMemo - 缓存计算结果：**
缓存计算值，避免重复计算。

\`\`\`jsx
const expensiveValue = useMemo(() => {
  // 昂贵的计算
  return data.filter(item => item.active).length;
}, [data]); // data变化时才重新计算
\`\`\`

**对比：**
| Hook | 返回值 | 使用场景 |
|------|--------|----------|
| useCallback | 函数 | 传递给子组件的回调 |
| useMemo | 值 | 昂贵的计算 |

**实际例子：**
\`\`\`jsx
function Parent() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  
  // 不使用useCallback，每次渲染都会创建新函数
  const handleClick = useCallback(() => {
    setTodos([...todos, 'New Todo']);
  }, [todos]); // todos变化时才更新
  
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <Child todos={todos} onClick={handleClick} />
    </div>
  );
}

// 子组件用memo包裹，只有props变化时才重新渲染
const Child = React.memo(({ todos, onClick }) => {
  console.log('Child rendered');
  return (
    <div>
      <div>Todos: {todos.length}</div>
      <button onClick={onClick}>Add Todo</button>
    </div>
  );
});
\`\`\``,
    analysis: "useCallback和useMemo主要用于性能优化，避免不必要的重新渲染。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["useCallback", "useMemo", "性能优化"],
  },
  {
    title: "React.memo有什么作用？",
    content: "请解释React.memo的概念和使用场景。",
    answer: `**React.memo是什么：**
高阶组件（HOC），用于性能优化，缓存组件渲染结果。

\`\`\`jsx
// 基础用法
const MemoizedComponent = React.memo(Component);

// 例子
const Child = React.memo(({ name }) => {
  console.log('Child rendered');
  return <div>Hello, {name}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Tom');
  
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setCount(count + 1)}>+</button>
      {/* 只有name变化时，Child才会重新渲染 */}
      <Child name={name} />
    </div>
  );
}
\`\`\`

**自定义比较函数：**
\`\`\`jsx
const MemoizedComponent = React.memo(
  Component,
  (prevProps, nextProps) => {
    // 返回true表示不重新渲染
    return prevProps.name === nextProps.name;
  }
);
\`\`\`

**注意事项：**
\`\`\`jsx
// ❌ 错误：函数props每次都是新的
const Parent = () => {
  const handleClick = () => {}; // 每次渲染新函数
  return <Child onClick={handleClick} />; // Child每次重新渲染
};

// ✅ 正确：配合useCallback使用
const Parent = () => {
  const handleClick = useCallback(() => {}, []); // 缓存函数
  return <Child onClick={handleClick} />; // 不会重新渲染
};
\`\`\`

**什么时候用React.memo：**
1. 组件经常重新渲染但props相同
2. 组件渲染开销较大
3. 纯组件（只依赖props）

**什么时候不用React.memo：**
1. 简单组件，渲染很快
2. props经常变化
3. 过度优化导致代码复杂度增加`,
    analysis: "React.memo是性能优化的重要工具，配合useCallback效果更好。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["React.memo", "性能优化", "HOC"],
  },
  {
    title: "什么是自定义Hook？如何创建？",
    content: "请解释自定义Hook的概念、创建和使用。",
    answer: `**自定义Hook是什么：**
以use开头的函数，可以复用状态逻辑。

**useLocalStorage Hook：**
\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}

// 使用
function Component() {
  const [name, setName] = useLocalStorage('name', 'Tom');
  return <input value={name} onChange={e => setName(e.target.value)} />;
}
\`\`\`

**useToggle Hook：**
\`\`\`jsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}

// 使用
function Component() {
  const [isOpen, toggle] = useToggle();
  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      {isOpen && <div>Content</div>}
    </div>
  );
}
\`\`\`

**useFetch Hook：**
\`\`\`jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);
  
  return { data, loading, error };
}

// 使用
function Component() {
  const { data, loading, error } = useFetch('/api/users');
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{JSON.stringify(data)}</div>;
}
\`\`\`

**自定义Hook规则：**
1. 必须以use开头
2. 只能在组件或其他Hook中调用
3. 遵循Hooks规则`,
    analysis: "自定义Hook是React中逻辑复用的最佳方式。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["自定义Hook", "代码复用", "Hooks"],
  },
  {
    title: "React中的高阶组件（HOC）是什么？",
    content: "请解释高阶组件的概念、用途和实现。",
    answer: `**HOC是什么：**
Higher-Order Component，接收组件并返回新组件的函数。

\`\`\`jsx
// 基础HOC
function withLogging(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      console.log('Component mounted');
    }
    
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

// 使用
const ComponentWithLogging = withLogging(MyComponent);
\`\`\`

**withAuth HOC示例：**
\`\`\`jsx
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const isAuthenticated = useAuth();
    
    if (!isAuthenticated) {
      return <Login />;
    }
    
    return <WrappedComponent {...props} />;
  };
}

// 使用
const ProtectedPage = withAuth(Dashboard);
\`\`\`

**HOC常见用途：**
1. 权限验证
2. 数据获取
3. 日志记录
4. 样式注入
5. 状态管理

**组合多个HOC：**
\`\`\`jsx
// 嵌套写法
const EnhancedComponent = withAuth(withLogging(withTheme(MyComponent)));

// 使用compose
const enhance = compose(withAuth, withLogging, withTheme);
const EnhancedComponent = enhance(MyComponent);
\`\`\`

**HOC缺点：**
1. Props可能被覆盖
2. 调试困难
3. 静态方法需要复制
4. 嵌套层级多

**React 16.8+推荐：**
优先使用自定义Hook。`,
    analysis: "HOC是React中代码复用的传统方式，现在推荐自定义Hook。",
    difficulty: "hard",
    categoryId: 4,
    tags: ["HOC", "高阶组件", "代码复用"],
  },
  {
    title: "React Router有哪些常用组件？",
    content: "请解释React Router v6的常用组件和API。",
    answer: `**React Router v6核心组件：**

\`\`\`jsx
// 1. BrowserRouter - 根路由容器
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* 路由配置 */}
    </BrowserRouter>
  );
}

// 2. Routes - 包裹Route，匹配第一个
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// 3. Link - 导航链接
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

// 4. NavLink - 活动状态的链接
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Home
      </NavLink>
    </nav>
  );
}
\`\`\`

**常用Hooks：**
\`\`\`jsx
// useNavigate - 编程式导航
import { useNavigate } from 'react-router-dom';

function Component() {
  const navigate = useNavigate();
  
  const goHome = () => navigate('/');
  const goBack = () => navigate(-1);
  
  return <button onClick={goHome}>Home</button>;
}

// useParams - 获取路由参数
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  return <div>User ID: {id}</div>;
}

// useSearchParams - 查询参数
import { useSearchParams } from 'react-router-dom';

function Component() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const handleSearch = (value) => {
    setSearchParams({ q: value });
  };
  
  return <div>Query: {query}</div>;
}

// useLocation - 当前位置信息
import { useLocation } from 'react-router-dom';

function Component() {
  const location = useLocation();
  console.log(location.pathname);
  console.log(location.state);
}
\`\`\``,
    analysis: "React Router是React路由的标准库，v6版本API有重大变化。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["React Router", "路由", "导航"],
  },
  {
    title: "什么是Redux？核心概念有哪些？",
    content: "请解释Redux的核心概念和工作流程。",
    answer: `**Redux是什么：**
JavaScript状态管理库，管理应用全局状态。

**三大原则：**
1. 单一数据源 - 整个应用只有一个store
2. State是只读的 - 只能通过action修改
3. 使用纯函数修改 - reducer是纯函数

**核心概念：**
\`\`\`javascript
// 1. Action - 描述发生了什么
const addTodo = (text) => ({
  type: 'ADD_TODO',
  payload: { text }
});

// 2. Reducer - 处理状态更新
const initialState = { todos: [] };

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    default:
      return state;
  }
}

// 3. Store - 保存状态
import { createStore } from 'redux';
const store = createStore(todoReducer);

// 使用
store.dispatch(addTodo('Learn Redux'));
console.log(store.getState());
\`\`\`

**React Redux：**
\`\`\`jsx
// Provider - 提供store
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
}

// useSelector - 获取state
import { useSelector } from 'react-redux';

function Component() {
  const todos = useSelector(state => state.todos);
  return <div>Todos: {todos.length}</div>;
}

// useDispatch - 分发action
import { useDispatch } from 'react-redux';

function Component() {
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(addTodo('New'))}>
      Add Todo
    </button>
  );
}
\`\`\`

**Redux Toolkit（推荐）：**
\`\`\`javascript
import { createSlice, configureStore } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: { todos: [] },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    }
  }
});

const store = configureStore({
  reducer: { todos: todoSlice.reducer }
});
\`\`\``,
    analysis: "Redux是状态管理的传统方案，现在推荐Zustand或Redux Toolkit。",
    difficulty: "hard",
    categoryId: 4,
    tags: ["Redux", "状态管理", "Flux"],
  },
  {
    title: "Zustand是什么？如何使用？",
    content: "请介绍Zustand状态管理库的使用方法。",
    answer: `**Zustand是什么：**
轻量级React状态管理库，简单易用。

\`\`\`javascript
// 创建store
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// 使用
function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={increment}>+</button>
    </div>
  );
}
\`\`\`

**异步操作：**
\`\`\`javascript
const useStore = create((set) => ({
  users: [],
  loading: false,
  fetchUsers: async () => {
    set({ loading: true });
    const res = await fetch('/api/users');
    const users = await res.json();
    set({ users, loading: false });
  }
}));

// 使用
function UserList() {
  const { users, loading, fetchUsers } = useStore();
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  return <div>{users.map(u => <div key={u.id}>{u.name}</div>)}</div>;
}
\`\`\`

**中间件：**
\`\`\`javascript
import { devtools, persist } from 'zustand/middleware';

const useStore = create(
  devtools(
    persist(
      (set) => ({ count: 0, increment: () => set(s => ({ count: s.count + 1 })) }),
      { name: 'counter-storage' }
    )
  )
);
\`\`\`

**Zustand优势：**
1. API简单
2. 轻量（<1KB）
3. 不需要Provider
4. 支持TypeScript
5. 支持中间件`,
    analysis: "Zustand是现代React项目的首选状态管理库，简单易用。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["Zustand", "状态管理", "React"],
  },
  {
    title: "React性能优化有哪些技巧？",
    content: "请列举React项目的性能优化策略。",
    answer: `**1. 使用React.memo：**
\`\`\`jsx
const Memoized = React.memo(({ data }) => <div>{data}</div>);
\`\`\`

**2. 使用useCallback和useMemo：**
\`\`\`jsx
const handleClick = useCallback(() => {}, []);
const expensive = useMemo(() => compute(data), [data]);
\`\`\`

**3. 列表虚拟滚动：**
\`\`\`jsx
import { FixedSizeList as List } from 'react-window';

const LongList = ({ items }) => (
  <List
    height={600}
    itemCount={items.length}
    itemSize={50}
  >
    {({ index, style }) => (
      <div style={style}>{items[index]}</div>
    )}
  </List>
);
\`\`\`

**4. 代码分割和懒加载：**
\`\`\`jsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
\`\`\`

**5. 避免内联函数和对象：**
\`\`\`jsx
// ❌ 每次渲染新对象
<Component style={{ color: 'red' }} />

// ✅ 提取到外部
const style = { color: 'red' };
<Component style={style} />
\`\`\`

**6. 使用useEffect合理设置依赖：**
\`\`\`jsx
// 只在需要时执行
useEffect(() => {
  fetchData();
}, [id]); // 不是空数组，会重复请求
\`\`\`

**7. 使用Fragment避免额外节点：**
\`\`\`jsx
// ❌ 多余的div
<div>
  <Header />
  <Content />
</div>

// ✅ 使用Fragment
<>
  <Header />
  <Content />
</>
\`\`\`

**8. 生产环境构建：**
\`\`\`bash
npm run build
# 确保是生产模式
\`\`\``,
    analysis: "React性能优化需要从多个方面入手，避免过度优化。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["性能优化", "React", "优化技巧"],
  },
  {
    title: "什么是React Server Components？",
    content: "请解释React Server Components的概念和优势。",
    answer: `**React Server Components（RSC）是什么：**
在服务器端运行的React组件，不发送JavaScript到客户端。

**客户端组件 vs 服务器组件：**
\`\`\`jsx
// 服务器组件（默认，不需要'use client'）
function ServerComponent() {
  // 可以直接访问后端API
  const data = db.query('SELECT * FROM users');
  return <div>{data}</div>;
}

// 客户端组件（需要'use client'）
'use client';

import { useState } from 'react';

function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`

**RSC优势：**
1. 减少客户端JS包大小
2. 直接访问后端资源
3. 更安全（不在客户端暴露敏感代码）
4. 更好的首屏加载

**混合使用：**
\`\`\`jsx
// 服务器组件可以导入客户端组件
function Page() {
  return (
    <div>
      <ServerSideContent />
      <ClientSideInteractions />
    </div>
  );
}

// 客户端组件不能导入服务器组件
\`\`\`

**Next.js App Router示例：**
\`\`\`jsx
// app/page.js (服务器组件)
async function Page() {
  const posts = await getPosts();
  return (
    <div>
      {posts.map(post => <Post key={post.id} post={post} />)}
    </div>
  );
}

// app/components/ClientButton.js
'use client';

export function ClientButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\``,
    analysis: "React Server Components是React的重大更新，改变了开发范式。",
    difficulty: "hard",
    categoryId: 4,
    tags: ["RSC", "React Server Components", "Next.js"],
  },
];

async function batchImport() {
  try {
    const created = await Question.bulkCreate(reactQuestions);
    console.log(`成功导入 ${created.length} 道React面试题`);
    process.exit(0);
  } catch (error) {
    console.error("导入失败:", error);
    process.exit(1);
  }
}

batchImport();
