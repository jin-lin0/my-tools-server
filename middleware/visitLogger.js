const https = require("https");
const VisitLog = require("../models/visitLog");

const geoCache = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000;

function getClientIP(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.ip || req.socket?.remoteAddress || "127.0.0.1";
}

function isLocalIP(ip) {
  if (!ip) return true;
  return /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|::1$|::ffff:127\.|localhost$)/.test(ip);
}

function fetchGeo(ip) {
  return new Promise((resolve) => {
    const req = https.get(`https://ip-api.com/json/${ip}?fields=country,city`, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const data = JSON.parse(body);
          if (data.country) resolve({ country: data.country, city: data.city || "" });
          else resolve(null);
        } catch { resolve(null); }
      });
    });
    req.setTimeout(1000, () => { req.destroy(); resolve(null); });
    req.on("error", () => resolve(null));
  });
}

async function visitLogger(req, res, next) {
  const ip = getClientIP(req);

  if (!isLocalIP(ip)) {
    let geo = null;
    const cached = geoCache.get(ip);
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      geo = cached.data;
    } else {
      geo = await fetchGeo(ip);
      if (geo) geoCache.set(ip, { data: geo, ts: Date.now() });
    }

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
  }

  next();
}

module.exports = visitLogger;
