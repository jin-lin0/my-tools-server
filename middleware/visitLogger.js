const geoip = require("geoip-lite");
const VisitLog = require("../models/visitLog");

function getClientIP(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.ip || req.socket?.remoteAddress || "127.0.0.1";
}

function isLocalIP(ip) {
  if (!ip) return true;
  return /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|::1$|::ffff:127\.|localhost$)/.test(ip);
}

function visitLogger(req, res, next) {
  res.on("finish", () => {
    if (res.statusCode >= 400) return;

    const ip = getClientIP(req);
    if (isLocalIP(ip)) return;

    const geo = geoip.lookup(ip);

    const today = new Date().toISOString().slice(0, 10);

    VisitLog.findOrCreate({
      where: {
        date: today,
        path: req.path,
        country: geo?.country || "",
        city: geo?.city || "",
      },
    })
      .then(([record]) => record.increment("count", { by: 1 }))
      .catch(() => {});
  });

  next();
}

module.exports = visitLogger;
