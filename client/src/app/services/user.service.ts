import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IToken } from '../models/token.model';
import { IConfig } from '../models/config.model';
import { IUser } from '../models/user.model';
import { ICommonRequest } from '../models/common.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private pathFindUsers = '/api/user/find';
  private pathFindUsersByRol = '/api/user/findByRol';
  private pathFindAllUsers = '/api/user/getAll';
  private pathCreateUser = '/api/user/create';
  private pathUpdateUser = '/api/user/update';
  private pathDeleteUser = '/api/user/delete';
  constructor(
    private http: HttpClient
  ) { }
  validateLogin(user: IUser, config: IConfig, token: IToken): Observable<IUser> {
    const url = config.endpointUrl + this.pathFindUsers;
    const req: ICommonRequest = {token: token.token, data: user};
    return this.http.post<IUser>(url, req);
  }
  getUsersByRol(rol:string, config:IConfig, token:IToken): Observable<IUser[]>{
    const url = config.endpointUrl + this.pathFindUsersByRol;
    const req: ICommonRequest = {token: token.token, data: rol};
    return this.http.post<IUser[]>(url, req);
  }
  getAllUsers(config:IConfig, token:IToken): Observable<IUser[]>{
    const url = config.endpointUrl + this.pathFindAllUsers;
    const req: ICommonRequest = {token: token.token};
    return this.http.post<IUser[]>(url,req);
  }
  create(user:IUser, config:IConfig, token:IToken):Observable<IUser>{
    const url = config.endpointUrl + this.pathCreateUser;
    const req: ICommonRequest = {token: token.token, data: user};
    return this.http.post<IUser>(url, req);
  }
  update(user:IUser, config:IConfig, token:IToken):Observable<IUser>{
    const url = config.endpointUrl + this.pathUpdateUser;
    const req: ICommonRequest = {token: token.token, data: user};
    return this.http.post<IUser>(url, req);
  }
  delete(user:IUser, config:IConfig, token:IToken):Observable<IUser>{
    const url = config.endpointUrl + this.pathDeleteUser;
    const req: ICommonRequest = {token: token.token, data: user};
    return this.http.post<IUser>(url, req);
  }

}
