import { IUser } from "./user";
import { IProduct } from "./product";
import { IAction } from "./action";
import { IComment } from "./comment";
import { ICompany } from "./company";
export interface IOrder{
    status: String;
    ref: String;
    colors: String[];
    product: IProduct;
    units: Number;
    image: String;
    designer: IUser[];
    operator: IUser[];
    storer: IUser;
    inDate: Date;
    outDate: Date;
    actions: IAction[];
    modelRef: String;
    modelColor:String;
    comments: IComment[];
    company: ICompany;
    visual: String;
}
