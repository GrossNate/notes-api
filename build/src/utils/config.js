"use strict";
// Note that we're using dotenvx and encryption for all env variables.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_SECRET = exports.MONGODB_URI = exports.API_PORT = void 0;
exports.API_PORT = process.env.API_PORT;
exports.MONGODB_URI = process.env.MONGODB_URI;
exports.TOKEN_SECRET = process.env.TOKEN_SECRET;
