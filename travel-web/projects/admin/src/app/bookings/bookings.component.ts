import { Component, OnInit } from '@angular/core';
import { BookingService } from 'projects/global/services';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  bookings!: any;
  profile!: any;
  tour!: any;
  account!: any;
  bookingDetail!: any;
  booking!: any;

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.getAllBookings();
  }

  getAllBookings() {
    this.bookingService.getAllBookings().subscribe((bookings: any) => {
      this.bookings = [...bookings];
      console.log(this.bookings);
    })
  }

  getBookingById(bookingId: any) {
    this.bookingService.getBookingByBookingId(bookingId).subscribe((res: any) => {
      this.profile = {...res.customer[0]};
      this.tour = {...res.tour[0]};
      this.account = {...res.account[0]};
      this.bookingDetail = {...res.bookingDetail[0]};
      this.booking = {...res.booking};
      console.log('profile', this.profile);
      console.log('tour', this.tour);
      console.log('account', this.account);
      console.log('bookingDetail', this.account);
      console.log('booking', this.booking);
    })
  }

}
