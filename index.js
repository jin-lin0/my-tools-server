const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/database");

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 测试路由
app.get("/", (req, res) => {
  res.send("AI Chat Server is running");
});

// 健康检查（公开）
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 管理员认证路由
const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

// 消息路由
const messagesRouter = require("./routes/messages");
app.use("/api/messages", messagesRouter);

// 网易云音乐 API 路由
const neteaseRouter = require("./routes/netease");
app.use("/api/netease", neteaseRouter);

// 面试题库路由 - 管理操作需要认证
const questionsRouter = require("./routes/questions");
app.use("/api/questions", questionsRouter);

// 应用市场路由
const marketRouter = require("./routes/market");
app.use("/api/market", marketRouter);

// 同步数据库模型
sequelize
  .sync()
  .then(() => {
    // 根据环境决定是否启动监听
    if (!process.env.VERCEL) {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }
    console.log("Database synced successfully");
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });

module.exports = app;
