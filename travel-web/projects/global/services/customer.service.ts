import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/travel/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllCustomers() {
    return this.http.get(`${environment.apiUrl}api/getAllCustomers`);
  }

  getCustomerById(customerId: string | null) {
    return this.http.get(`${environment.apiUrl}api/getOneCustomer/${customerId}`);
  }

  updateCustomer(data: any) {
    return this.http.put(`${environment.apiUrl}api/updateCustomer`, data);
  }

  sortCustomerByCreatedAt() {
    return this.http.get(`${environment.apiUrl}api/sortCustomer?sortBy=customerId&sortOrder=desc`);
  }

  sortCustomerByFirstName() {
    return this.http.get(`${environment.apiUrl}api/sortCustomer?sortBy=firstName&sortOrder=asc`);
  }

  filrerCustomerByName(keyword: any) {
    return this.http.get(`${environment.apiUrl}api/filterCustomer?keyword=${keyword}`);
  }

}
