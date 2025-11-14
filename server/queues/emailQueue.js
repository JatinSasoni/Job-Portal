import { Queue } from "bullmq";
import redis from "../utils/redis.js";

export const emailQueue = new Queue(process.env.EMAIL_QUEUE_NAME, {
  connection: redis,
});
