"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const config_1 = require("../utils/config");
const types_1 = require("../types");
const zodSchemas_1 = require("../zodSchemas");
const router = express_1.default.Router();
const getUsernameFromToken = (token) => {
    (0, types_1.safeAssertString)(config_1.TOKEN_SECRET);
    try {
        const userToken = jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECRET);
        if (typeof userToken === "object" &&
            userToken !== null &&
            "username" in userToken &&
            typeof userToken.username === "string") {
            return userToken.username;
        }
        return "";
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.JsonWebTokenError && err.message === "invalid token") {
            return "";
        }
        throw err;
    }
};
router.get("/:username", (req, res) => {
    const getNotesUser = zodSchemas_1.getNotesZodSchema.parse(req.body);
    const authenticatedUsername = getUsernameFromToken(getNotesUser.token);
    res.send(`Fetching notes for ${req.params.username} token: ${getNotesUser.token} authenticated to: ${authenticatedUsername}`);
});
router.get("/:noteId", (req, res) => {
    res.send(`Fetching note ${req.params.noteId}!`);
});
router.post("/", (req, res) => {
    res.send(`Saving new note: ${req.body}`);
});
router.put("/:noteId", (req, res) => {
    res.send(`Updating note ${req.params.noteId} with ${req.body}`);
});
exports.default = router;
