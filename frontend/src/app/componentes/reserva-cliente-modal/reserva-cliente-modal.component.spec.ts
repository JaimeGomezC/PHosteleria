import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaClienteModalComponent } from './reserva-cliente-modal.component';

describe('ReservaClienteModalComponent', () => {
  let component: ReservaClienteModalComponent;
  let fixture: ComponentFixture<ReservaClienteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaClienteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaClienteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
