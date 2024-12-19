"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send('Fetching notes!');
});
router.get('/:noteId', (req, res) => {
    res.send(`Fetching note ${req.params.noteId}!`);
});
router.post('/', (req, res) => {
    res.send(`Saving new note: ${req.body}`);
});
router.put('/:noteId', (req, res) => {
    res.send(`Updating note ${req.params.noteId} with ${req.body}`);
});
exports.default = router;
