import { Document } from "mongoose";
import { IAction } from "../interfaces/action";
export interface IActionModel extends IAction, Document{
    modifiedAt: Date;
}