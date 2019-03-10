import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IToken } from '../models/token.model';
import { IConfig } from '../models/config.model';
import { ICompany } from '../models/company.model';
import { Observable } from 'rxjs';
import { ICommonRequest } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private pathGetAllCompanies = '/api/company/getall';
  constructor(
    private http: HttpClient
  ) { }
  getCompanies(token: IToken, config: IConfig): Observable<ICompany[]> {
    const url = `${config.endpointUrl}${this.pathGetAllCompanies}`;
    const req: ICommonRequest = {
      token: token.token
    };
    return this.http.post<ICompany[]>(url, req);
  }
}
