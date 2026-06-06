const express = require("express");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// 管理员登录
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // 验证输入
    if (!username || !password) {
      return res.status(400).json({
        error: "用户名和密码不能为空",
        code: "VALIDATION_ERROR",
      });
    }

    // 查找管理员
    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      return res.status(401).json({
        error: "用户名或密码错误",
        code: "INVALID_CREDENTIALS",
      });
    }

    // 检查账号是否激活
    if (!admin.isActive) {
      return res.status(403).json({
        error: "账号已被禁用，请联系管理员",
        code: "ACCOUNT_DISABLED",
      });
    }

    // 验证密码
    const isValidPassword = await admin.validatePassword(password);

    if (!isValidPassword) {
      return res.status(401).json({
        error: "用户名或密码错误",
        code: "INVALID_CREDENTIALS",
      });
    }

    // 生成JWT令牌
    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }, // 7天有效期
    );

    // 更新最后登录时间
    await admin.update({ lastLoginAt: new Date() });

    res.json({
      success: true,
      message: "登录成功",
      data: {
        token,
        admin: admin.toJSON(),
        expiresIn: 7 * 24 * 60 * 60, // 秒
      },
    });
  } catch (error) {
    console.error("登录错误:", error);
    res.status(500).json({
      error: "服务器内部错误",
      code: "SERVER_ERROR",
    });
  }
});

// 获取当前登录管理员信息
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.admin.id);

    if (!admin) {
      return res.status(404).json({
        error: "管理员不存在",
        code: "NOT_FOUND",
      });
    }

    res.json({
      success: true,
      data: admin.toJSON(),
    });
  } catch (error) {
    console.error("获取管理员信息错误:", error);
    res.status(500).json({
      error: "服务器内部错误",
      code: "SERVER_ERROR",
    });
  }
});

// 登出（前端清除token即可，这里做记录）
router.post("/logout", authMiddleware, async (req, res) => {
  // 前端清除token即可，后端无需额外操作
  res.json({
    success: true,
    message: "登出成功",
  });
});

// 检查管理员是否存在（用于初始化）
router.get("/check-init", async (req, res) => {
  try {
    const count = await Admin.count();
    res.json({
      success: true,
      hasAdmin: count > 0,
    });
  } catch (error) {
    res.status(500).json({
      error: "服务器内部错误",
      code: "SERVER_ERROR",
    });
  }
});

module.exports = router;
