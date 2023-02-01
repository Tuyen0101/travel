import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReviewService, TourService } from 'projects/global/services';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss']
})
export class TourDetailComponent implements OnInit {

  schema = `
  <b>NGÀY 1: HÀ NỘI – SAPA (ĂN: TRƯA, TỐI)</b></br></br>

  - 06h00: Xe và HDV của Công ty LUXTOUR đón quý khách tại điểm hẹn,  khởi hành đến SAPA. Trên đường di chuyển đoàn khách dừng chân nghỉ ngơi ăn sáng (chi phí tự túc). </br>
  - 12h00: Đến SAPA, quý khách ăn trưa, nghỉ ngơi và chiều quý khách bắt đầu hành trình khám phá văn hóa vùng đất nên thơ này. </br>
  - 14h00: Quý khách thăm quan bản Cát Cát. Đây là bản làng cổ nằm giữa núi rừng Tây Bắc. Bản Cát Cát đẹp như một bức tranh, nơi đây thu hút du khách bởi Cầu Treo, Thác Nước, Guồng nước và những bãi hoa trải dài mê hoặc du khách khi bước chân đến đây. Thăm những nếp nhà của người Giáy, Mông, Dao, trong bản Cát Cát, quý khách sẽ không khỏi ngỡ ngàng trước vẻ đẹp thơ mộng của một trong những ngôi làng cổ đẹp nhất Sapa.</br>
  - 19h00: Ăn tối tại khách sạn</br>
  - 20h00: Quý khách cùng tận hưởng bầu không khí trong lành mát mẻ cùng với các món ăn đặc sản hương Tây Bắc núi rừng như: Lợn rừng, rau rừng,…Sau khi dùng bữa tối xong, quý khách có thể thăm quan nhà thờ, chợ Tình Sapa và mua những thức quà đặc sản ở chợ đêm.</br>
  </br>
  <b>NGÀY 2: SAPA – FANSIPAN (ĂN: SÁNG, TRƯA, TỐI)</b></br></br>

  - 6h30: Quý khách thức dậy, tận hưởng không khí dịu mát nơi núi rừng và dùng bữa sáng tại khách sạn.</br>
  - 7h30: Đoàn khởi hành tham quan và chinh phục đỉnh Fansipan, ngọn núi cao nhất Việt Nam (3.143 m) thuộc dãy núi Hoàng Liên Sơn, cách thị trấn Sa Pa khoảng 9km về phía Tây Nam. Giờ đây du khách có thể chinh phục “Nóc nhà Đông Dương” với hệ thống cáp treo Fansipan SaPa dài 6,2km đạt 2 kỷ lục Guinness thế giới: Cáp treo ba dây có độ chênh giữa ga đi và ga đến lớn nhất thế giới: 1410m và Cáp treo ba dây dài nhất thế giới: 6292.5m. Ngồi trên cáp treo, du khách có thể cảm nhận được hình ảnh thiên nhiên hùng vĩ, chiêm ngưỡng được khung cảnh bao la của thung lũng Mường Hoa và rừng quốc gia Hoàng Liên từ trên cao. Ngoài ra, du khách còn có thể đến hành hương tại Khu du lịch tâm linh – Chùa Trình, Chùa Hạ tại ga đến (chi phí cáp treo tự túc).</br>
  - 12h00: Quý khách dùng bữa trưa</br>
  - 14h00: Sau khi quý khách dùng bữa trưa xong Hướng dẫn viên và xe đón quý khách đi thăm khu du lịch Thác Bạc. Từ xa du khách đã nghe được tiếng suối réo rắt rượt đuổi nhau đổ về thác Bạc – SaPa. Nơi đây bốn mùa hoa trái, bốn mùa sương mờ giăng khắp lối. Ở Thác Bạc vào mùa Hạ du khách vẫn cảm nhận được không khí se se lạnh.  </br>
  - 18h00: Quý khách cùng tận hưởng bầu không khí trong lành mát mẻ cùng với các món ăn đặc sản hương Tây Bắc núi rừng như: Lợn rừng, rau rừng,…</br>
  - 19h00: Sau khi dùng bữa tối xong, quý khách có thể thăm quan nhà thờ, chợ Tình Sapa và mua những thức quà đặc sản ở chợ đêm.</br>
  </br>
  <b>NGÀY 3: SAPA – NÚI HÀM RỒNG – HÀ NỘI (ĂN: TRƯA, TỐI)</b></br></br>

  - 6h30: Sau khi dùng bữa sáng, Hướng Dẫn Viên đưa quý khách đi tham quan núi Hàm Rồng thăm vườn Lan khoe sắc, vườn hoa Trung Tâm, đứng ở đây du khách có thể ngắm được Núi Fansipan hùng vĩ, Cổng Trời Sapa, Đầu Rồng Thạch Lâm, Sân Mây.</br>
  - 12h00: Dùng bữa trưa. Sau khi dùng bữa, xe và hướng dẫn viên đưa quý khách quay lại thành phố Hà Nội thân yêu theo đường cao tốc và tạm biệt Sapa, kết thúc chương trình.</br>
  `

