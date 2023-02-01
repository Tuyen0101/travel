import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/travel/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getAllReviewsByTourId(tourId: string) {
    return this.http.get(`${environment.apiUrl}api/getAllReviewsByTour/${tourId}`);
  }

  createReview(data: any) {
    return this.http.post(`${environment.apiUrl}api/createReview`, data);
  }

  updateReview(reviewId: any, data: any) {
    return this.http.put(`${environment.apiUrl}api/updateReview/${reviewId}`, data);
  }

  deleteReview(reviewId: any) {
    return this.http.delete(`${environment.apiUrl}api/deleteReview/${reviewId}`);
  }

}
