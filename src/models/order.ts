import { Document } from "mongoose";
import { IOrder } from "../interfaces/order";
export interface IOrderModel extends IOrder, Document{
    createdAt:Date;
}