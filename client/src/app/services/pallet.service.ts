import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IToken } from '../models/token.model';
import { IConfig } from '../models/config.model';
import { IPallet } from '../models/pallet.model';
import { Observable } from 'rxjs';
import { ICompany } from '../models/company.model';
import { ICommonRequest } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class PalletService {

  private pathFindByCompany = '/api/pallet/findbycompany';
  private pathFIndByCompanyAndCreator = '/api/pallet/findbycompanyAndCreator';
  private pathCreate = '/api/pallet/create';
  private pathUpdatePallet = '/api/pallet/update';
  private pathDelete = '/api/pallet/delete';
  constructor(
    private http: HttpClient
  ) { }
  getPalletsByCompany(token: IToken, config: IConfig, company: ICompany): Observable<IPallet[]> {
    const url = `${config.endpointUrl}${this.pathFindByCompany}`;
    const req: ICommonRequest = {
      token: token.token,
      data: company      
    };
    
    
    return this.http.post<IPallet[]>(url, req);
  }
  getOrdersByCompanyAndCreator(token: IToken, config: IConfig, company: ICompany, createdBy: String): Observable<IPallet[]> {
    const url = `${config.endpointUrl}${this.pathFIndByCompanyAndCreator}`;
    const req: ICommonRequest = {
      token: token.token,
      data: company,
      createdBy: createdBy
    };
   
    
    return this.http.post<IPallet[]>(url, req);
  }
  create(token: IToken, config: IConfig, pallet): Observable<IPallet> {
    const url = `${config.endpointUrl}${this.pathCreate}`;
    const req: ICommonRequest = {
      token: token.token,
      data: pallet
    };
    return this.http.post<IPallet>(url, req);
  }
  update(token: IToken, config: IConfig, pallet): Observable<IPallet> {
    const url = `${config.endpointUrl}${this.pathUpdatePallet}`;
    const req: ICommonRequest = {
      token: token.token,
      data: pallet
    };
    return this.http.post<IPallet>(url, req);
  }
  delete(token: IToken, config: IConfig, pallet): Observable<IPallet> {
    const url = `${config.endpointUrl}${this.pathDelete}`;
    const req: ICommonRequest = {
      token: token.token,
      data: pallet
    };
    return this.http.post<IPallet>(url, req);
  }
}
