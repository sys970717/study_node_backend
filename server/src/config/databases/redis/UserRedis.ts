import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export const UserRedis = redis.createClient({
  port: Number(env.USER_REDIS_PORT || 6379),
  host: env.USER_REDIS_ENDPOINT || 'localhost',
});
