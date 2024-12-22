import { Schema, model } from "mongoose";
import { IUser } from "../types";

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  hashPassword: {
    type: String,
    required: true,
  }
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject)  => {
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

export const User = model<IUser>('User', userSchema);