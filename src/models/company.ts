import { Document } from "mongoose";
import { ICompany } from "../interfaces/company";
export interface ICompanyModel extends ICompany, Document{
    createdAt:Date;
}