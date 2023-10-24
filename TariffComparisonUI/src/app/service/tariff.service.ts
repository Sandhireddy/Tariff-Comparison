import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TariffService {

  API_URL = `${environment.apiUrl}/tariff`;

  constructor(private _http: HttpClient) { }

  CalculateTariffa(params:any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin','*');
    return this._http.post(this.API_URL + '/calculation', params, {headers:headers})
  }
}
