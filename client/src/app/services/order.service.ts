import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IToken } from '../models/token.model';
import { IConfig } from '../models/config.model';
import { IOrder } from '../models/order.model';
import { Observable } from 'rxjs';
import { ICompany } from '../models/company.model';
import { ICommonRequest } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private pathFindByCompany = '/api/order/findbycompany';
  private pathFindByCompanyAndState = '/api/order/findByCompanyAndState';
  private pathUpdateOrder = '/api/order/update';
  private pathCreate = '/api/order/create';
  private pathDelete = '/api/order/delete';
  constructor(
    private http: HttpClient
  ) { }
  getOrdersByCompany(token: IToken, config: IConfig, company: ICompany): Observable<IOrder[]> {
    const url = `${config.endpointUrl}${this.pathFindByCompany}`;
    const req: ICommonRequest = {
      token: token.token,
      data: company
    };
    return this.http.post<IOrder[]>(url, req);
  }
  getOrdersByCompanyAndState(token: IToken, config: IConfig, company: ICompany, state: String): Observable<IOrder[]> {
    const url = `${config.endpointUrl}${this.pathFindByCompanyAndState}`;
    const req: ICommonRequest = {
      token: token.token,
      data: company,
      state: state
    };
    
    return this.http.post<IOrder[]>(url, req);
  }
  create(token: IToken, config: IConfig, order): Observable<IOrder> {
    const url = `${config.endpointUrl}${this.pathCreate}`;
    const req: ICommonRequest = {
      token: token.token,
      data: order
    };    
    return this.http.post<IOrder>(url, req);
  }
  delete(token: IToken, config: IConfig, order): Observable<IOrder> {
    const url = `${config.endpointUrl}${this.pathDelete}`;
    const req: ICommonRequest = {
      token: token.token,
      data: order
    };
    return this.http.post<IOrder>(url, req);
  }
  update(token: IToken, config: IConfig, order): Observable<IOrder> {
    const url = `${config.endpointUrl}${this.pathUpdateOrder}`;
    const req: ICommonRequest = {
      token: token.token,
      data: order
    };   
    console.log(req) 
    return this.http.post<IOrder>(url, req);

  }
}
