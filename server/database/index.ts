import { MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv';

dotenv.config();

export const client = new MongoClient(process.env.MONGODB_URI!, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
