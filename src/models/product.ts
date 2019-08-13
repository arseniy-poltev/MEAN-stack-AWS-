import { Document } from "mongoose";
import { IProduct } from "../interfaces/product";
export interface IProductModel extends IProduct, Document {
    createdAt: Date;
    modifiedAt: Date;
}