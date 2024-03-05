import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgraciFilterComponent } from './igraci-filter.component';

describe('IgraciFilterComponent', () => {
  let component: IgraciFilterComponent;
  let fixture: ComponentFixture<IgraciFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IgraciFilterComponent]
    });
    fixture = TestBed.createComponent(IgraciFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
