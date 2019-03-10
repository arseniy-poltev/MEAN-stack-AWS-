import { IUser } from './user.model';

export interface IComment {
    user: IUser;
    comment: String;
}
