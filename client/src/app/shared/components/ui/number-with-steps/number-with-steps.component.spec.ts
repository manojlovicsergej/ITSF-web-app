import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberWithStepsComponent } from './number-with-steps.component';

describe('NumberWithStepsComponent', () => {
  let component: NumberWithStepsComponent;
  let fixture: ComponentFixture<NumberWithStepsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberWithStepsComponent]
    });
    fixture = TestBed.createComponent(NumberWithStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
