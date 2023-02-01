import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsComponent } from './news/news.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
import { TourListComponent } from './tour-list/tour-list.component';
import {PaymentComponent} from "./payment/payment.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'list', component: TourListComponent },
      { path: 'detail/:id', component: TourDetailComponent },
      { path: 'news', component: NewsComponent },
      { path: 'news-detail', component: NewsDetailComponent },
      { path: 'booking', component: BookingComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'payment', component: PaymentComponent },
      { path: '',   redirectTo: 'home', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
