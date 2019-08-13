import { IUser } from './user.model';

export interface IAction {
    user: IUser;
    date: Date;
    desc: String;
}
