import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTurnoModalComponent } from './menu-turno-modal.component';

describe('MenuTurnoModalComponent', () => {
  let component: MenuTurnoModalComponent;
  let fixture: ComponentFixture<MenuTurnoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuTurnoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTurnoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
