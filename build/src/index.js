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
const notes_1 = __importDefault(require("./routes/notes"));
const user_1 = __importDefault(require("./routes/user"));
const mongoose_1 = require("mongoose");
const config_1 = require("./utils/config");
const types_1 = require("./types");
const zodSchemas_1 = require("./zodSchemas");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
;
const checkAuthentication = (req, res, next) => {
    const parsedToken = zodSchemas_1.containsTokenStringZodSchema.parse(req.body);
    if (parsedToken.token !== "") {
        (0, types_1.safeAssertString)(config_1.TOKEN_SECRET);
        try {
            const userTokenObj = jsonwebtoken_1.default.verify(parsedToken.token, config_1.TOKEN_SECRET);
            if (typeof userTokenObj === "object" &&
                userTokenObj !== null &&
                "username" in userTokenObj &&
                typeof userTokenObj.username === "string") {
                if (parsedToken.username === userTokenObj.username) {
                    req.authedUsername = parsedToken.username;
                    next();
                }
                else {
                    res.send(401);
                }
            }
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.JsonWebTokenError && err.message === "invalid token")
                console.log("invalid token sent");
            res.send(401);
        }
    }
    else {
        console.log("token not sent");
        res.send(401);
    }
};
(0, types_1.safeAssertString)(config_1.MONGODB_URI);
void (0, mongoose_1.connect)(config_1.MONGODB_URI);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/notes', checkAuthentication, notes_1.default);
app.use('/api/user', user_1.default);
app.listen(config_1.API_PORT, () => {
    console.log(`Server running on port ${config_1.API_PORT}`);
});
