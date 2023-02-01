import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'projects/global/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: [''],
    password: [''],
  });

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submitLogin() {
    console.log(this.loginForm.value);
    this.loginService.login(this.loginForm.value).subscribe((res: any) => {
      if(res?.account?.roles) {
        if(res.status) {
          this.toastrService.success(JSON.stringify(res.message));
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('accountId', res.account.accountId);
          this.router.navigate(['/']);
        } else {
          this.toastrService.error(JSON.stringify(res.message));
        }
      } else {
        this.toastrService.error('Bạn không phải là Admin');
      }
    });
  }

}
