import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'projects/global/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  InputForms = [
    // {
    //   type: 'text',
    //   placeholder: 'Fullname',
    //   formControlName: 'fullname'
    // },
    {
      type: 'text',
      placeholder: 'Email',
      formControlName: 'email'
    },
    // {
    //   type: 'text',
    //   placeholder: 'Phone',
    //   formControlName: 'phone'
    // },
    {
      type: 'text',
      placeholder: 'Tài khoản',
      formControlName: 'username'
    },
    {
      type: 'password',
      placeholder: 'Mật khẩu',
      formControlName: 'password'
    },
    // {
    //   type: 'text',
    //   placeholder: 'Address',
    //   formControlName: 'address'
    // },
    // {
    //   type: 'date',
    //   placeholder: 'dob',
    //   formControlName: 'dob'
    // },
    // {
    //   type: 'file',
    //   placeholder: 'Avatar',
    //   formControlName: 'avatar'
    // },
  ];

  registerForm = this.fb.group({
    email: [''],
    username: [''],
    password: [''],
    avatar: [''],
    roles: [1]
  });


  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  submitRegister() {
    this.registerService.register(this.registerForm.value).subscribe((res: any) => {
      if(res.status) {
        this.toastrService.success(JSON.stringify(res.message));
        this.router.navigate(['/login']);
      } else {
        this.toastrService.error(JSON.stringify(res.message));
      }
    });
  }

}
