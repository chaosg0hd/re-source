import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundyComponent } from './bundy.component';

describe('BundyComponent', () => {
  let component: BundyComponent;
  let fixture: ComponentFixture<BundyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BundyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BundyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
