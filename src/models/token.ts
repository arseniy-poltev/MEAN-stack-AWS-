import { Document } from "mongoose";
import { IToken } from "../interfaces/token";

export interface ITokenModel extends IToken,Document{
    
}