import "dotenv/config";
import Redis from "ioredis";

const queueConnection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  tls: {},
});

if (process.env.NODE_ENV !== "production") {
  queueConnection.on("connect", () => {
    console.log("Connected to Redis");
  });
}

queueConnection.on("error", (err) => {
  console.error("Redis Connection Error:", err.message);
});

export default queueConnection;
