import { Schema } from "mongoose";
import { IOrderModel } from "../models/order";

export var orderSchema = new Schema({
    status: String,
    ref: String,
    colors: [''],
    product: {
        name: String,
        units: Number
        }
    ,
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
    }
);
orderSchema.pre<IOrderModel>("save", function(next) {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
    next();
  });