import { IUser } from "./user";

export interface IAction{
    user: IUser;
    date: Date;
    desc: String;
}