"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisGetAsync = exports.redisClient = exports.client = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
const redis_1 = require("redis");
const util_1 = require("util");
dotenv_1.default.config();
exports.client = new mongodb_1.MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});
exports.redisClient = (0, redis_1.createClient)({
    password: process.env.REDIS_SECRET,
    socket: {
        host: 'redis-14030.c295.ap-southeast-1-1.ec2.cloud.redislabs.com',
        port: 14030
    }
});
exports.redisGetAsync = (0, util_1.promisify)(exports.redisClient.get).bind(exports.redisClient);
