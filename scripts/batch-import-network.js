const sequelize = require("../config/database");
const Question = require("../models/question");

const networkQuestions = [
  {
    title: "HTTP和HTTPS有什么区别？",
    content: "请解释HTTP和HTTPS的区别及HTTPS的工作原理。",
    answer: `**主要区别：**
- HTTP：超文本传输协议，明文传输，不安全
- HTTPS：HTTP+SSL/TLS，加密传输，安全

**HTTPS工作流程：**
1. 客户端发起HTTPS请求
2. 服务端返回证书（包含公钥）
3. 客户端验证证书有效性
4. 客户端生成随机密钥，用公钥加密发送给服务端
5. 服务端用私钥解密获得随机密钥
6. 双方使用随机密钥进行对称加密通信

**端口：**
- HTTP：80
- HTTPS：443`,
    analysis: "HTTPS是面试重点，需要理解加密原理。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["HTTP", "HTTPS", "网络"],
  },
  {
    title: "HTTP方法有哪些？GET和POST的区别？",
    content: "请介绍常见的HTTP方法及GET和POST的区别。",
    answer: `**HTTP方法：**
- GET：获取资源
- POST：提交资源
- PUT：更新资源
- DELETE：删除资源
- PATCH：部分更新
- HEAD：获取响应头
- OPTIONS：获取允许的方法

**GET vs POST：**
1. 参数位置：GET在URL，POST在请求体
2. 安全性：POST相对安全
3. 长度限制：GET受URL长度限制
4. 缓存：GET可以缓存，POST不建议缓存
5. 幂等性：GET是幂等的`,
    analysis: "HTTP方法是基础，GET/POST区别是常见面试题。",
    difficulty: "easy",
    categoryId: 5,
    tags: ["HTTP方法", "GET", "POST"],
  },
  {
    title: "HTTP状态码有哪些？",
    content: "请列举常见的HTTP状态码及其含义。",
    answer: `**常见状态码：**
- 2xx：成功
  - 200：OK
  - 201：Created
  - 204：No Content
- 3xx：重定向
  - 301：永久重定向
  - 302：临时重定向
  - 304：Not Modified
- 4xx：客户端错误
  - 400：Bad Request
  - 401：Unauthorized
  - 403：Forbidden
  - 404：Not Found
- 5xx：服务器错误
  - 500：Internal Server Error
  - 502：Bad Gateway
  - 503：Service Unavailable`,
    analysis: "HTTP状态码是前端必备知识。",
    difficulty: "easy",
    categoryId: 5,
    tags: ["HTTP状态码", "网络"],
  },
  {
    title: "TCP和UDP的区别？",
    content: "请解释TCP和UDP协议的区别和适用场景。",
    answer: `**区别：**
| 特性 | TCP | UDP |
|------|-----|-----|
| 连接性 | 面向连接 | 无连接 |
| 可靠性 | 可靠 | 不可靠 |
| 传输速度 | 慢 | 快 |
| 拥塞控制 | 有 | 无 |
| 头部开销 | 大 | 小 |

**适用场景：**
- TCP：HTTP、HTTPS、FTP、邮件等需要可靠传输的场景
- UDP：视频直播、DNS、语音通话等对速度要求高的场景`,
    analysis: "TCP/UDP是网络基础，需要了解区别。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["TCP", "UDP", "协议"],
  },
  {
    title: "什么是跨域？如何解决？",
    content: "请解释跨域的概念和解决方案。",
    answer: `**跨域原因：**
浏览器同源策略，协议、域名、端口任意不同即为跨域。

**解决方案：**
1. **CORS** - 后端设置响应头
   \`\`\`javascript
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Methods: GET, POST
   \`\`\`
2. **JSONP** - 利用script标签无跨域限制
3. **代理** - 开发环境webpack devServer
4. **postMessage** - 跨窗口通信
5. **WebSocket** - 不受同源策略限制
6. **Nginx反向代理**`,
    analysis: "跨域是前端常见问题，CORS是现代解决方案。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["跨域", "CORS", "同源策略"],
  },
  {
    title: "什么是Cookie、Session、LocalStorage？",
    content: "请解释浏览器存储的几种方式和区别。",
    answer: `**Cookie：**
- 容量：4KB
- 有效期：可设置
- 自动发送：每次请求自动携带

**Session：**
- 存储在服务器
- 客户端通过Cookie存放sessionID
- 安全性高

**LocalStorage：**
- 容量：5-10MB
- 永久保存，需手动清除
- 不自动发送

**SessionStorage：**
- 容量：5-10MB
- 关闭页面即清除

**IndexedDB：**
- 大容量（几百MB）
- 支持事务`,
    analysis: "浏览器存储是前端常用技术，了解区别很重要。",
    difficulty: "easy",
    categoryId: 5,
    tags: ["Cookie", "Storage", "浏览器"],
  },
  {
    title: "什么是HTTP缓存？有哪些策略？",
    content: "请解释HTTP缓存机制和缓存策略。",
    answer: `**缓存类型：**
1. **强制缓存** - Cache-Control、Expires
2. **协商缓存** - Last-Modified、ETag

**Cache-Control指令：**
\`\`\`
Cache-Control: max-age=3600           // 缓存1小时
Cache-Control: no-cache              // 协商缓存
Cache-Control: no-store              // 不缓存
Cache-Control: public, max-age=3600
\`\`\`

**协商缓存验证：**
- Last-Modified/If-Modified-Since
- ETag/If-None-Match`,
    analysis: "HTTP缓存是性能优化的重要手段。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["缓存", "HTTP", "性能优化"],
  },
  {
    title: "输入URL到页面加载的完整流程？",
    content: "请描述浏览器从输入URL到渲染完成的完整过程。",
    answer: `**完整流程：**
1. **DNS解析** - 域名→IP地址
2. **建立连接** - TCP三次握手
3. **发送请求** - HTTP请求
4. **接收响应** - 服务器返回HTML
5. **解析渲染**
   - 构建DOM树
   - 构建CSSOM树
   - 合并为渲染树
   - 布局Layout
   - 绘制Paint
6. **执行JS**
7. **断开连接** - TCP四次挥手`,
    analysis: "这是经典面试题，需要完整理解浏览器工作原理。",
    difficulty: "hard",
    categoryId: 5,
    tags: ["浏览器", "渲染流程", "网络"],
  },
  {
    title: "WebSocket是什么？适用场景？",
    content: "请解释WebSocket的原理和应用场景。",
    answer: `**WebSocket：**
- 全双工通信
- 一次握手，持久连接
- 无同源限制

**适用场景：**
- 即时聊天
- 实时通知
- 在线协作
- 股票行情

**对比轮询：**
- 轮询：频繁请求，浪费资源
- WebSocket：双向通信，高效`,
    analysis: "WebSocket是实时通信的标准方案。",
    difficulty: "medium",
    categoryId: 5,
    tags: ["WebSocket", "实时通信", "网络"],
  },
];

async function batchImport() {
  try {
    const created = await Question.bulkCreate(networkQuestions);
    console.log(`成功导入 ${created.length} 道计算机网络面试题`);
    process.exit(0);
  } catch (error) {
    console.error("导入失败:", error);
    process.exit(1);
  }
}

batchImport();
