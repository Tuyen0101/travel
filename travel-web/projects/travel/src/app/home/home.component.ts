import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filterForm = this.fb.group({
    keyword: [''],
    fromprice: [''],
    toprice: [''],
    fromdate: [''],
    todate: [''],
  });

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  filterTour() {
    console.log(this.filterForm.value);
    const keyword = this.filterForm.value.keyword;
    const fromprice = this.filterForm.value.fromprice;
    const toprice = this.filterForm.value.toprice;
    const fromdate = this.filterForm.value.fromdate;
    const todate = this.filterForm.value.todate;
    this.router.navigateByUrl(`/list?keyword=${keyword}&typetour=&fromdate=${fromdate}&todate=${todate}&fromprice=${fromprice}&toprice=${toprice}`);
  }

}
