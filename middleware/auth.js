const jwt = require("jsonwebtoken");

// JWT验证中间件
function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "未授权，请先登录",
        code: "UNAUTHORIZED",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "无效的令牌",
        code: "INVALID_TOKEN",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 将用户信息附加到请求对象
    req.admin = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "令牌已过期，请重新登录",
        code: "TOKEN_EXPIRED",
      });
    }

    return res.status(401).json({
      error: "无效的令牌",
      code: "INVALID_TOKEN",
    });
  }
}

// 可选认证中间件（不强制要求登录）
function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
      }
    }
  } catch (error) {
    // 忽略验证错误，继续执行
  }

  next();
}

module.exports = { authMiddleware, optionalAuth };
