import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.getItem('token')) {
      // console.log('login guard');
      return of(true);
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}
