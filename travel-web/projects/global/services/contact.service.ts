import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/travel/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getAllContacts() {
    return this.http.get(`${environment.apiUrl}api/getAllContacts`);
  }

  createContact(data: any) {
    return this.http.post(`${environment.apiUrl}api/createContact`, data);
  }

}
