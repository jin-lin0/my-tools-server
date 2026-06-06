const sequelize = require("../config/database");
const Question = require("../models/question");

const engineeringQuestions = [
  {
    title: "Webpack和Vite有什么区别？",
    content: "请对比Webpack和Vite的特点和区别。",
    answer: `**Webpack：**
- 传统打包工具，先打包再提供服务
- 生态丰富，插件众多
- 适合大型项目，生产构建优化好

**Vite：**
- 基于ES Module，开发阶段直接启动
- 开发服务器快，热更新快
- 开箱即用，配置简单
- 适合现代项目，Vue/React项目推荐

**核心区别：**
- Webpack：bundle-based（打包所有模块）
- Vite：native-ESM（利用浏览器原生ES模块）`,
    analysis: "构建工具是工程化重点，需要了解主流方案。",
    difficulty: "medium",
    categoryId: 7,
    tags: ["Webpack", "Vite", "构建工具"],
  },
  {
    title: "什么是Git？常用命令有哪些？",
    content: "请介绍Git版本控制和常用命令。",
    answer: `**Git基本概念：**
- 分布式版本控制系统
- 工作区、暂存区、版本库

**常用命令：**
\`\`\`bash
# 基础
git init
git clone
git status
git add
git commit
git push
git pull

# 分支
git branch
git checkout
git merge
git rebase

# 其他
git log
git reset
git stash
\`\`\``,
    analysis: "Git是开发必备技能，需要熟练掌握。",
    difficulty: "easy",
    categoryId: 7,
    tags: ["Git", "版本控制", "工具"],
  },
  {
    title: "什么是Babel？有什么作用？",
    content: "请解释Babel的作用和工作原理。",
    answer: `**Babel作用：**
- 转译ES6+代码为ES5，兼容旧浏览器
- 转译JSX、TypeScript等
- 支持插件和预设

**工作流程：**
1. 解析Parse - 生成AST抽象语法树
2. 转换Transform - 转换AST节点
3. 生成Generate - 根据AST生成代码`,
    analysis: "Babel是现代前端工程化必不可少的工具。",
    difficulty: "medium",
    categoryId: 7,
    tags: ["Babel", "转译", "工程化"],
  },
  {
    title: "什么是CI/CD？",
    content: "请解释持续集成和持续部署的概念。",
    answer: `**CI（持续集成）：**
- 频繁将代码集成到主干
- 自动化测试和构建

**CD（持续部署/持续交付）：**
- 持续交付：自动化部署到生产前的环境
- 持续部署：自动化部署到生产

**常见工具：**
- Jenkins
- GitHub Actions
- GitLab CI/CD
- CircleCI`,
    analysis: "CI/CD是现代开发流程的重要组成部分。",
    difficulty: "medium",
    categoryId: 7,
    tags: ["CI/CD", "工程化", "DevOps"],
  },
  {
    title: "如何优化Webpack构建速度？",
    content: "请列举Webpack构建优化的常见策略。",
    answer: `**优化策略：**
1. **减少搜索范围**
   - 配置resolve.modules
   - 使用别名
   - 配置test/include/exclude

2. **使用缓存**
   - babel-loader开启缓存
   - cache-loader
   - hard-source-webpack-plugin

3. **多线程**
   - thread-loader
   - HappyPack

4. **代码分割**
   - splitChunks

5. **优化图片**
   - image-webpack-loader

6. **tree-shaking**
   - 只支持ES Module`,
    analysis: "构建优化是工程化的重要方面，提升开发体验。",
    difficulty: "hard",
    categoryId: 7,
    tags: ["Webpack优化", "构建", "性能优化"],
  },
  {
    title: "什么是NPM/Yarn？常用命令？",
    content: "请介绍包管理器的常用命令。",
    answer: `**NPM常用命令：**
\`\`\`bash
npm init
npm install
npm install package --save
npm install package --save-dev
npm update
npm uninstall
npm run
\`\`\`

**Yarn常用命令：**
\`\`\`bash
yarn init
yarn install
yarn add package
yarn add --dev package
yarn upgrade
yarn remove
yarn run
\`\`\``,
    analysis: "包管理器是前端开发的基础工具。",
    difficulty: "easy",
    categoryId: 7,
    tags: ["NPM", "Yarn", "包管理"],
  },
  {
    title: "什么是模块化？CommonJS和ES Module的区别？",
    content: "请解释模块化的概念和几种方案的区别。",
    answer: `**模块化的好处：**
- 避免命名冲突
- 提高代码复用
- 便于维护

**CommonJS：**
- Node.js使用
- 同步加载
- module.exports/require

**ES Module：**
- 浏览器/Node.js 12+
- 异步加载
- import/export
- 静态分析，支持tree-shaking`,
    analysis: "模块化是JavaScript工程化的基础。",
    difficulty: "medium",
    categoryId: 7,
    tags: ["模块化", "CommonJS", "ES Module"],
  },
];

async function batchImport() {
  try {
    const created = await Question.bulkCreate(engineeringQuestions);
    console.log(`成功导入 ${created.length} 道工程化面试题`);
    process.exit(0);
  } catch (error) {
    console.error("导入失败:", error);
    process.exit(1);
  }
}

batchImport();
