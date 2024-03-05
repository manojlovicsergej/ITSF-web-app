import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgraciTableComponent } from './igraci-table.component';

describe('IgraciTableComponent', () => {
  let component: IgraciTableComponent;
  let fixture: ComponentFixture<IgraciTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IgraciTableComponent]
    });
    fixture = TestBed.createComponent(IgraciTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
