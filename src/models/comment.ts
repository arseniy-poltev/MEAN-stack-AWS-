import { IComment } from "../interfaces/comment";
import { Document } from "mongoose";

export interface ICommentModel extends IComment, Document{
    
}