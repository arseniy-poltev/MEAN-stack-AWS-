import { Schema } from "mongoose";
import { IUserModel } from "../models/user";

export var userSchema: Schema = new Schema({
  name: String,
  mail: String,
  password: String,
  rol: String
});
userSchema.pre<IUserModel>("save", function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});