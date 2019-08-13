import { IUser } from './user.model';
import { IProduct } from './product.model';
import { IAction } from './action.model';
import { IComment } from './comment.model';
import { ICompany } from './company.model';
export interface IOrder {
    _id?: string;
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
    modelColor: String;
    comments: IComment[];
    company: ICompany | String;
    visual: String;    
    noSerie: Boolean;
}
