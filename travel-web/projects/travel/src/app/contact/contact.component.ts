import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'projects/global/services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contentForm = new FormControl('');

  constructor(private contactService: ContactService, private toastrService: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  createContact() {
    console.log(this.contentForm.value);
    this.contactService.createContact({content: this.contentForm.value, customerId: localStorage.getItem('accountId')}).subscribe((contact: any) => {
      if(contact.status) {
        this.toastrService.success(JSON.stringify(contact.message));
        this.router.navigate(['/']);
      } else {
        this.toastrService.error(JSON.stringify(contact.message));
      }
    });
  }

}
