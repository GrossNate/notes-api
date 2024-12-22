"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeAssertString = safeAssertString;
function safeAssertString(val) {
    if (typeof val !== "string") {
        throw new Error("Unexpected type. Expected string.");
    }
}
