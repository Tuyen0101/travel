import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/travel/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(`${environment.apiUrl}api/login`, data);
  }

}
