import { Queue } from "bullmq";
import redis from "../utils/redis.js";

export const emailQueue = new Queue("emailQueue", {
  connection: redis,
});
