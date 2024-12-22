import mongoose from "mongoose";
import { MONGODB_URI } from "./src/utils/config";

mongoose.set('strictQuery', false);
void mongoose.connect(MONGODB_URI ?? '').then(() => {
  const noteSchema = new mongoose.Schema({
    userId: String,
    content: String,
  });

  const Note = mongoose.model('Note', noteSchema);

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
    void mongoose.connection.close();
  });
});