import Redis from "ioredis";
let redis;
let hasLoggedError = false;

if (!redis) {
  redis = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null, //  required for BullMQ
    enableReadyCheck: false, //  improves startup reliability
    tls: {}, // only if using Upstash or another secure host
    retryStrategy: () => null,
  });
  redis.on("connect", () => {
    console.log("Redis connected successfully");
  });

  redis.on("error", (err) => {
    if (!hasLoggedError) {
      console.error("Redis connection error:", err.message);
      hasLoggedError = true;
    }
  });
}

export default redis;
