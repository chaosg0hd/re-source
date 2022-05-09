import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRevenuesComponent } from './view-revenues.component';

describe('ViewRevenuesComponent', () => {
  let component: ViewRevenuesComponent;
  let fixture: ComponentFixture<ViewRevenuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRevenuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRevenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
