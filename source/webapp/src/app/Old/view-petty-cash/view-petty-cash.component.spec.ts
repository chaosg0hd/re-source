import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPettyCashComponent } from './view-petty-cash.component';

describe('ViewPettyCashComponent', () => {
  let component: ViewPettyCashComponent;
  let fixture: ComponentFixture<ViewPettyCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPettyCashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPettyCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
