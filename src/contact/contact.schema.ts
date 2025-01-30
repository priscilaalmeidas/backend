/* eslint-disable prettier/prettier */
import { Schema, Document } from 'mongoose';
export const ContactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
  },
  { timestamps: true },
);

export interface Contact extends Document {
  id: string;
  name: string;
  email: string;
  phone: string;
}
