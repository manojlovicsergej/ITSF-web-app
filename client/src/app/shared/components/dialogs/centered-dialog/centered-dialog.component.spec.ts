import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenteredDialogComponent } from './centered-dialog.component';

describe('CenteredDialogComponent', () => {
  let component: CenteredDialogComponent;
  let fixture: ComponentFixture<CenteredDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CenteredDialogComponent]
    });
    fixture = TestBed.createComponent(CenteredDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
