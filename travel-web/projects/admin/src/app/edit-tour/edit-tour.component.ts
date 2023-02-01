import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TourService } from 'projects/global/services';

@Component({
  selector: 'app-edit-tour',
  templateUrl: './edit-tour.component.html',
  styleUrls: ['./edit-tour.component.scss']
})
export class EditTourComponent implements OnInit {

  params!: any;
  tourForm = this.fb.group({
    tourName: [''],
    description: [''],
    schedule: [''],
    startDate: [''],
    endDate: [''],
    urlImage: [[null]],
    location: ['https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235442.87008700846!2d104.85895313190044!3d22.772993615341093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x36cd416833ee9ad5%3A0xe1f42da2bbc76727!2zdHQuIFNhIFBhLCBTYSBQYSwgTMOgbyBDYWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1667809449377!5m2!1svi!2s'],
    priceAdult: [''],
    priceChildren: [''],
    priceInfant: [''],
    typeTourId: ['1'],
  });

  constructor(private fb: FormBuilder, private tourService: TourService, private toastrService: ToastrService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.getInfoTourByTourId(params['tourId']);
      this.params = {...params};
    });
  }

  getInfoTourByTourId(tourId: any) {
    this.tourService.getTourById(tourId).subscribe((data: any) => {
      console.log(data);
      this.tourForm = this.fb.group({
        tourName: [data.tour.tourName],
        description: [data.tour.description],
        schedule: [data.tour.schedule],
        startDate: [data.tour.startDate.replace(' 00:00:00', '')],
        endDate: [data.tour.endDate.replace(' 00:00:00', '')],
        urlImage: [[null]],
        location: ['https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235442.87008700846!2d104.85895313190044!3d22.772993615341093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x36cd416833ee9ad5%3A0xe1f42da2bbc76727!2zdHQuIFNhIFBhLCBTYSBQYSwgTMOgbyBDYWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1667809449377!5m2!1svi!2s'],
        priceAdult: [data.tour.priceAdult],
        priceChildren: [data.tour.priceChildren],
        priceInfant: [data.tour.priceInfant],
        typeTourId: [data.tour.typeTourId],
      });
    });
  }

  editTour() {
    const imagesValue = (this.tourForm.value.urlImage as any).replace('C:\\fakepath\\', '');
    this.tourService.editTour(this.params.tourId, {...this.tourForm.value, urlImage: imagesValue}).subscribe((res: any) => {
      if(res.status) {
        this.toastrService.success(JSON.stringify(res.message));
        this.router.navigate(['/tours']);
      } else {
        this.toastrService.error(JSON.stringify(res.message));
      }
    });
  }

}
