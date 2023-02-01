import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'projects/global/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  imageAvatar = '';

  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    phone: [''],
    address: [''],
    gender: [1],
    dob: [''],
    avatar: [null],
    customerId: [localStorage.getItem('accountId')],
    accountId: [localStorage.getItem('accountId')]
  });

  constructor(private fb: FormBuilder, private customerService: CustomerService, private toastrService: ToastrService, private cd: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.getDataProfile();
  }

  getDataProfile() {
    const accountId = localStorage.getItem('accountId');
    this.customerService.getCustomerById(accountId).subscribe((profile: any) => {
      console.log(profile);
      this.imageAvatar = profile.account[0].avatar;
      this.profileForm = this.fb.group({
        firstName: [profile.customer.firstName ? profile.customer.firstName : ''],
        lastName: [profile.customer.lastName ? profile.customer.lastName : ''],
        phone: [profile.customer.phone ? profile.customer.phone : ''],
        address: [profile.customer.address ? profile.customer.address : ''],
        gender: [profile.customer.gender ? profile.customer.gender : 0],
        dob: [profile.customer.dob ? profile.customer.dob : ''],
        avatar: [null],
        customerId: [accountId],
        accountId: [accountId],
      });
    });
  }

  changeAvatar() {
    const imagesValue = (this.profileForm.value.avatar as any).replace('C:\\fakepath\\', '');
    this.imageAvatar = imagesValue;
    this.cd.detectChanges();
  }

  submitProfile() {
    const imagesValue = (this.profileForm.value.avatar as any).replace('C:\\fakepath\\', '');
    this.customerService.updateCustomer({...this.profileForm.value, avatar: imagesValue}).subscribe((data: any) => {
      if(data.message) {
        this.toastrService.success(JSON.stringify(data.message));
        this.router.navigate(['/']);
      } else {
        this.toastrService.error(JSON.stringify(data.message));
      }
    });
  }

}
