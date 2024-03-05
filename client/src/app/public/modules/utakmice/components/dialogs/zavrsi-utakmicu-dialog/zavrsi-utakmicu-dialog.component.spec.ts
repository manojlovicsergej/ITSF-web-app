import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZavrsiUtakmicuDialogComponent } from './zavrsi-utakmicu-dialog.component';

describe('ZavrsiUtakmicuDialogComponent', () => {
  let component: ZavrsiUtakmicuDialogComponent;
  let fixture: ComponentFixture<ZavrsiUtakmicuDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZavrsiUtakmicuDialogComponent]
    });
    fixture = TestBed.createComponent(ZavrsiUtakmicuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