  data!: any;
  reviews!: any;
  rating!: number;
  customerId = localStorage.getItem('accountId');
  mode: 'create' | 'update' = 'create';
  reviewId!: any;
  isLogin = false;
  typeRoomId = 1;
  paymentId = 1;
  tourId: any;
  typeRooms = [
    {
      typeRoomId: 1,
      title: 'Phòng cơ bản',
    },
    {
      typeRoomId: 2,
      title: 'Phòng cao cấp',
    },
    {
      typeRoomId: 3,
      title: 'Phòng 2 giường',
    },
    {
      typeRoomId: 4,
      title: 'Phòng view đẹp',
    },
  ];

  payments = [
    {
      paymentId: 1,
      title: 'Thanh toán trực tiếp',
    },
    {
      paymentId: 2,
      title: 'Viettel Money',
    },
    {
      paymentId: 3,
      title: 'Banking',
    },
    {
      paymentId: 4,
      title: 'Visa',
    },
  ];

  reviewForm = this.fb.group({
    title: [''],
    content: [''],
  });

  bookingForm = this.fb.group({
    numberAdult: [''],
    numberChildren: [''],
    numberInfant: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private reviewService: ReviewService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private toastrService: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    const tourId = this.route.snapshot.paramMap.get('id');
    this.tourId = this.route.snapshot.paramMap.get('id');
    this.getTourById(tourId);
    this.checkLogin();
  }

  checkLogin() {
    if(localStorage.getItem('token')) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    this.cd.detectChanges();
  }

  getTourById(tourId: any) {
    this.tourService.getTourById(tourId).subscribe((tour: any) => {
      this.data = {...tour};
      this.getAllReviewsByTourId(tourId);
      console.log(this.data);
      console.log(this.data?.tour?.location)
    })
  }

  getAllReviewsByTourId(tourId: any) {
    this.reviewService.getAllReviewsByTourId(tourId).subscribe((reviews: any) => {
      this.reviews = [...reviews];
      console.log(this.reviews);
    })
  }

  selectRating(i: number) {
    this.rating = i;
    this.cd.detectChanges();
  }

  resetFormReview() {
    this.reviewForm = this.fb.group({
      title: [''],
      content: [''],
    });
    this.rating = -1;
    this.mode = 'create';
    this.reviewId = 0;
  }

  createReview() {
    const tourId = this.route.snapshot.paramMap.get('id');
    this.reviewService.createReview({
      customerId: localStorage.getItem('accountId'),
      tourId: tourId,
      rating: this.rating + 1,
      title: this.reviewForm.value.title,
      content: this.reviewForm.value.content,
    }).subscribe((res: any) => {
      if(res.status) {
        this.toastrService.success(JSON.stringify(res.message));
        this.getAllReviewsByTourId(tourId);
        this.resetFormReview();
        this.cd.detectChanges();
      } else {
        this.toastrService.error(JSON.stringify(res.message));
      }
    });
  }

  selectUpdateReview(review: any) {
    this.mode = 'update';
    this.reviewForm = this.fb.group({
      title: [review.title],
      content: [review.content],
    });
    this.rating = review.rating - 1;
    this.reviewId = review.reviewId;
    this.cd.detectChanges();
  }

  updateReview() {
    const tourId = this.route.snapshot.paramMap.get('id');
    this.reviewService.updateReview(+this.reviewId, {
      rating: this.rating + 1,
      title: this.reviewForm.value.title,
      content: this.reviewForm.value.content,
    }).subscribe((res: any) => {
      if(res.status) {
        this.toastrService.success(JSON.stringify(res.message));
        this.getAllReviewsByTourId(tourId);
        this.resetFormReview();
        this.cd.detectChanges();
      } else {
        this.toastrService.error(JSON.stringify(res.message));
      }
    });
  }

  deleteReview(reviewId: any) {
    const tourId = this.route.snapshot.paramMap.get('id');
    this.reviewService.deleteReview(reviewId).subscribe((res: any) => {
      if(res.status) {
        this.toastrService.success(JSON.stringify(res.message));
        this.getAllReviewsByTourId(tourId);
        this.cd.detectChanges();
      } else {
        this.toastrService.error(JSON.stringify(res.message));
      }
    })
  }

  counter(i: number) {
    return new Array(i);
  }

  selectValueTyperoom(typeRoomId: any) {
    this.typeRoomId = typeRoomId;
  }

  selectValuePayment(paymentId: any) {
    this.paymentId = paymentId;
  }

  submitBooking() {
    if(!this.bookingForm.value.numberAdult){
      this.toastrService.error('Hãy nhập số người tham gia')
      return
    }
    const numberAdult = this.bookingForm.value.numberAdult;
    const numberChildren = this.bookingForm.value.numberChildren;
    const numberInfant = this.bookingForm.value.numberInfant;
    console.log(this.bookingForm.value);
    this.router.navigateByUrl(`/booking?tourId=${this.tourId}&numberAdult=${numberAdult}&numberChildren=${numberChildren}&numberInfant=${numberInfant}&typeRoomId=${this.typeRoomId}&paymentId=${this.paymentId}`);
  }

}
