import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionDropdownComponent } from './position-dropdown.component';

describe('PositionDropdownComponent', () => {
  let component: PositionDropdownComponent;
  let fixture: ComponentFixture<PositionDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PositionDropdownComponent]
    });
    fixture = TestBed.createComponent(PositionDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
