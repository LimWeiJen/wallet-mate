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
const accountRouter = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
accountRouter.use((req, res, next) => {
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
accountRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.decoded.username;
    if (!username)
        return res.json({ success: false, status: 500 });
    yield database_1.client.connect();
    const db = database_1.client.db("database").collection("users");
    const user = yield db.findOne({ username });
    if (!user)
        return res.json({ success: false, status: 500 });
    const accounts = user.accounts;
    yield database_1.client.close();
    return res.json({ success: true, accounts });
}));
accountRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.decoded.username;
    const account = req.body.account;
    if (!account)
        return res.json({ success: false, status: 400 });
    if (!username)
        return res.json({ success: false, status: 500 });
    yield database_1.client.connect();
    const db = database_1.client.db("database").collection("users");
    yield db.updateOne({ username }, { $push: { accounts: account } });
    yield database_1.client.close();
    return res.json({ success: true });
}));
accountRouter.post('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.decoded.username;
    const account = req.body.account;
    const index = req.body.index;
    if (!account)
        return res.json({ success: false, status: 400 });
    if (!username)
        return res.json({ success: false, status: 500 });
    yield database_1.client.connect();
    const db = database_1.client.db("database").collection("users");
    const user = yield db.findOne({ username });
    const accounts = user === null || user === void 0 ? void 0 : user.accounts;
    if (!accounts)
        return res.json({ success: false, status: 500 });
    const newAccounts = [
        ...accounts === null || accounts === void 0 ? void 0 : accounts.slice(0, index),
        account,
        ...accounts === null || accounts === void 0 ? void 0 : accounts.slice(index + 1)
    ];
    console.log(newAccounts);
    yield db.updateOne({ username }, { $set: { accounts: newAccounts } });
    yield database_1.client.close();
    return res.json({ success: true });
}));
accountRouter.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.decoded.username;
    const accountIndex = req.body.accountIndex;
    if (!username)
        return res.json({ success: false, status: 500 });
    yield database_1.client.connect();
    const db = database_1.client.db("database").collection("users");
    const user = yield db.findOne({ username });
    if (!user)
        return res.json({ success: false, status: 500 });
    let accounts = user.accounts;
    if (!accounts)
        return res.json({ success: false, status: 400 });
    accounts.splice(accountIndex, 1);
    yield db.updateOne({ _id: user._id }, { $set: { accounts } });
    return res.json({ success: true });
}));
exports.default = accountRouter;
