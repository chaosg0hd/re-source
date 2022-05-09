import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRevenuesComponent } from './edit-revenues.component';

describe('EditRevenuesComponent', () => {
  let component: EditRevenuesComponent;
  let fixture: ComponentFixture<EditRevenuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRevenuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRevenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
