import "dotenv/config";
import Redis from "redis";

const queueConnection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

queueConnection.on("connect", () => {
  console.log("Connected to Redis ");
});

queueConnection.on("error", (err) => {
  console.error("Redis Connection Error:", err);
});

export default queueConnection;
