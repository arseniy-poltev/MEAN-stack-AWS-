import { Schema } from "mongoose";
import { IProductModel } from "../models/product";

export var palletSchema: Schema = new Schema({
  boxes: [{
    order:{
      _id:String,
      status: String,
      ref: String,
      colors: [''],
      product: {
          name: String,
          units: Number
      },
      units: Number,
      image: String,
      operator: [
          {
            name: String,
            mail: String,
            password: String,
            rol: String
          }
        ],
      designer: [{
          name:String,
          mail: String,
          password: String,
          rol: String
      }],
      storer: {
          name: String,
          mail: String,
          password: String,
          rol: String
      },
      inDate: Date,
      outDate: Date,
      actions: [{
          user: {
              name: String,
              mail: String,
              password: String,
              rol: String
          },
          date: Date,
          desc: String
      }],
      modelRef: String,
      modelColor:String,
      comments: [
          {
              user:{
                  name: String,
                  mail: String,
                  password: String,
                  rol: String
              },
              comment: ''
          }
      ],
      company: String,
      visual: String,
      noSerie: Boolean
    },
    units:Number
  }],
  storer: {
    name: String,
    mail: String,
    password: String,
    rol: String
  },
  company: String,
  createdBy: String,
  status:String,
  storerDate: Date,
  outDate: Date,
  name: String,
  counter: Number
});
palletSchema.pre<IProductModel>("save", function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  if (!this.modifiedAt) {
    this.modifiedAt = new Date();
  }
  next();
});