import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalessComponent } from './add-saless.component';

describe('AddSalessComponent', () => {
  let component: AddSalessComponent;
  let fixture: ComponentFixture<AddSalessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
