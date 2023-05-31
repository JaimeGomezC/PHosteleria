import { Component } from '@angular/core';
import { CAROUSEL_DATA_ITEMS } from '../carousel4/carousel4.const';
import { ICarouselItem } from '../carousel4/Icarousel-item.metadata';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent {

  public carouselData: ICarouselItem[] = CAROUSEL_DATA_ITEMS;

}
