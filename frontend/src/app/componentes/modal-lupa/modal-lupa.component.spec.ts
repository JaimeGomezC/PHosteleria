import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLupaComponent } from './modal-lupa.component';

describe('ModalLupaComponent', () => {
  let component: ModalLupaComponent;
  let fixture: ComponentFixture<ModalLupaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLupaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLupaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
