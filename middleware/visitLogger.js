const https = require("https");
const VisitLog = require("../models/visitLog");

const geoCache = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000;

function getClientIP(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.ip || req.socket?.remoteAddress || "127.0.0.1";
}

function isLocalIP(ip) {
  if (!ip) return true;
  return /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|::1$|::ffff:127\.|localhost$)/.test(
    ip,
  );
}

function lookupGeoOnline(ip) {
  const cached = geoCache.get(ip);
  if (cached && Date.now() - cached.ts < CACHE_TTL)
    return Promise.resolve(cached.data);

  return new Promise((resolve) => {
    https
      .get(`https://ip-api.com/json/${ip}?fields=country,city`, (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            const data = JSON.parse(body);
            if (data.country) {
              const result = { country: data.country, city: data.city || "" };
              geoCache.set(ip, { data: result, ts: Date.now() });
              resolve(result);
            } else {
              resolve(null);
            }
          } catch {
            resolve(null);
          }
        });
      })
      .on("error", () => resolve(null));
  });
}

function visitLogger(req, res, next) {
  res.on("finish", async () => {
    if (res.statusCode >= 400) return;

    const ip = getClientIP(req);
    if (isLocalIP(ip)) return;

    const geo = await lookupGeoOnline(ip);

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
