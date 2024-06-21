import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpCommonService {

  baseUrl = environment.apiUrl;
  mobileBaseUrl = environment.apiUrl;
  //baseUrl = environment.baseUrlLocalhost;
  constructor(private _http: HttpClient) {}

  postCall(routeUrl: string, data: any): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}${routeUrl}`, data);
  }

  postMobileCall(routeUrl: string, data: any): Observable<any> {
    return this._http.post<any>(`${this.mobileBaseUrl}${routeUrl}`, data);
  }
  getCall(routeUrl: string): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}${routeUrl}`);
  }

  putCall(routeUrl: string, data: any): Observable<any> {
    return this._http.put<any>(`${this.baseUrl}${routeUrl}`, data);
  }

  patchCall(routeUrl:string,data:any):Observable<any>
  {
    return this._http.patch<any>(`${this.baseUrl}${routeUrl}`,data);
  }
  deleteCall(routeUrl: string, id: any): Observable<any> {
    return this._http.delete<any>(`${this.baseUrl}${routeUrl}/${id}`);
  }
}
