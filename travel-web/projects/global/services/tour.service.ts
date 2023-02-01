import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/travel/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }

  getAllTours() {
    return this.http.get(`${environment.apiUrl}api/getAllTours`);
  }

  getTourById(tourId: string | null) {
    return this.http.get(`${environment.apiUrl}api/getOneTour/${tourId}`);
  }

  sortTourByStartDate() {
    return this.http.get(`${environment.apiUrl}api/sortTour?sortBy=startDate&sortOrder=asc`);
  }

  sortTourByPriceAsc() {
    return this.http.get(`${environment.apiUrl}api/sortTour?sortBy=priceAdult&sortOrder=asc`);
  }

  sortTourByPriceDesc() {
    return this.http.get(`${environment.apiUrl}api/sortTour?sortBy=priceAdult&sortOrder=desc`);
  }

  sortTourByName() {
    return this.http.get(`${environment.apiUrl}api/sortTour?sortBy=tourName&sortOrder=asc`);
  }

  getTourFilter(data: { keyword: string, typetour: number, fromdate: string, todate: string, fromprice: string, toprice: string }) {
    return this.http.get(`${environment.apiUrl}api/filterTour?keyword=${data.keyword ? data.keyword : ''}&typetour=${data.typetour ? data.typetour : ''}&fromdate=${data.fromdate ? data.fromdate : ''}&todate=${data.todate ? data.todate : ''}&fromprice=${data.fromprice ? data.fromprice : ''}&toprice=${data.toprice ? data.toprice :''}`)
  }

  // getTourFilter(data: { keyword: string, typetour: number, fromdate: string, todate: string, fromprice: string, toprice: string }) {
  //   return this.http.get(`${environment.apiUrl}api/filterTour?keyword=${data.keyword}&typetour=${data.typetour}&fromdate=${data.fromdate}&todate=${data.todate}&fromprice=${data.fromprice}&toprice=${data.toprice}`)
  // }

  deleteTour(tourId: any) {
    return this.http.delete(`${environment.apiUrl}api/deleteTour/${tourId}`);
  }

  createTour(data: any) {
    return this.http.post(`${environment.apiUrl}api/createTour`, data);
  }

  editTour(tourId: any, data: any) {
    return this.http.put(`${environment.apiUrl}api/updateTour/${tourId}`, data);
  }
}
