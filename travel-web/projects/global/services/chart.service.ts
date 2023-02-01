import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/travel/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChartService {

  constructor(private http: HttpClient) { }

  getDataCustomerChart() {
    return this.http.get(`${environment.apiUrl}api/customerChart`);
  }

  getDataTurnoverChart() {
    return this.http.get(`${environment.apiUrl}api/priceChart`);
  }

}
