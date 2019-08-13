import { IBox } from "./box.model";
import { IUser } from "./user.model";

export interface IPallet {
    _id?: string;
    boxes: IBox[];
    storer: IUser;   
    company:String; 
    outDate: Date;
    status: String;
    storerDate: Date;
    createdBy: String;
    name: string;
    counter: number;
}