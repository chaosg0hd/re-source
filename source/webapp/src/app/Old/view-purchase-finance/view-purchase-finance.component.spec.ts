import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPurchaseFinanceComponent } from './view-purchase-finance.component';

describe('ViewPurchaseFinanceComponent', () => {
  let component: ViewPurchaseFinanceComponent;
  let fixture: ComponentFixture<ViewPurchaseFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPurchaseFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPurchaseFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
