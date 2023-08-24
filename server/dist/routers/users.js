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
const userRouter = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
userRouter.post('/sign-in', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        yield database_1.client.connect();
        const users = database_1.client.db("database").collection("users");
        const user = yield users.findOne({ username });
        if (user && user.password === password) {
            const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET);
            return res.status(200).json({ success: true, token });
        }
        if (!user)
            return res.status(404).json({ message: 'user not found' });
        return res.status(401).json({ message: 'invalid credentials' });
    }
    catch (error) {
        return res.status(500).json({ message: 'unexpected internal server error', fullError: error });
    }
}));
userRouter.post('/sign-up', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, name, password } = req.body;
        yield database_1.client.connect();
        const db = database_1.client.db("database");
        const users = db.collection("users");
        const usernames = yield db.collection("usernames").find({}).toArray();
        let duplicatedUsernames = false;
        usernames.forEach(uname => {
            if (uname.name === username)
                duplicatedUsernames = true;
        });
        if (duplicatedUsernames)
            return res.status(409).json({ message: 'duplicated username' });
        yield db.collection("usernames").insertOne({ name: username });
        const newUser = {
            name,
            username,
            password,
            transactions: [],
            accounts: []
        };
        yield users.insertOne(newUser);
        yield database_1.client.close();
        const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET);
        return res.status(200).json({ success: true, token });
    }
    catch (error) {
        return res.status(500).json({ message: 'unexpected internal server error', fullError: error });
    }
}));
userRouter.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        yield database_1.client.connect();
        const users = database_1.client.db("database").collection("users");
        yield users.deleteOne({ username, password });
        yield database_1.client.db("database").collection("usernames").deleteOne({ name: username });
        return res.json(({ success: true }));
    }
    catch (error) {
        return res.status(500).json({ message: 'unexpected internal server error', fullError: error });
    }
}));
exports.default = userRouter;
