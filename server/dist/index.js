"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routers_1 = require("./routers");
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3001;
app.use((0, body_parser_1.default)());
app.use('/users', routers_1.userRouter);
app.use('/transactions', routers_1.transactionRouter);
app.use('/accounts', routers_1.accountRouter);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
exports.server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
