import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTourComponent } from './add-tour/add-tour.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ConactsComponent } from './conacts/conacts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditTourComponent } from './edit-tour/edit-tour.component';
import { LoginGuard } from './guards';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { ToursComponent } from './tours/tours.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    // canActivate: [LoginGuard],
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'tours', component: ToursComponent },
      { path: 'add-tours', component: AddTourComponent },
      { path: 'edit-tours', component: EditTourComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: 'contacts', component: ConactsComponent },
      { path: '',   redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
