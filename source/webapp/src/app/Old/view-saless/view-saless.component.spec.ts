import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalessComponent } from './view-saless.component';

describe('ViewSalessComponent', () => {
  let component: ViewSalessComponent;
  let fixture: ComponentFixture<ViewSalessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSalessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSalessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
