import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TourService } from 'projects/global/services';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {
  tours!: any;
  data!: any;

  filterForm = this.fb.group({
    keyword: [''],
    fromprice: [''],
    toprice: [''],
    fromdate: [''],
    todate: [''],
  }) as any;

  constructor(private tourService: TourService, private toastrService: ToastrService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.getAllTours();
  }

  getAllTours() {
    this.tourService.getAllTours().subscribe((tours: any) => {
      this.tours = [...tours];
      console.log(this.tours);
    });
  }

  getTourById(tourId: string) {
    this.tourService.getTourById(tourId).subscribe((data: any) => {
      this.data = {...data};
      console.log(this.data);
    });
  }

  deleteTour(tourId: any) {
    this.tourService.deleteTour(tourId).subscribe((res: any) => {
      if(res.status) {
        this.toastrService.success(JSON.stringify(res.message));
        this.getAllTours();
      } else {
        this.toastrService.error(JSON.stringify(res.message));
      }
    })
  }

  filterTour() {
    console.log(this.filterForm.value)
    this.tourService.getTourFilter(this.filterForm.value).subscribe((tours: any) => {
      this.tours = [...tours];
      console.log(this.tours);
    });
  }

  sortTour(event: any) {
    console.log(event.target.value);
    switch(event.target.value) {
      case '1':
        this.getAllTours();
        break;
      case '2':
        this.tourService.sortTourByName().subscribe((tours: any) => {
          this.tours = [...tours];
          console.log(tours);
        });
        break;
      case '3':
        this.tourService.sortTourByPriceAsc().subscribe((tours: any) => {
          this.tours = [...tours];
          console.log(tours);
        });
        break;
      case '4':
        this.tourService.sortTourByPriceDesc().subscribe((tours: any) => {
          this.tours = [...tours];
          console.log(tours);
        });
        break;
      case '5':
        this.tourService.sortTourByStartDate().subscribe((tours: any) => {
          this.tours = [...tours];
          console.log(tours);
        });
        break;
    }
  }

  editTour(tourId: any) {
    this.router.navigateByUrl(`/edit-tours?tourId=${tourId}`);
  }

}
