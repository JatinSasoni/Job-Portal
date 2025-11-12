const redis = require("../utils/redis");

exports.clearCache = async (patterns = []) => {
  try {
    for (const pattern of patterns) {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    }
  } catch (err) {
    console.error("Redis cache invalidation error:", err.message);
  }
};
