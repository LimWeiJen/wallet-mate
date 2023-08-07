import { MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv';
import { createClient } from 'redis';
import { promisify } from 'util';

dotenv.config();

export const client = new MongoClient(process.env.MONGODB_URI!, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const redisClient = createClient({
    password: process.env.REDIS_SECRET!,
    socket: {
        host: 'redis-14030.c295.ap-southeast-1-1.ec2.cloud.redislabs.com',
        port: 14030
    }
});

export const redisGetAsync = promisify(redisClient.get).bind(redisClient)