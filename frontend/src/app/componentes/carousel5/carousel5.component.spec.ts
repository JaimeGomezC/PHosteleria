import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carousel5Component } from './carousel5.component';

describe('Carousel5Component', () => {
  let component: Carousel5Component;
  let fixture: ComponentFixture<Carousel5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Carousel5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carousel5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
