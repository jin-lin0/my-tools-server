const { authMiddleware } = require("./auth");

function superAdminOnly(req, res, next) {
  if (!req.admin || req.admin.role !== "super_admin") {
    return res.status(403).json({
      error: "需要超级管理员权限",
      code: "FORBIDDEN",
    });
  }
  next();
}

module.exports = { authMiddleware, superAdminOnly };
