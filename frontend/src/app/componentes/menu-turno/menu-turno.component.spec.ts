import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTurnoComponent } from './menu-turno.component';

describe('MenuTurnoComponent', () => {
  let component: MenuTurnoComponent;
  let fixture: ComponentFixture<MenuTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
