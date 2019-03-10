import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { IConfig } from '../models/config.model';
import { HttpClient } from '@angular/common/http';
import { CommonUtils } from '../utils/common.utils';
import { Router } from '@angular/router';
import { IToken } from '../models/token.model';
import { IUser } from '../models/user.model';
import { IMessage } from '../models/message.model';
import * as socketIoClient from 'socket.io-client';
import { IEmit } from '../models/emit.model';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
    private nameSessionUser = 'user-session';
    private pathToken = '/api/token/';
    private urlConfig = 'assets/config.json';
    private _loadingPage = new BehaviorSubject<boolean>(true);
    private _message = new BehaviorSubject<IMessage>(null);
    private _user = new BehaviorSubject<IUser>(null);
    private _config = new BehaviorSubject<IConfig>(null);
    private _token = new BehaviorSubject<IToken>(null);
    private _socket = new BehaviorSubject<IEmit>(null);

    message = this._message.asObservable();
    loadingPage = this._loadingPage.asObservable();
    user = this._user.asObservable();
    config = this._config.asObservable();
    token = this._token.asObservable();
    socket = this._socket.asObservable();
    constructor(
        private http: HttpClient,
        private common: CommonUtils,
        private router: Router) {
        this.getToken();
        this.validateUser();
    }
    private validateUser() {
        if (sessionStorage[this.nameSessionUser] !== null && sessionStorage[this.nameSessionUser] !== undefined) {
            //console.log(sessionStorage[this.nameSessionUser]);
            this.changeUser(JSON.parse(sessionStorage[this.nameSessionUser]));
        }
    }
    changeUser(inUser: IUser) {
        if (inUser !== null) {
            sessionStorage[this.nameSessionUser] = JSON.stringify(inUser);
            this.config.subscribe((config) => {
                if (config != null) {
                    timer(config.expSesionTime).subscribe(() => {
                        this.changeUser(null);
                        alert('this session has expired');
                        this.router.navigate(['/Auth']);
                    });
                }
            });
        } else {
            sessionStorage.removeItem(this.nameSessionUser);
        }
        this._user.next(inUser);
    }
    changePageState(state: boolean) {
        this._loadingPage.next(state);
    }
    notify(inMessage: IMessage) {
        this._message.next(inMessage);
    }
    changeConfig(inConfig: IConfig) {
        this._config.next(inConfig);
    }
    private configSocket(config: IConfig) {
        const socket = socketIoClient(config.socketUrl);
        socket.on(config.eventNameDB, (emit: IEmit) => {
            console.log(emit);
            this._socket.next(emit);
        });
    }
    private getToken() {
        this.changePageState(true);
        this.http.get<IConfig>(this.urlConfig).subscribe((config) => {
            this.changeConfig(config);
            this.configSocket(config);
            const userApi: IUser = {
                name: 'api',
                mail: config.userApi,
                password: this.common.createHash(config.passUserApi)
            };
            const url = `${config.endpointUrl}${this.pathToken}`;
            this.http.post<any>(url, userApi).subscribe((token) => {
                this._token.next(token);
                this.changePageState(false);
            });
        });
    }
}
