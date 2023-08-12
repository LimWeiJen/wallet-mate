"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.client = new mongodb_1.MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});
