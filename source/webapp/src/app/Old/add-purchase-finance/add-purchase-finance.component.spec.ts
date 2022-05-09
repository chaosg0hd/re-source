import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseFinanceComponent } from './add-purchase-finance.component';

describe('AddPurchaseFinanceComponent', () => {
  let component: AddPurchaseFinanceComponent;
  let fixture: ComponentFixture<AddPurchaseFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPurchaseFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPurchaseFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
