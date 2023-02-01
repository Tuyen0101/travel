import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConactsComponent } from './conacts.component';

describe('ConactsComponent', () => {
  let component: ConactsComponent;
  let fixture: ComponentFixture<ConactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
