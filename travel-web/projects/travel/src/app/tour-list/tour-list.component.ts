import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TourService } from 'projects/global/services';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss']
})
export class TourListComponent implements OnInit {
  data!: any;
  params!: any;

  constructor(private tourService: TourService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if(params['keyword'] || params['fromprice'] || params['toprice'] || params['fromdate'] || params['todate']) {
        this.params = {...params};
        this.getFilterTours();
      } else {
        this.getAllTours();
      }
    });
  }

  getAllTours() {
    this.tourService.getAllTours().pipe(
      map((res: any) => res.filter((tour: any) => tour.tourId >= 1))
    ).subscribe((res: any) => {
      this.data = [...res];
      console.log(res);
    })
  }

  getFilterTours() {
    console.log(this.params);
    this.tourService.getTourFilter(this.params).subscribe((res: any) => {
      this.data = [...res];
      console.log(res);
    });
  }

}
