"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRouter = exports.userRouter = void 0;
const transactions_1 = __importDefault(require("./transactions"));
exports.transactionRouter = transactions_1.default;
const users_1 = __importDefault(require("./users"));
exports.userRouter = users_1.default;
