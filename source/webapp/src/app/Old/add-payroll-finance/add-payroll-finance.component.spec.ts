import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayrollFinanceComponent } from './add-payroll-finance.component';

describe('AddPayrollFinanceComponent', () => {
  let component: AddPayrollFinanceComponent;
  let fixture: ComponentFixture<AddPayrollFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPayrollFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPayrollFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
