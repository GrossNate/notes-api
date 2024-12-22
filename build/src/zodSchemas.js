"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.containsTokenStringZodSchema = exports.getNotesZodSchema = exports.userZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userZodSchema = zod_1.default.object({
    username: zod_1.default.string(),
    clearPassword: zod_1.default.string()
});
exports.getNotesZodSchema = zod_1.default.object({
    username: zod_1.default.string(),
    token: zod_1.default.string()
});
exports.containsTokenStringZodSchema = zod_1.default.object({
    token: zod_1.default.string(),
    username: zod_1.default.string()
});
