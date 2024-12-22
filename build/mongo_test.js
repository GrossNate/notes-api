"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./src/utils/config");
mongoose_1.default.set('strictQuery', false);
void mongoose_1.default.connect(config_1.MONGODB_URI !== null && config_1.MONGODB_URI !== void 0 ? config_1.MONGODB_URI : '').then(() => {
    const noteSchema = new mongoose_1.default.Schema({
        userId: String,
        content: String,
    });
    const Note = mongoose_1.default.model('Note', noteSchema);
    // const note = new Note({
    //   content: 'HTML is x',
    //   userId: 'testUser123',
    // });
    // void note.save().then(() => {
    //   console.log('note saved!');
    //   void mongoose.connection.close()
    // });
    void Note.find({}).then(result => {
        result.forEach(note => {
            console.log(note);
        });
        void mongoose_1.default.connection.close();
    });
});
