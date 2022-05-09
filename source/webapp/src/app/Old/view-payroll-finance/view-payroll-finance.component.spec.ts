import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPayrollFinanceComponent } from './view-payroll-finance.component';

describe('ViewPayrollFinanceComponent', () => {
  let component: ViewPayrollFinanceComponent;
  let fixture: ComponentFixture<ViewPayrollFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPayrollFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPayrollFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
