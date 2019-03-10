import { Schema } from "mongoose";
import { IActionModel } from "../models/action";

export var actionSchema: Schema = new Schema({
  user: {
    name: String,
    mail: String,
    password: String,
    rol: String
  },
  date: Date,
  desc: String
});
actionSchema.pre<IActionModel>("save", function(next) {
  if (!this.modifiedAt) {
    this.modifiedAt = new Date();
  }
  next();
});