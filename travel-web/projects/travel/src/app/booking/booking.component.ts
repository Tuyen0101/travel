import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingService, CustomerService, TourService } from 'projects/global/services';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  profile!: any;
  tour!: any;
  paymentId: any
  payment: any
  params!: any;

  constructor(
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private tourService: TourService,
    private bookingService: BookingService,
    private router: Router
  ) {
    this.paymentId = this.activatedRoute.snapshot.params['paymentId']
  }

  ngOnInit(): void {
    const accountId = localStorage.getItem('accountId');
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.params = {...params};
      this.getTourByTourId(params['tourId']);
    });
    this.getProfile(accountId);
  }

  getProfile(accountId: any) {
    this.customerService.getCustomerById(accountId).subscribe((profile: any) => {
      this.profile = {...profile};
      console.log(profile);
    })
  }

  getTourByTourId(tourId: any) {
    console.log(this.params);
    this.tourService.getTourById(tourId).subscribe((tour: any) => {
      this.tour = {
        ...tour,
        numberAdult: this.params.numberAdult,
        numberChildren: this.params.numberChildren,
        numberInfant: this.params.numberInfant,
        paymentId: this.params.paymentId,
        totalMoney: +this.params.numberAdult * +tour.tour.priceAdult +  +this.params.numberChildren * +tour.tour.priceChildren
      };
      this.paymentId = this.tour.paymentId
      switch (this.paymentId){
        case '1':
          this.payment = 'Thanh toán trực tiếp'
          break
        case '2':
          this.payment = 'VIettel Money'
          break
        case '3':
          this.payment = 'Momo'
          break
        case '4':
          this.payment = 'Thẻ Visa'
          break
      }
    });
  }

  createBooking() {
    const nowDate = new Date();
    this.bookingService.createBooking({
      customerId: localStorage.getItem('accountId'),
      bookingTime: nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate(),
      status: 1,
      totalPrice: this.tour.totalMoney,
      tourId: this.params.tourId,
      typeRoomId: this.params.typeRoomId,
      numberAdult: this.params.numberAdult,
      numberChildren: this.params.numberChildren,
      numberInfant: this.params.numberInfant,

    }).subscribe((res: any) => {
      if(res.status) {
        this.toastrService.success(JSON.stringify(res.message));
        this.router.navigate(['payment']);
      }
    })
  }

}
