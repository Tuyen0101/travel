import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomerService } from 'projects/global/services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users!: any;
  inpurForm = new FormControl('');
  selectForm = new FormControl('1');

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.customerService.getAllCustomers().subscribe((users: any) => {
      this.users = [...users];
      console.log(users);
    })
  }

  searchCustomer() {
    this.customerService.filrerCustomerByName(this.inpurForm.value).subscribe((users: any) => {
      this.users = [...users];
      console.log(users);
    });
  }

  sortCustomer() {
    if(this.selectForm.value === '2') {
      this.customerService.sortCustomerByFirstName().subscribe((users: any) => {
        this.users = [...users];
        console.log(users);
      });
    } else {
      this.getAllUsers();
    }

  }

}
