import Redis from "ioredis";
let redis;

if (!redis) {
  redis = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null, //  required for BullMQ
    enableReadyCheck: false, //  improves startup reliability
    tls: {}, // only if using Upstash or another secure host
  });
  redis.on("connect", () => {
    console.log("Redis connected successfully");
  });

  redis.on("error", (err) => {
    console.error("Redis connection error:", err);
  });
}

export default redis;
