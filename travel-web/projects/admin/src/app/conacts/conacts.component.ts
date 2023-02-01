import { Component, OnInit } from '@angular/core';
import { ContactService } from 'projects/global/services';

@Component({
  selector: 'app-conacts',
  templateUrl: './conacts.component.html',
  styleUrls: ['./conacts.component.scss']
})
export class ConactsComponent implements OnInit {
  contacts!: any;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getAllContacts().subscribe((contacts: any) => {
      this.contacts = [...contacts];
      console.log(contacts);
    });
  }

}
