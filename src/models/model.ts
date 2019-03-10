import { Model } from "mongoose";
import { IUserModel } from "./user";
import { IPalletModel } from "./pallet";
import { ICompanyModel } from "./company";
import { IActionModel } from "./action";
import { ITokenModel } from "./token";
import { IOrderModel } from "./order";

export interface IModel {
  user: Model<IUserModel>;
  pallet: Model<IPalletModel>;
  company: Model<ICompanyModel>;
  action: Model<IActionModel>;
  token: Model<ITokenModel>;
  order: Model<IOrderModel>;
}