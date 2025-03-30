const express = require("express");
const router = express.Router();
const Message = require("../models/message");

// 创建消息
router.post("/", async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取所有消息
router.get("/", async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取单个消息
router.get("/:id", async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 更新消息
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Message.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedMessage = await Message.findByPk(req.params.id);
      return res.json(updatedMessage);
    }
    throw new Error("Message not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 删除消息
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Message.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      return res.json({ message: "Message deleted" });
    }
    throw new Error("Message not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
