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
const express_1 = require("express");
const user_1 = require("../models/user");
const zodSchemas_1 = require("../zodSchemas");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../utils/config");
const types_1 = require("../types");
const router = (0, express_1.Router)();
router.get("/", (_req, res) => {
    res.send("This route is for testing only!");
});
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = zodSchemas_1.userZodSchema.parse(req.body);
        const saltRounds = 10;
        const hashPassword = yield bcrypt_1.default.hash(newUser.clearPassword, saltRounds);
        const userToCreate = new user_1.User({ username: newUser.username, hashPassword });
        const savedUser = yield userToCreate.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(`Error: ${error.message}`);
        }
        else {
            res.status(400).send("Something went wrong.");
        }
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginUser = zodSchemas_1.userZodSchema.parse(req.body);
        const user = yield user_1.User.findOne({ username: loginUser.username });
        const passwordCorrect = user === null
            ? false
            : yield bcrypt_1.default.compare(loginUser.clearPassword, user.hashPassword);
        if (passwordCorrect) {
            const userForToken = { username: loginUser.username };
            (0, types_1.safeAssertString)(config_1.TOKEN_SECRET);
            const token = jsonwebtoken_1.default.sign(userForToken, config_1.TOKEN_SECRET);
            res.status(200).send({ token, username: userForToken.username });
        }
        else {
            res.status(401).json({ error: "invalid username or password" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(`Error: ${error.message}`);
        }
        else {
            res.status(400).send("Something went wrong.");
        }
    }
}));
exports.default = router;
