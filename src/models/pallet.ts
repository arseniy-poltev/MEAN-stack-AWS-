import { Document } from "mongoose";
import { IPallet } from "../interfaces/pallet";
export interface IPalletModel extends IPallet, Document {
    createdAt: Date;
    modifiedAt: Date;
}