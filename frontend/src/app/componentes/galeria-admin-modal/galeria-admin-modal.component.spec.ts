import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaAdminModalComponent } from './galeria-admin-modal.component';

describe('GaleriaAdminModalComponent', () => {
  let component: GaleriaAdminModalComponent;
  let fixture: ComponentFixture<GaleriaAdminModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleriaAdminModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleriaAdminModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
