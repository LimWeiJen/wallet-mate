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
const utils_1 = require("../utils");
dotenv_1.default.config();
accountRouter.use((req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'invalid or missing token' });
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err)
            return res.status(500).json({ message: 'unable to verify user by the token given' });
        req.body.decoded = decoded;
        next();
    });
});
accountRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.decoded.username;
        if (!username)
            return res.status(500).json({ message: 'unable to authorize user' });
        yield database_1.client.connect();
        const db = database_1.client.db("database").collection("users");
        const user = yield db.findOne({ username });
        if (!user)
            return res.status(500).json({ message: 'unable to locate user in the database' });
        const accounts = user.accounts;
        yield database_1.client.close();
        return res.json({ success: true, accounts });
    }
    catch (error) {
        (0, utils_1.sendEmailNotification)(error);
        return res.status(500).json({ message: 'unexpected internal server error', fullError: error });
    }
}));
accountRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.decoded.username;
        const account = req.body.account;
        if (!account)
            return res.json({ success: false, status: 400 });
        if (!username)
            return res.status(500).json({ message: 'unable to authorize user' });
        yield database_1.client.connect();
        const db = database_1.client.db("database").collection("users");
        yield db.updateOne({ username }, { $push: { accounts: account } });
        yield database_1.client.close();
        return res.json({ success: true });
    }
    catch (error) {
        (0, utils_1.sendEmailNotification)(error);
        return res.status(500).json({ message: 'unexpected internal server error', fullError: error });
    }
}));
accountRouter.post('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.decoded.username;
        const account = req.body.account;
        const index = req.body.index;
        if (!account)
            return res.status(400).json({ message: 'missing or invalid account object' });
        if (!username)
            return res.status(500).json({ message: 'unable to authorize user' });
        yield database_1.client.connect();
        const db = database_1.client.db("database").collection("users");
        const user = yield db.findOne({ username });
        const accounts = user === null || user === void 0 ? void 0 : user.accounts;
        if (!accounts)
            return res.status(500).json({ message: 'cannot find accounts object in user object' });
        const newAccounts = [
            ...accounts === null || accounts === void 0 ? void 0 : accounts.slice(0, index),
            account,
            ...accounts === null || accounts === void 0 ? void 0 : accounts.slice(index + 1)
        ];
        yield db.updateOne({ username }, { $set: { accounts: newAccounts } });
        yield database_1.client.close();
        return res.json({ success: true });
    }
    catch (error) {
        (0, utils_1.sendEmailNotification)(error);
        return res.status(500).json({ message: 'unexpected internal server error', fullError: error });
    }
}));
accountRouter.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.decoded.username;
        const accountIndex = req.body.accountIndex;
        if (!username)
            return res.status(500).json({ message: 'unable to authorize user' });
        yield database_1.client.connect();
        const db = database_1.client.db("database").collection("users");
        const user = yield db.findOne({ username });
        if (!user)
            return res.status(500).json({ message: 'unable to locate user in the database' });
        let accounts = user.accounts;
        if (!accounts)
            return res.status(500).json({ message: 'cannot find accounts object in user object' });
        accounts.splice(accountIndex, 1);
        yield db.updateOne({ _id: user._id }, { $set: { accounts } });
        return res.json({ success: true });
    }
    catch (error) {
        (0, utils_1.sendEmailNotification)(error);
        return res.status(500).json({ message: 'unexpected internal server error', fullError: error });
    }
}));
exports.default = accountRouter;
