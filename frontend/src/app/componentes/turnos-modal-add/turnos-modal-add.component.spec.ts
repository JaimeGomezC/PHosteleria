import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosModalAddComponent } from './turnos-modal-add.component';

describe('TurnosModalAddComponent', () => {
  let component: TurnosModalAddComponent;
  let fixture: ComponentFixture<TurnosModalAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosModalAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
