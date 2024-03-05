import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajIgracaDijalogComponent } from './dodaj-igraca-dijalog.component';

describe('DodajIgracaDijalogComponent', () => {
  let component: DodajIgracaDijalogComponent;
  let fixture: ComponentFixture<DodajIgracaDijalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodajIgracaDijalogComponent]
    });
    fixture = TestBed.createComponent(DodajIgracaDijalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
