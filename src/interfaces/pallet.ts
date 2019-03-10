import { IBox } from "./box";
import { IUser } from "./user";

export interface IPallet {
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