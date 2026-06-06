const sequelize = require("../config/database");
const Question = require("../models/question");

const vueQuestions = [
  // ==================== Vue基础概念 ====================
  {
    title: "Vue的双向绑定原理是什么？",
    content: "请解释Vue实现数据双向绑定的原理机制。",
    answer: `**Vue2 - Object.defineProperty：**
通过getter/setter拦截数据变化，但无法监听新增/删除属性。

\`\`\`javascript
// Vue2实现原理
function defineReactive(obj, key, val) {
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) dep.addSub(Dep.target);
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      val = newVal;
      dep.notify(); // 通知所有订阅者
    }
  });
}
\`\`\`

**Vue3 - Proxy：**
代理整个对象，支持监听新增/删除属性、数组变化等。

\`\`\`javascript
// Vue3实现原理
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      track(target, key); // 依赖收集
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      trigger(target, key); // 触发更新
      return result;
    }
  });
}
\`\`\`

**核心差异：**
- Vue2：Object.defineProperty，无法监听新增属性，需要Vue.set
- Vue3：Proxy，支持所有数据变化，性能更好`,
    analysis: "双向绑定原理是Vue面试最核心的问题，需要理解Vue2和Vue3的差异。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["双向绑定", "响应式", "核心原理"],
  },
  {
    title: "Vue的生命周期有哪些？各阶段做了什么？",
    content: "请详细说明Vue组件的生命周期钩子及其执行时机。",
    answer: `**Vue2生命周期：**
1. beforeCreate - 实例初始化，data/methods未初始化
2. created - data/methods已初始化，可访问数据
3. beforeMount - 模板编译完成，DOM未渲染
4. mounted - DOM渲染完成，可访问DOM
5. beforeUpdate - 数据变化，DOM更新前
6. updated - DOM更新完成
7. beforeDestroy - 实例销毁前
8. destroyed - 实例销毁完成

**Vue3生命周期（Composition API）：**
\`\`\`javascript
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, 
         onBeforeUnmount, onUnmounted } from 'vue'

setup() {
  onBeforeMount(() => { /* 挂载前 */ });
  onMounted(() => { /* 挂载后 */ });
  onBeforeUpdate(() => { /* 更新前 */ });
  onUpdated(() => { /* 更新后 */ });
  onBeforeUnmount(() => { /* 卸载前 */ });
  onUnmounted(() => { /* 卸载后 */ });
}
\`\`\`

**父子组件生命周期顺序：**
- 挂载：父beforeCreate → 父created → 父beforeMount → 子beforeCreate → 子created → 子beforeMount → 子mounted → 父mounted
- 更新：父beforeUpdate → 子beforeUpdate → 子updated → 父updated
- 卸载：父beforeDestroy → 子beforeDestroy → 子destroyed → 父destroyed`,
    analysis: "生命周期是Vue面试的基础题，需要理解每个阶段的特点和使用场景。",
    difficulty: "easy",
    categoryId: 2,
    tags: ["生命周期", "基础"],
  },
  {
    title: "computed和watch有什么区别？",
    content: "请解释Vue中computed计算属性和watch侦听器的区别及使用场景。",
    answer: `**computed计算属性：**
- 有缓存，依赖不变则不重新计算
- 返回值
- 同步计算

\`\`\`javascript
// Vue2
computed: {
  fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}

// Vue3
const fullName = computed(() => firstName.value + ' ' + lastName.value);
\`\`\`

**watch侦听器：**
- 无缓存，数据变化即执行
- 可执行异步操作
- 可获取旧值

\`\`\`javascript
// Vue2
watch: {
  searchText(newVal, oldVal) {
    this.fetchData(newVal); // 异步请求
  }
}

// Vue3
watch(searchText, (newVal, oldVal) => {
  fetchData(newVal);
});

// 立即执行
watchEffect(() => {
  console.log(searchText.value);
});
\`\`\`

**使用场景：**
- computed：依赖多个数据计算新值，如购物车总价、过滤列表
- watch：数据变化执行副作用，如异步请求、DOM操作`,
    analysis: "computed和watch是Vue最常用的特性，需要理解它们的核心差异。",
    difficulty: "easy",
    categoryId: 2,
    tags: ["computed", "watch", "响应式"],
  },
  {
    title: "Vue的虚拟DOM是什么？Diff算法如何工作？",
    content: "请解释Vue虚拟DOM的概念和Diff算法的工作原理。",
    answer: `**虚拟DOM（Virtual DOM）：**
用JavaScript对象描述真实DOM结构，减少直接操作DOM。

\`\`\`javascript
// 虚拟DOM结构
const vnode = {
  type: 'div',
  props: { class: 'container' },
  children: [
    { type: 'h1', props: {}, children: 'Title' }
  ]
};
\`\`\`

**Diff算法（Vue2 - 双端比较）：**
1. 旧头新头比较
2. 旧尾新尾比较
3. 旧头新尾比较
4. 旧尾新头比较
5. 以上都不匹配则使用key查找

\`\`\`javascript
// 伪代码
while (oldStart <= oldEnd && newStart <= newEnd) {
  if (sameVnode(oldStart, newStart)) {
    patch(oldStart, newStart); // 头头匹配
  } else if (sameVnode(oldEnd, newEnd)) {
    patch(oldEnd, newEnd); // 尾尾匹配
  } else if (sameVnode(oldStart, newEnd)) {
    patch(oldStart, newEnd); // 头尾匹配
  } else if (sameVnode(oldEnd, newStart)) {
    patch(oldEnd, newStart); // 尾头匹配
  }
}
\`\`\`

**Vue3优化 - 最长递增子序列：**
- 静态标记（PatchFlag）
- 事件缓存
- 静态提升
- 最长递增子序列算法减少移动次数

**为什么需要key：**
key是VNode的唯一标识，帮助Diff算法识别节点，避免就地复用导致的状态问题。`,
    analysis: "虚拟DOM和Diff算法是Vue性能优化的核心，需要理解其工作原理。",
    difficulty: "hard",
    categoryId: 2,
    tags: ["虚拟DOM", "Diff算法", "性能优化"],
  },
  {
    title: "Vue组件间通信有哪些方式？",
    content: "请列举并解释Vue组件间通信的各种方式。",
    answer: `**1. Props / Events（父子组件）**
\`\`\`javascript
// 父传子
<Child :msg="parentMsg" />
// 子组件
props: ['msg']

// 子传父
this.$emit('update', newValue)
\`\`\`

**2. $refs / $parent（直接访问）**
\`\`\`javascript
// 父访问子
this.$refs.child.method()
// 子访问父
this.$parent.method()
\`\`\`

**3. Provide / Inject（跨层级）**
\`\`\`javascript
// 祖先组件
provide() {
  return { theme: this.theme }
}
// 后代组件
inject: ['theme']
\`\`\`

**4. Event Bus（任意组件）**
\`\`\`javascript
// Vue2
const bus = new Vue()
bus.$emit('event', data)
bus.$on('event', handler)
\`\`\`

**5. Vuex / Pinia（状态管理）**
\`\`\`javascript
// Vuex
this.$store.state.count
this.$store.commit('increment')

// Pinia
const store = useCounterStore()
store.count++
\`\`\`

**6. $attrs / $listeners（透传）**
\`\`\`javascript
// 孙子组件
<GrandChild v-bind="$attrs" v-on="$listeners" />
\`\`\`

**Vue3变化：**
- Event Bus被移除（mitt库替代）
- $listeners被移除（合并到$attrs）
- 推荐使用Pinia替代Vuex`,
    analysis: "组件通信是Vue面试的核心问题，需要根据场景选择合适的方式。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["组件通信", "Props", "Vuex"],
  },
  {
    title: "Vue的插槽（Slot）有哪些类型？",
    content: "请解释Vue插槽的概念、类型和使用场景。",
    answer: `**插槽类型：**
1. 默认插槽
2. 具名插槽
3. 作用域插槽

**默认插槽：**
\`\`\`html
<!-- 子组件 -->
<template>
  <slot>默认内容</slot>
</template>

<!-- 父组件 -->
<Child>
  <p>插入的内容</p>
</Child>
\`\`\`

**具名插槽：**
\`\`\`html
<!-- 子组件 -->
<template>
  <slot name="header"></slot>
  <slot></slot>
  <slot name="footer"></slot>
</template>

<!-- 父组件 -->
<Child>
  <template v-slot:header>
    <h1>Header</h1>
  </template>
  <template v-slot:default>
    <p>Content</p>
  </template>
  <template v-slot:footer>
    <p>Footer</p>
  </template>
</Child>
\`\`\`

**作用域插槽：**
\`\`\`html
<!-- 子组件 -->
<template>
  <slot :user="user" :age="18"></slot>
</template>

<!-- 父组件 -->
<Child v-slot="{ user, age }">
  <p>{{ user }} - {{ age }}</p>
</Child>
\`\`\`

**Vue3简写：**
\`\`\`html
<!-- # 简写 v-slot -->
<template #header>Header</template>
<template #default="{ user }">{{ user }}</template>
\`\`\`

**使用场景：**
- 默认插槽：布局容器
- 具名插槽：页面布局（header、content、footer）
- 作用域插槽：列表渲染、自定义渲染逻辑`,
    analysis: "插槽是Vue组件化的重要特性，实现内容分发和复用。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["插槽", "组件", "内容分发"],
  },
  {
    title: "Vue的nextTick是什么？什么时候使用？",
    content: "请解释Vue nextTick的原理和使用场景。",
    answer: `**nextTick是什么：**
在下次DOM更新循环结束之后执行延迟回调。

\`\`\`javascript
// Vue2
this.message = 'updated'
this.$nextTick(() => {
  // DOM已更新
  console.log(this.$el.textContent)
})

// Vue3
import { nextTick } from 'vue'
message.value = 'updated'
await nextTick()
// DOM已更新
\`\`\`

**为什么需要nextTick：**
Vue采用异步更新策略，数据变化后DOM不会立即更新。

\`\`\`javascript
// 错误示例
this.items.push(newItem)
// DOM还未更新，获取不到新元素
this.$refs.list.scrollTop = this.$refs.list.scrollHeight

// 正确示例
this.items.push(newItem)
this.$nextTick(() => {
  // DOM已更新
  this.$refs.list.scrollTop = this.$refs.list.scrollHeight
})
\`\`\`

**实现原理（Vue2）：**
\`\`\`javascript
const callbacks = []
let pending = false

function nextTick(cb) {
  callbacks.push(cb)
  if (!pending) {
    pending = true
    // 优先使用微任务：Promise > MutationObserver > setImmediate > setTimeout
    Promise.resolve().then(flushCallbacks)
  }
}
\`\`\`

**使用场景：**
1. 数据更新后操作DOM
2. 第三方库初始化（需要DOM存在）
3. 获取更新后的DOM状态`,
    analysis: "nextTick是Vue异步更新机制的关键，需要理解其原理。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["nextTick", "异步更新", "DOM"],
  },
  {
    title: "Vue中的v-if和v-show有什么区别？",
    content: "请解释Vue中条件渲染v-if和v-show的区别及使用场景。",
    answer: `**v-if：**
- 真正的条件渲染，条件为false时什么都不渲染
- 有更高的切换开销
- 支持v-else-if、v-else
- 支持<template>标签

\`\`\`html
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else>C</div>
\`\`\`

**v-show：**
- 通过CSS display属性控制显示隐藏
- 有更高的初始渲染开销
- 不支持<template>
- 不支持v-else

\`\`\`html
<div v-show="isVisible">Content</div>
<!-- 渲染结果 -->
<div style="display: none;">Content</div>
\`\`\`

**使用场景：**
- v-if：条件很少改变，如权限控制、多条件分支
- v-show：频繁切换，如Tab切换、弹窗显示隐藏

**性能考虑：**
\`\`\`javascript
// 频繁切换场景
// ✅ 推荐 v-show（只改变CSS）
<div v-show="isActive">Tab Content</div>

// 条件很少改变
// ✅ 推荐 v-if（减少初始渲染）
<div v-if="user.isAdmin">Admin Panel</div>
\`\`\``,
    analysis: "v-if和v-show是条件渲染的基础，需要根据场景选择。",
    difficulty: "easy",
    categoryId: 2,
    tags: ["v-if", "v-show", "条件渲染"],
  },
  {
    title: "Vue的key属性有什么作用？",
    content: "请解释Vue中key属性的作用和最佳实践。",
    answer: `**key的作用：**
1. 唯一标识VNode，帮助Vue识别节点
2. 优化Diff算法，提高渲染效率
3. 避免就地复用导致的状态问题

**为什么不能用index作为key：**
\`\`\`javascript
// 列表数据
[{id: 1, name: 'A'}, {id: 2, name: 'B'}, {id: 3, name: 'C'}]

// 删除第二项后，用index作为key：
// index 0: A → A（复用）
// index 1: B → C（更新，但input状态错误）
// index 2: C → undefined（删除）

// 用id作为key：
// id 1: A → A（复用）
// id 2: B → （删除）
// id 3: C → C（复用）
\`\`\`

**最佳实践：**
\`\`\`html
<!-- ✅ 使用唯一id -->
<li v-for="item in list" :key="item.id">{{ item.name }}</li>

<!-- ❌ 避免使用index -->
<li v-for="(item, index) in list" :key="index">{{ item.name }}</li>
\`\`\`

**特殊场景：**
\`\`\`html
<!-- 强制重新渲染组件 -->
<Component :key="uniqueId" />

<!-- 切换组件时重置状态 -->
<component :is="currentComponent" :key="currentTab" />
\`\`\``,
    analysis: "key是Vue渲染优化的关键，理解其原理避免常见错误。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["key", "虚拟DOM", "性能优化"],
  },
  {
    title: "什么是Vuex？核心概念有哪些？",
    content: "请解释Vuex状态管理的核心概念和使用方式。",
    answer: `**Vuex是什么：**
Vue.js的官方状态管理库，采用集中式存储管理应用状态。

**核心概念：**
1. **State** - 状态树，存储应用状态
2. **Getters** - 计算属性，从state派生状态
3. **Mutations** - 同步修改state的唯一方式
4. **Actions** - 处理异步操作，提交mutation
5. **Modules** - 模块化，分割store

\`\`\`javascript
// store/index.js
const store = new Vuex.Store({
  state: {
    count: 0,
    todos: []
  },
  getters: {
    doneTodos: state => state.todos.filter(t => t.done)
  },
  mutations: {
    INCREMENT(state) {
      state.count++
    },
    ADD_TODO(state, todo) {
      state.todos.push(todo)
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => commit('INCREMENT'), 1000)
    },
    async fetchTodos({ commit }) {
      const todos = await api.getTodos()
      commit('SET_TODOS', todos)
    }
  },
  modules: {
    user: userModule,
    cart: cartModule
  }
})

// 组件中使用
this.$store.state.count
this.$store.getters.doneTodos
this.$store.commit('INCREMENT')
this.$store.dispatch('incrementAsync')
\`\`\`

**严格模式：**
\`\`\`javascript
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production'
})
// 严格模式下，非mutation修改state会报错
\`\`\``,
    analysis: "Vuex是Vue2时代的状态管理方案，需要理解其核心概念。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["Vuex", "状态管理"],
  },
  {
    title: "Pinia和Vuex有什么区别？",
    content: "请比较Pinia和Vuex的异同，以及Pinia的优势。",
    answer: `**Pinia是什么：**
Vue官方推荐的新一代状态管理库，是Vuex的替代方案。

**核心区别：**

| 特性 | Vuex | Pinia |
|------|------|-------|
| Mutations | 有 | 无 |
| Modules | 嵌套模块 | 扁平化 |
| TypeScript | 支持有限 | 完美支持 |
| API风格 | Options API | Composition API |
| 体积 | 较大 | 更小 |

**Pinia使用方式：**
\`\`\`javascript
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    },
    async fetchCount() {
      const res = await api.getCount()
      this.count = res.count
    }
  }
})

// Composition API风格
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }
  
  return { count, double, increment }
})

// 组件中使用
const counter = useCounterStore()
counter.count++
counter.increment()
\`\`\`

**Pinia优势：**
1. 去除mutations，直接修改state
2. 完美的TypeScript支持
3. 扁平化结构，无需嵌套modules
4. 更小的体积
5. 支持Composition API
6. 支持插件扩展`,
    analysis: "Pinia是Vue3推荐的状态管理方案，需要了解其与Vuex的区别。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["Pinia", "Vuex", "状态管理"],
  },
  {
    title: "Vue Router有哪些导航守卫？",
    content: "请列举并解释Vue Router的导航守卫类型和使用场景。",
    answer: `**导航守卫类型：**
1. 全局守卫
2. 路由独享守卫
3. 组件内守卫

**全局守卫：**
\`\`\`javascript
// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

// 全局后置守卫
router.afterEach((to, from) => {
  document.title = to.meta.title
})

// 全局解析守卫
router.beforeResolve(async to => {
  await loadAsyncData()
})
\`\`\`

**路由独享守卫：**
\`\`\`javascript
const routes = [
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      if (!isAdmin) next('/403')
      else next()
    }
  }
]
\`\`\`

**组件内守卫：**
\`\`\`javascript
export default {
  beforeRouteEnter(to, from, next) {
    // 不能访问this
    next(vm => {
      // 通过vm访问组件实例
    })
  },
  beforeRouteUpdate(to, from) {
    // 路由变化但组件复用时
    this.fetchData(to.params.id)
  },
  beforeRouteLeave(to, from) {
    // 离开前，如保存草稿
    if (this.hasUnsavedChanges) {
      return confirm('有未保存的更改，确定离开？')
    }
  }
}
\`\`\`

**Vue3 Composition API：**
\`\`\`javascript
import { onBeforeRouteLeave } from 'vue-router'

onBeforeRouteLeave((to, from) => {
  if (hasUnsavedChanges.value) {
    return confirm('确定离开？')
  }
})
\`\`\``,
    analysis: "导航守卫是Vue Router的核心功能，实现路由权限控制。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["Vue Router", "导航守卫", "路由"],
  },
  {
    title: "Vue的响应式原理在Vue2和Vue3中有什么区别？",
    content: "请详细对比Vue2和Vue3响应式系统的实现差异。",
    answer: `**Vue2 - Object.defineProperty：**
\`\`\`javascript
// 核心实现
function defineReactive(obj, key, val) {
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.depend() // 依赖收集
      }
      return val
    },
    set(newVal) {
      if (newVal === val) return
      val = newVal
      dep.notify() // 派发更新
    }
  })
}

// 无法监听的情况
this.$set(obj, 'newKey', value) // 新增属性
this.$delete(obj, 'key') // 删除属性
this.$set(arr, index, value) // 数组索引修改
\`\`\`

**Vue3 - Proxy：**
\`\`\`javascript
// 核心实现
const handler = {
  get(target, key, receiver) {
    track(target, key) // 依赖收集
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    trigger(target, key) // 派发更新
    return result
  },
  deleteProperty(target, key) {
    const result = Reflect.deleteProperty(target, key)
    trigger(target, key)
    return result
  }
}

function reactive(target) {
  return new Proxy(target, handler)
}
\`\`\`

**核心差异：**
| 特性 | Vue2 | Vue3 |
|------|------|------|
| API | Object.defineProperty | Proxy |
| 新增属性 | 需要$set | 自动监听 |
| 删除属性 | 需要$delete | 自动监听 |
| 数组变化 | 重写7个方法 | 自动监听 |
| 性能 | 初始化递归 | 惰性监听 |
| 兼容性 | IE9+ | 不支持IE |`,
    analysis: "响应式原理是Vue面试的核心，需要深入理解Vue2和Vue3的差异。",
    difficulty: "hard",
    categoryId: 2,
    tags: ["响应式", "Proxy", "Vue2", "Vue3"],
  },
  {
    title: "什么是Composition API？与Options API有什么区别？",
    content: "请解释Vue3 Composition API的概念和优势。",
    answer: `**Options API（Vue2风格）：**
\`\`\`javascript
export default {
  data() {
    return { count: 0, name: '' }
  },
  computed: {
    double() { return this.count * 2 }
  },
  methods: {
    increment() { this.count++ }
  },
  mounted() {
    console.log('mounted')
  }
}
\`\`\`

**Composition API（Vue3风格）：**
\`\`\`javascript
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const name = ref('')
    const double = computed(() => count.value * 2)
    
    function increment() {
      count.value++
    }
    
    onMounted(() => {
      console.log('mounted')
    })
    
    return { count, name, double, increment }
  }
}
\`\`\`

**<script setup>语法糖：**
\`\`\`vue
<script setup>
import { ref, computed, onMounted } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)
function increment() { count.value++ }
onMounted(() => console.log('mounted'))
</script>
\`\`\`

**Composition API优势：**
1. **逻辑复用** - 通过composables函数复用逻辑
2. **类型推导** - 更好的TypeScript支持
3. **代码组织** - 相关逻辑集中在一起
4. **打包优化** - Tree-shaking友好

**Composables示例：**
\`\`\`javascript
// useCounter.js
export function useCounter(initial = 0) {
  const count = ref(initial)
  const double = computed(() => count.value * 2)
  function increment() { count.value++ }
  return { count, double, increment }
}

// 组件中使用
const { count, double, increment } = useCounter(10)
\`\`\``,
    analysis: "Composition API是Vue3的核心特性，需要理解其优势和使用方式。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["Composition API", "Options API", "Vue3"],
  },
  {
    title: "Vue3的ref和reactive有什么区别？",
    content: "请解释Vue3中ref和reactive的区别及使用场景。",
    answer: `**ref：**
- 包装基本类型为响应式
- 通过.value访问
- 可以包装对象

\`\`\`javascript
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0
count.value++

const obj = ref({ name: 'Tom' })
console.log(obj.value.name) // 'Tom'
\`\`\`

**reactive：**
- 包装对象为响应式
- 直接访问属性
- 不能包装基本类型

\`\`\`javascript
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  name: 'Tom'
})
console.log(state.count) // 0
state.count++

// ❌ 错误用法
const count = reactive(0) // 不生效
\`\`\`

**核心区别：**
| 特性 | ref | reactive |
|------|-----|----------|
| 数据类型 | 任意类型 | 对象类型 |
| 访问方式 | .value | 直接访问 |
| 解构 | 保持响应式 | 丢失响应式 |
| 模板使用 | 自动解包 | 直接使用 |

**解构问题：**
\`\`\`javascript
const state = reactive({ count: 0, name: 'Tom' })

// ❌ 解构丢失响应式
const { count, name } = state

// ✅ 使用toRefs
import { toRefs } from 'vue'
const { count, name } = toRefs(state)
\`\`\`

**使用建议：**
- 基本类型：使用ref
- 对象类型：优先使用reactive
- 需要解构：使用toRefs
- 组合函数返回：使用ref`,
    analysis: "ref和reactive是Vue3响应式的基础，需要理解它们的区别。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["ref", "reactive", "响应式", "Vue3"],
  },
  {
    title: "Vue的keep-alive组件有什么作用？",
    content: "请解释Vue keep-alive组件的原理和使用场景。",
    answer: `**keep-alive是什么：**
Vue内置的抽象组件，用于缓存不活动的组件实例。

\`\`\`html
<keep-alive>
  <Component :is="currentComponent" />
</keep-alive>

<!-- 结合路由 -->
<router-view v-slot="{ Component }">
  <keep-alive :include="['Home', 'About']">
    <component :is="Component" />
  </keep-alive>
</router-view>
\`\`\`

**Props：**
- include - 字符串/正则，匹配的组件被缓存
- exclude - 字符串/正则，匹配的组件不缓存
- max - 数字，最大缓存实例数

**生命周期：**
\`\`\`javascript
export default {
  // 组件被激活时
  activated() {
    console.log('activated')
  },
  // 组件被停用时
  deactivated() {
    console.log('deactivated')
  }
}
\`\`\`

**缓存机制：**
\`\`\`javascript
// LRU（最近最少使用）算法
// 缓存超过max时，删除最久没有使用的组件
\`\`\`

**使用场景：**
1. Tab切换 - 保留滚动位置
2. 列表页 - 缓存搜索条件
3. 表单页 - 保留未提交的数据

**注意事项：**
\`\`\`javascript
// 子组件有name选项才生效
export default {
  name: 'MyComponent', // 必须有name
  // ...
}
\`\`\``,
    analysis: "keep-alive是Vue性能优化的重要组件，用于缓存组件状态。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["keep-alive", "缓存", "性能优化"],
  },
  {
    title: "Vue3的Teleport是什么？有什么用途？",
    content: "请解释Vue3 Teleport组件的概念和使用场景。",
    answer: `**Teleport是什么：**
Vue3内置组件，将子组件渲染到DOM的其他位置。

\`\`\`html
<!-- 模态框示例 -->
<template>
  <button @click="showModal = true">打开</button>
  <Teleport to="body">
    <div v-if="showModal" class="modal">
      <p>模态框内容</p>
      <button @click="showModal = false">关闭</button>
    </div>
  </Teleport>
</template>
\`\`\`

**Props：**
- to - CSS选择器或DOM元素
- disabled - 是否禁用传送

\`\`\`html
<!-- 传送到特定容器 -->
<Teleport to="#modals">
  <div>Modal Content</div>
</Teleport>

<!-- 动态目标 -->
<Teleport :to="teleportTarget">
  <div>Content</div>
</Teleport>
\`\`\`

**使用场景：**
1. **模态框/对话框** - 渲染到body
2. **通知/提示** - 渲染到固定容器
3. **Tooltip** - 渲染到视口位置
4. **全局加载** - 渲染到顶层

**为什么需要Teleport：**
- 避免z-index层级问题
- 避免overflow:hidden裁剪
- 保持组件逻辑关系，改变DOM位置

**与Vue2 portal-vue对比：**
Vue3将Teleport内置，无需第三方库。`,
    analysis: "Teleport是Vue3新增的内置组件，解决DOM渲染位置问题。",
    difficulty: "easy",
    categoryId: 2,
    tags: ["Teleport", "Vue3", "DOM"],
  },
  {
    title: "Vue3的Suspense是什么？",
    content: "请解释Vue3 Suspense组件的概念和使用场景。",
    answer: `**Suspense是什么：**
Vue3实验性内置组件，用于处理异步组件的加载状态。

\`\`\`html
<template>
  <Suspense>
    <!-- 异步组件 -->
    <template #default>
      <AsyncComponent />
    </template>
    <!-- 加载中状态 -->
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>
\`\`\`

**异步组件定义：**
\`\`\`javascript
// setup中返回Promise
export default {
  async setup() {
    const data = await fetchData()
    return { data }
  }
}

// 或者使用Suspense的子组件
export default {
  async setup() {
    const user = await fetchUser()
    const posts = await fetchPosts(user.id)
    return { user, posts }
  }
}
\`\`\`

**嵌套Suspense：**
\`\`\`html
<Suspense>
  <template #default>
    <Parent> <!-- 异步 -->
      <Suspense>
        <template #default>
          <Child /> <!-- 异步 -->
        </template>
        <template #fallback>
          <ChildLoading />
        </template>
      </Suspense>
    </Parent>
  </template>
  <template #fallback>
    <ParentLoading />
  </template>
</Suspense>
\`\`\`

**错误处理：**
\`\`\`javascript
import { onErrorCaptured } from 'vue'

setup() {
  onErrorCaptured((error) => {
    console.error(error)
    return false // 阻止错误向上传播
  })
}
\`\`\`

**注意：**
- Vue3.0中仍是实验性功能
- API可能在后续版本变化`,
    analysis: "Suspense用于处理异步组件，是Vue3的新特性。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["Suspense", "异步组件", "Vue3"],
  },
  {
    title: "Vue的mixin和composable有什么区别？",
    content: "请比较Vue2 mixin和Vue3 composable的异同和优缺点。",
    answer: `**Mixin（Vue2）：**
\`\`\`javascript
// 定义mixin
const myMixin = {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log('mixin mounted')
  }
}

// 使用mixin
export default {
  mixins: [myMixin]
}
\`\`\`

**Composable（Vue3）：**
\`\`\`javascript
// 定义composable
export function useCounter(initial = 0) {
  const count = ref(initial)
  const double = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }
  
  onMounted(() => {
    console.log('composable mounted')
  })
  
  return { count, double, increment }
}

// 使用composable
const { count, double, increment } = useCounter(10)
\`\`\`

**Mixin缺点：**
1. 命名冲突 - 多个mixin可能有同名属性
2. 来源不明 - 不清楚属性来自哪个mixin
3. 隐式依赖 - mixin之间可能有隐式依赖
4. 全局混入 - 污染所有组件

**Composable优势：**
1. 明确来源 - 清楚属性来自哪个函数
2. 类型安全 - 完美的TypeScript支持
3. 灵活组合 - 可嵌套使用
4. 无命名冲突 - 变量名由使用方决定

**Vue3推荐：**
优先使用composable替代mixin。`,
    analysis: "mixin和composable都是逻辑复用的方式，Vue3推荐composable。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["mixin", "composable", "代码复用"],
  },
  {
    title: "Vue中如何实现组件的异步加载？",
    content: "请解释Vue异步组件的实现方式和使用场景。",
    answer: `**Vue2异步组件：**
\`\`\`javascript
// 工厂函数
const AsyncComponent = () => import('./MyComponent.vue')

// 带配置
const AsyncComponent = () => ({
  component: import('./MyComponent.vue'),
  loading: LoadingComponent,
  error: ErrorComponent,
  delay: 200,
  timeout: 3000
})
\`\`\`

**Vue3异步组件：**
\`\`\`javascript
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent(() =>
  import('./MyComponent.vue')
)

// 带配置
const AsyncComponent = defineAsyncComponent({
  loader: () => import('./MyComponent.vue'),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000,
  suspensible: false
})
\`\`\`

**路由懒加载：**
\`\`\`javascript
const routes = [
  {
    path: '/home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/about',
    component: () => import('./views/About.vue')
  }
]
\`\`\`

**Webpack魔法注释：**
\`\`\`javascript
const Home = () => import(/* webpackChunkName: "home" */ './views/Home.vue')
const About = () => import(/* webpackChunkName: "about" */ './views/About.vue')
\`\`\`

**使用场景：**
1. 路由懒加载 - 减少初始包体积
2. 大型组件 - 按需加载
3. 权限组件 - 权限验证后加载
4. 第三方库 - 延迟加载`,
    analysis: "异步组件是性能优化的重要手段，减少初始加载时间。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["异步组件", "懒加载", "性能优化"],
  },
  {
    title: "Vue的自定义指令有哪些钩子函数？",
    content: "请解释Vue自定义指令的钩子函数和使用场景。",
    answer: `**Vue2钩子函数：**
- bind - 指令绑定到元素时
- inserted - 元素插入父节点时
- update - 所在组件更新时
- componentUpdated - 所在组件及子组件更新后
- unbind - 指令解绑时

\`\`\`javascript
Vue.directive('focus', {
  bind(el, binding, vnode) {},
  inserted(el) {
    el.focus()
  },
  update(el, binding, vnode, oldVnode) {},
  unbind(el) {}
})
\`\`\`

**Vue3钩子函数：**
- created - 元素创建时
- beforeMount - 挂载前
- mounted - 挂载后
- beforeUpdate - 更新前
- updated - 更新后
- beforeUnmount - 卸载前
- unmounted - 卸载后

\`\`\`javascript
const vFocus = {
  mounted(el) {
    el.focus()
  },
  updated(el, binding) {
    // 值变化时
  }
}

// 使用
<input v-focus />
\`\`\`

**实用示例：**
\`\`\`javascript
// v-click-outside
const vClickOutside = {
  mounted(el, binding) {
    el._clickOutside = (e) => {
      if (!el.contains(e.target)) {
        binding.value(e)
      }
    }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutside)
  }
}

// v-permission
const vPermission = {
  mounted(el, binding) {
    const permissions = getUserPermissions()
    if (!permissions.includes(binding.value)) {
      el.parentNode?.removeChild(el)
    }
  }
}
\`\`\``,
    analysis: "自定义指令扩展了Vue的模板能力，用于处理DOM操作。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["自定义指令", "DOM操作"],
  },
  {
    title: "Vue3的Fragment、Teleport、Suspense是什么？",
    content: "请解释Vue3新增的三个内置组件。",
    answer: `**Fragment（片段）：**
Vue3支持组件有多个根节点。

\`\`\`vue
<!-- Vue2必须有单根节点 -->
<template>
  <div>
    <header>Header</header>
    <main>Content</main>
  </div>
</template>

<!-- Vue3支持多根节点 -->
<template>
  <header>Header</header>
  <main>Content</main>
  <footer>Footer</footer>
</template>
\`\`\`

**Teleport（传送）：**
将组件DOM渲染到其他位置。

\`\`\`vue
<template>
  <button @click="open = true">Open</button>
  <Teleport to="body">
    <div v-if="open" class="modal">
      Modal Content
    </div>
  </Teleport>
</template>
\`\`\`

**Suspense（悬念）：**
处理异步组件加载状态。

\`\`\`vue
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
\`\`\`

**对比总结：**
| 组件 | 作用 | 使用场景 |
|------|------|----------|
| Fragment | 多根节点 | 布局组件 |
| Teleport | DOM传送 | 模态框、通知 |
| Suspense | 异步处理 | 数据加载 |`,
    analysis: "这三个组件是Vue3的重要新增特性。",
    difficulty: "easy",
    categoryId: 2,
    tags: ["Fragment", "Teleport", "Suspense", "Vue3"],
  },
  {
    title: "Vue中如何处理表单验证？",
    content: "请介绍Vue中表单验证的方案和最佳实践。",
    answer: `**方案一：手动验证**
\`\`\`javascript
export default {
  data() {
    return {
      form: { email: '', password: '' },
      errors: {}
    }
  },
  methods: {
    validate() {
      this.errors = {}
      if (!this.form.email) {
        this.errors.email = '邮箱不能为空'
      } else if (!/\\S+@\\S+\\.\\S+/.test(this.form.email)) {
        this.errors.email = '邮箱格式不正确'
      }
      if (this.form.password.length < 6) {
        this.errors.password = '密码至少6位'
      }
      return Object.keys(this.errors).length === 0
    },
    submit() {
      if (this.validate()) {
        // 提交表单
      }
    }
  }
}
\`\`\`

**方案二：使用VeeValidate（推荐）**
\`\`\`javascript
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6)
})

const { handleSubmit, errors } = useForm({ validationSchema: schema })
const { value: email } = useField('email')
const { value: password } = useField('password')

const onSubmit = handleSubmit(values => {
  console.log(values)
})
\`\`\`

**方案三：Element Plus / Ant Design Vue**
\`\`\`html
<el-form :model="form" :rules="rules" ref="formRef">
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="form.email" />
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="form.password" type="password" />
  </el-form-item>
</el-form>

<script>
export default {
  data() {
    return {
      form: { email: '', password: '' },
      rules: {
        email: [
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '邮箱格式不正确' }
        ],
        password: [
          { required: true, message: '请输入密码' },
          { min: 6, message: '密码至少6位' }
        ]
      }
    }
  }
}
</script>
\`\`\``,
    analysis: "表单验证是前端开发的常见需求，需要选择合适的方案。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["表单验证", "VeeValidate"],
  },
  {
    title: "Vue中如何实现权限控制？",
    content: "请介绍Vue项目中实现权限控制的方案。",
    answer: `**路由权限控制：**
\`\`\`javascript
// router/index.js
const routes = [
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/user',
    component: UserLayout,
    meta: { requiresAuth: true, roles: ['user', 'admin'] }
  }
]

// 全局守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  if (to.meta.requiresAuth) {
    if (!userStore.isAuthenticated) {
      next('/login')
    } else if (to.meta.roles && !to.meta.roles.includes(userStore.role)) {
      next('/403')
    } else {
      next()
    }
  } else {
    next()
  }
})
\`\`\`

**动态路由：**
\`\`\`javascript
// 根据权限动态添加路由
function addDynamicRoutes(permissions) {
  const routes = generateRoutes(permissions)
  routes.forEach(route => router.addRoute(route))
}
\`\`\`

**按钮权限：**
\`\`\`javascript
// 自定义指令
const vPermission = {
  mounted(el, binding) {
    const permissions = useUserStore().permissions
    if (!permissions.includes(binding.value)) {
      el.parentNode?.removeChild(el)
    }
  }
}

// 使用
<button v-permission="'user:delete'">删除</button>
\`\`\`

**组件权限：**
\`\`\`vue
<template>
  <div v-if="hasPermission('admin')">
    Admin Content
  </div>
</template>

<script setup>
import { usePermission } from '@/composables/usePermission'
const { hasPermission } = usePermission()
</script>
\`\`\``,
    analysis: "权限控制是企业级应用的必备功能，需要前后端配合实现。",
    difficulty: "hard",
    categoryId: 2,
    tags: ["权限控制", "路由守卫", "动态路由"],
  },
  {
    title: "Vue中如何进行性能优化？",
    content: "请列举Vue项目的性能优化策略。",
    answer: `**1. 组件懒加载**
\`\`\`javascript
const HeavyComponent = () => import('./HeavyComponent.vue')
\`\`\`

**2. keep-alive缓存**
\`\`\`html
<keep-alive :include="cachedViews">
  <router-view />
</keep-alive>
\`\`\`

**3. v-if vs v-show**
\`\`\`html
<!-- 频繁切换用v-show -->
<div v-show="isVisible">Content</div>

<!-- 条件少变用v-if -->
<div v-if="isAdmin">Admin Panel</div>
\`\`\`

**4. 长列表优化**
\`\`\`javascript
// 虚拟滚动
<virtual-list :data="list" :item-height="50" />
\`\`\`

**5. computed缓存**
\`\`\`javascript
// ✅ 使用computed
const filteredList = computed(() => 
  list.value.filter(item => item.active)
)

// ❌ 在模板中直接计算
{{ list.filter(item => item.active) }}
\`\`\`

**6. 事件优化**
\`\`\`javascript
// 防抖
const debouncedSearch = debounce(search, 300)

// 节流
const throttledScroll = throttle(onScroll, 100)
\`\`\`

**7. 图片懒加载**
\`\`\`html
<img v-lazy="imageUrl" />
\`\`\`

**8. Tree Shaking**
\`\`\`javascript
// 按需引入
import { Button } from 'element-plus'
\`\`\`

**9. 生产环境关闭sourceMap**
\`\`\`javascript
// vite.config.js
export default {
  build: {
    sourcemap: false
  }
}
\`\`\``,
    analysis: "性能优化是前端开发的重要技能，需要从多个方面入手。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["性能优化", "懒加载", "缓存"],
  },
  {
    title: "Vue3的响应式API有哪些？",
    content: "请列举并解释Vue3 Composition API中的响应式API。",
    answer: `**ref / reactive：**
\`\`\`javascript
import { ref, reactive } from 'vue'

// ref - 基本类型
const count = ref(0)
count.value++

// reactive - 对象类型
const state = reactive({ count: 0 })
state.count++
\`\`\`

**computed：**
\`\`\`javascript
import { computed } from 'vue'

// 只读
const double = computed(() => count.value * 2)

// 可写
const fullName = computed({
  get: () => firstName.value + ' ' + lastName.value,
  set: (val) => {
    [firstName.value, lastName.value] = val.split(' ')
  }
})
\`\`\`

**watch / watchEffect：**
\`\`\`javascript
import { watch, watchEffect } from 'vue'

// watch - 监听特定数据
watch(count, (newVal, oldVal) => {
  console.log('count changed', newVal)
})

// 监听多个
watch([count, name], ([newCount, newName]) => {
  console.log(newCount, newName)
})

// watchEffect - 自动收集依赖
watchEffect(() => {
  console.log(count.value) // 自动监听
})
\`\`\`

**toRef / toRefs：**
\`\`\`javascript
import { toRef, toRefs } from 'vue'

const state = reactive({ count: 0, name: 'Tom' })

// 单个属性转ref
const count = toRef(state, 'count')

// 所有属性转ref（解构时保持响应式）
const { count, name } = toRefs(state)
\`\`\`

**readonly / shallowRef / shallowReactive：**
\`\`\`javascript
import { readonly, shallowRef, shallowReactive } from 'vue'

// 只读代理
const copy = readonly(state)

// 浅层响应式
const shallow = shallowRef({ nested: { count: 0 } })
\`\`\``,
    analysis: "Vue3的响应式API是Composition API的核心。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["响应式API", "ref", "reactive", "Vue3"],
  },
];

async function batchImport() {
  try {
    const created = await Question.bulkCreate(vueQuestions);
    console.log(`成功导入 ${created.length} 道Vue.js面试题`);
    process.exit(0);
  } catch (error) {
    console.error("导入失败:", error);
    process.exit(1);
  }
}

batchImport();
