"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("../database");
const transactionRouter = express_1.default.Router();
// middleware that is specific to this router
transactionRouter.use((req, res, next) => {
    next();
});
transactionRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.client.connect();
    const db = database_1.client.db("database").collection("users");
}));
transactionRouter.get('/', (req, res) => {
});
transactionRouter.delete('/', (req, res) => {
});
exports.default = transactionRouter;
