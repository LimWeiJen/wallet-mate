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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// middleware that is specific to this router
transactionRouter.use((req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.json({ success: false, status: 401 });
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err)
            return res.json({ success: false, status: 500 });
        req.body.decoded = decoded;
        next();
    });
});
transactionRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.decoded.username;
    const transaction = req.body.transaction;
    if (!transaction)
        return res.json({ success: false, status: 400 });
    if (!username)
        return res.json({ success: false, status: 500 });
    yield database_1.client.connect();
    const db = database_1.client.db("database").collection("users");
    yield db.updateOne({ username }, { $push: {
            transactions: transaction
        } });
    yield database_1.client.close();
    return res.json({ success: true });
}));
transactionRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.decoded.username;
    if (!username)
        return res.json({ success: false, status: 500 });
    yield database_1.client.connect();
    const db = database_1.client.db("database").collection("users");
    const user = yield db.findOne({ username });
    if (!user)
        return res.json({ success: false, status: 500 });
    return res.json({ success: true, transactions: user.transactions });
}));
transactionRouter.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.decoded.username;
    const transactionIndex = req.body.transactionIndex;
    if (!username)
        return res.json({ success: false, status: 500 });
    yield database_1.client.connect();
    const db = database_1.client.db("database").collection("users");
    const user = yield db.findOne({ username });
    if (!user)
        return res.json({ success: false, status: 500 });
    let transactions = user.transactions;
    if (!transactions)
        return res.json({ success: false, status: 400 });
    transactions.splice(transactionIndex, 1);
    yield db.updateOne({ _id: user._id }, { $set: { transactions } });
    return res.json({ success: true });
}));
exports.default = transactionRouter;
