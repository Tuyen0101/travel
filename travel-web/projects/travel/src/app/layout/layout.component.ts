import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'projects/global/services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isMenu = false;
  isLogin = false;
  profile!: any;

  constructor(
    private customerService: CustomerService,
    private cd: ChangeDetectorRef,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
    if(localStorage.getItem('token')) {
      this.isLogin = true;
      this.getMyProfile();
    } else {
      this.isLogin = false;
    }
    this.cd.detectChanges();
  }

  getMyProfile() {
    const accountId = localStorage.getItem('accountId');
    this.customerService.getCustomerById(accountId).subscribe((profile: any) => {
      this.profile = {...profile};
      console.log(this.profile);
    });
  }

  toggleMenu() {
    this.isMenu = !this.isMenu;
  }

  logout() {
    localStorage.clear();
    this.isLogin = false;
    this.toastrService.success('Đăng xuất thành công');
    this.cd.detectChanges();
  }

}
