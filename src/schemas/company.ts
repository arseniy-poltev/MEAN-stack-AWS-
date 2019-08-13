import { Schema } from "mongoose";
import { ICompanyModel } from "../models/company";

export var companySchema: Schema = new Schema({
  name: String,
  products: [
    {
      name: String,
      units: Number
    }
  ]
});
companySchema.pre<ICompanyModel>("save", function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});