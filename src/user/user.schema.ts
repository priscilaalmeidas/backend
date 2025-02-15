/* eslint-disable prettier/prettier */
import { Schema, Document } from 'mongoose';
export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true },
);

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}
