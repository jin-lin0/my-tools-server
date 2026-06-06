const sequelize = require("../config/database");
const Question = require("../models/question");

const aiMoreQuestions = [
  {
    title: "什么是大语言模型LLM？",
    content: "请解释大语言模型的概念。",
    answer: `**LLM：**
基于大量文本数据训练的AI模型，能够理解和生成自然语言

**代表模型：**
- GPT系列
- Claude
- Llama
- Qwen
- 文心一言`,
    analysis: "AI是当前热点，需要了解基本概念。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["AI", "LLM", "大模型"],
  },
  {
    title: "什么是Prompt Engineering？",
    content: "请解释提示词工程的概念和技巧。",
    answer: `**提示词工程：**
通过设计高质量的提示词，让AI更好地完成任务

**常用技巧：**
- 清晰明确
- 提供上下文
- 指定格式
- 分步骤
- Few Shot示例`,
    analysis: "与AI协作的重要技能。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["Prompt", "AI", "提示词"],
  },
  {
    title: "什么是RAG？",
    content: "请解释检索增强生成的概念。",
    answer: `**RAG（Retrieval-Augmented Generation）：**
1. 检索：从知识库检索相关内容
2. 增强：把检索结果作为上下文
3. 生成：基于上下文生成回答

**优势：**
- 减少幻觉
- 更新知识
- 可解释性`,
    analysis: "企业级AI应用的重要技术。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["RAG", "AI", "检索增强"],
  },
  {
    title: "什么是Agent？",
    content: "请解释AI Agent的概念和应用。",
    answer: `**AI Agent：**
能够自主感知环境、做出决策、执行动作的AI系统

**组成部分：**
- 感知：接收信息
- 规划：制定计划
- 记忆：保存状态
- 行动：调用工具

**应用场景：**
- 客服
- 助手
- 自动化工作流`,
    analysis: "Agent是AI应用的重要方向。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["Agent", "AI", "智能体"],
  },
  {
    title: "什么是Fine-tuning？",
    content: "请解释微调的概念。",
    answer: `**微调：**
在预训练模型的基础上，用特定领域数据继续训练

**对比：**
- Pre-training：大规模数据，通用能力
- Fine-tuning：小领域数据，特定任务

**参数高效微调：**
- LoRA
- QLoRA`,
    analysis: "模型定制的重要手段。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["Fine-tuning", "微调", "AI"],
  },
  {
    title: "什么是Embedding？",
    content: "请解释向量嵌入的概念。",
    answer: `**Embedding：**
把文本等数据转换成固定维度的向量

**应用：**
- 语义搜索
- 相似度计算
- 聚类
- 分类`,
    analysis: "RAG和语义搜索的基础。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["Embedding", "向量", "RAG"],
  },
  {
    title: "什么是上下文窗口Context Window？",
    content: "请解释上下文窗口的概念。",
    answer: `**上下文窗口：**
模型一次能处理的最大token数量

**常见模型：**
- GPT-3.5：4k/16k
- GPT-4：8k/32k/128k
- Claude 3：200k+

**处理长文档：**
- 截断
- 检索
- 压缩`,
    analysis: "使用LLM需要了解的重要限制。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["Context Window", "LLM", "Token"],
  },
  {
    title: "如何评估大模型的输出质量？",
    content: "请列举评估LLM输出的方法。",
    answer: `**评估方法：**
1. 人工评估
2. 自动化评估
   - 事实准确性
   - 相关性
   - 连贯性
3. 基准测试
   - MMLU
   - GSM8K
   - HumanEval`,
    analysis: "AI应用开发的重要环节。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["评估", "LLM", "质量"],
  },
  {
    title: "什么是AI幻觉Hallucination？",
    content: "请解释幻觉的概念和应对。",
    answer: `**幻觉：**
AI编造虚假信息，听起来像真的

**原因：**
- 知识截止
- 推理错误
- 训练数据

**缓解：**
- RAG
- 提示词引导
- 输出验证
- Chain of Thought`,
    analysis: "LLM应用必须处理的关键问题。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["幻觉", "AI", "RAG"],
  },
  {
    title: "什么是Token？",
    content: "请解释Token的概念。",
    answer: `**Token：**
文本的最小单位，可能是单词、部分单词或符号

**估算：**
- 英文：1 token ≈ 0.75词
- 中文：1 token ≈ 1-2字

**收费：**
大多数LLM按token收费`,
    analysis: "使用LLM的基础概念。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["Token", "LLM", "基础"],
  },
  {
    title: "什么是Function Calling/工具调用？",
    content: "请解释大模型函数调用的概念。",
    answer: `**Function Calling：**
让模型能调用外部函数/工具

**流程：**
1. 定义函数
2. 模型决定是否调用
3. 传入参数执行
4. 返回结果给模型

**应用：**
- 获取实时信息
- 执行操作
- 调用API`,
    analysis: "Agent和智能助手的核心能力。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["Function Calling", "工具调用", "Agent"],
  },
  {
    title: "什么是Chain of Thought？",
    content: "请解释思维链的概念。",
    answer: `**Chain of Thought：**
让模型逐步推理，而不是直接给答案

**效果：**
- 提高复杂问题准确率
- 可解释性增强
- 减少错误

**提示词示例：**
"请一步一步思考并解决问题。"`,
    analysis: "Prompt Engineering的重要技巧。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["CoT", "思维链", "Prompt"],
  },
  {
    title: "你用过哪些AI开发工具？",
    content: "请列举常用的AI开发相关工具。",
    answer: `**常用工具：**
- OpenAI API
- LangChain
- LlamaIndex
- LangGraph
- Hugging Face
- Vercel AI SDK
- Dify
- Coze`,
    analysis: "考察AI开发经验。",
    difficulty: "easy",
    categoryId: 1,
    tags: ["工具", "AI开发", "LangChain"],
  },
  {
    title: "什么是LangChain？",
    content: "请解释LangChain的概念和用途。",
    answer: `**LangChain：**
开发LLM应用的框架

**核心概念：**
- Chains：链
- Agents：智能体
- Memory：记忆
- Tools：工具
- RAG：检索增强生成

**优势：**
- 组件化
- 可复用
- 生态丰富`,
    analysis: "最流行的LLM应用框架。",
    difficulty: "medium",
    categoryId: 1,
    tags: ["LangChain", "框架", "AI开发"],
  },
  {
    title: "请比较Vue和React的异同？",
    content: "请对比Vue和React两个框架。",
    answer: `**相同点：**
- 组件化
- 虚拟DOM
- 响应式
- 生态丰富

**不同点：**
- Vue：模板语法，双向绑定，易上手
- React：JSX，单向数据流，更灵活

**选择建议：**
- 团队习惯
- 项目规模
- 生态需求`,
    analysis: "框架选型的常见面试题。",
    difficulty: "medium",
    categoryId: 2,
    tags: ["Vue", "React", "框架对比"],
  },
  {
    title: "什么是TypeScript的接口和类型别名区别？",
    content: "请解释interface和type的区别。",
    answer: `**interface：**
- 可以合并声明
- 可以继承
- 面向对象
- 报错更友好

**type：**
- 更灵活
- 联合类型
- 交叉类型
- 元组

**选择：**
- 对象用interface
- 其他用type`,
    analysis: "TS的核心知识。",
    difficulty: "medium",
    categoryId: 6,
    tags: ["interface", "type", "TypeScript"],
  },
  {
    title: "什么是React Hooks？常用的有哪些？",
    content: "请解释Hooks的概念和常用Hooks。",
    answer: `**Hooks：**
让函数组件能使用state和其他React特性

**常用Hooks：**
- useState
- useEffect
- useContext
- useReducer
- useCallback
- useMemo
- useRef

**自定义Hook：**
复用有状态的逻辑`,
    analysis: "React 16.8+的核心特性。",
    difficulty: "medium",
    categoryId: 4,
    tags: ["Hooks", "React", "函数组件"],
  },
  {
    title: "如何做前端性能优化？",
    content: "请列举前端性能优化的方法。",
    answer: `**加载性能：**
- 代码分割
- Tree Shaking
- 懒加载
- CDN
- 预加载
- 图片优化

**运行性能：**
- 减少重排重绘
- 虚拟列表
- 防抖节流
- Web Worker
- 合理使用缓存`,
    analysis: "前端进阶的核心话题。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["性能优化", "前端", "加载", "运行"],
  },
  {
    title: "什么是HTTP缓存策略？",
    content: "请解释HTTP缓存头。",
    answer: `**强制缓存：**
- Cache-Control
- Expires

**协商缓存：**
- Last-Modified / If-Modified-Since
- ETag / If-None-Match

**最佳实践：**
- 静态资源长期缓存，hash命名
- HTML不缓存`,
    analysis: "网络性能优化的关键。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["HTTP", "缓存", "性能"],
  },
  {
    title: "什么是浏览器同源策略？如何跨域？",
    content: "请解释同源策略和跨域方案。",
    answer: `**同源：**
协议、域名、端口相同

**跨域方案：**
- CORS
- JSONP
- 代理
- postMessage
- WebSocket
- Nginx反向代理`,
    analysis: "前端网络的基础问题。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["同源", "跨域", "CORS"],
  },
  {
    title: "什么是Vue的响应式原理？",
    content: "请解释Vue2和Vue3响应式的区别。",
    answer: `**Vue2：**
- Object.defineProperty
- 无法监听新增属性
- 无法监听数组索引

**Vue3：**
- Proxy
- 支持监听所有变化
- 惰性监听
- 性能更好`,
    analysis: "Vue的核心原理。",
    difficulty: "hard",
    categoryId: 2,
    tags: ["响应式", "Vue", "Proxy"],
  },
  {
    title: "什么是前端工程化？",
    content: "请解释前端工程化的概念。",
    answer: `**工程化内容：**
- 脚手架
- 构建工具
- 模块化
- 代码规范
- 测试
- CI/CD
- 部署

**工具链：**
- Webpack/Vite
- ESLint
- Prettier
- Jest/Vitest
- Babel
- TypeScript`,
    analysis: "现代前端开发的基础。",
    difficulty: "medium",
    categoryId: 7,
    tags: ["工程化", "前端", "工具链"],
  },
  {
    title: "什么是Git Flow？",
    content: "请解释常见的Git工作流。",
    answer: `**Git Flow：**
- master：生产
- develop：开发
- feature：功能
- release：发布
- hotfix：热修复

**Trunk Based：**
- 频繁提交到主干
- CI保证质量
- 适合CI/CD`,
    analysis: "团队协作的基础。",
    difficulty: "medium",
    categoryId: 7,
    tags: ["Git", "工作流", "协作"],
  },
];

async function batchImport() {
  try {
    const created = await Question.bulkCreate(aiMoreQuestions);
    console.log(`成功导入 ${created.length} 道AI和更多面试题`);
    process.exit(0);
  } catch (error) {
    console.error("导入失败:", error);
    process.exit(1);
  }
}

batchImport();
