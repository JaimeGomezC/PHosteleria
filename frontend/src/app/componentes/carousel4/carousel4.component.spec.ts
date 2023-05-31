import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carousel4Component } from './carousel4.component';

describe('Carousel4Component', () => {
  let component: Carousel4Component;
  let fixture: ComponentFixture<Carousel4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Carousel4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carousel4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
