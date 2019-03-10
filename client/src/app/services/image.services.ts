import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IToken } from '../models/token.model';
import { IConfig } from '../models/config.model';
import { IImage } from 'src/app/models/image.model';
import { ICommonRequest } from '../models/common.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private pathUpload = '/api/image/create';
  
  constructor(
    private http: HttpClient
  ) { }
  uploadImage(image: any, config: IConfig, token: IToken): Observable<any> {
    const url = config.endpointUrl + this.pathUpload;
    const req: ICommonRequest = {token: token.token, data: image};
    console.log(req)
    return this.http.post<any>(url, req);
  } 

}
