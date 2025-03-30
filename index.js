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

// 消息路由
const messagesRouter = require("./routes/messages");
app.use("/messages", messagesRouter);

// 同步数据库模型
sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });

module.exports = app;
