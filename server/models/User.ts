import mongoose from "mongoose";
const { Schema } = mongoose;

export interface IUser {
  googleId: string;
  name: string;
}

export const UserSchema = new Schema<IUser>({
  googleId: String,
  name: String,
});
