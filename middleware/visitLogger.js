const VisitLog = require("../models/visitLog");

function getClientIP(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.ip || req.socket?.remoteAddress || "127.0.0.1";
}

function isLocalIP(ip) {
  if (!ip) return true;
  return /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|::1$|::ffff:127\.|localhost$)/.test(ip);
}

function getGeoFromVercelHeaders(headers) {
  const country = headers["x-vercel-ip-country"];
  const city = headers["x-vercel-ip-city"];
  if (country) return { country, city: city || "" };
  return null;
}

async function visitLogger(req, res, next) {
  if (!req.path.startsWith("/api/") || req.path.startsWith("/api/stats")) return next();

  const ip = getClientIP(req);
  if (isLocalIP(ip)) return next();

  const geo = getGeoFromVercelHeaders(req.headers);

  const today = new Date().toISOString().slice(0, 10);
  try {
    const [record] = await VisitLog.findOrCreate({
      where: {
        date: today,
        path: req.path,
        country: geo?.country || "",
        city: geo?.city || "",
      },
    });
    await record.increment("count", { by: 1 });
  } catch {}

  next();
}

module.exports = visitLogger;
