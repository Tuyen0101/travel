import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/travel/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getAllBookings() {
    return this.http.get(`${environment.apiUrl}api/getAllBookings`);
  }

  getBookingByBookingId(bookingId: any) {
    return this.http.get(`${environment.apiUrl}api/getOneBooking/${bookingId}`);
  }

  createBooking(data: any) {
    return this.http.post(`${environment.apiUrl}api/createBooking`, data);
  }

}
