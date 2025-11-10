const Redis = require("ioredis");
let redis;

if (!redis) {
  redis = new Redis(process.env.REDIS_URL, { tls: {} });
  redis.on("connect", () => {
    console.log("Redis connected successfully");
  });

  redis.on("error", (err) => {
    console.error("Redis connection error:", err);
  });
}

module.exports = redis;
