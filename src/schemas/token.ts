import { Schema } from "mongoose";
import { ITokenModel } from "../models/token";

export var tokenSchema: Schema = new Schema({
  token: String,
  initDate: Date,
  expDate: Date
});
