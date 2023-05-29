import { Component } from '@angular/core';
import { GaleriaService } from 'src/app/servicios/galeria.service';

@Component({
  selector: 'app-carousel-inicio',
  templateUrl: './carousel-inicio.component.html',
  styleUrls: ['./carousel-inicio.component.css']
})

export class CarouselInicioComponent {
  images: any[] = [];
  activeIndex: number = 0;

  constructor(private galeria:GaleriaService) {

   }

   ngOnInit(): void {
    this.galeria.searchByTipo('galeria').subscribe(data =>{
      console.log(data);
      if(data.length>0){
        this.images = data;
        this.images[0].active = true;
      } 
         
    },
    (error) => {
      console.log(error)
    })
    
 }


prevSlide() {
  this.activeIndex = (this.activeIndex - 1 + this.images.length) % this.images.length;
}

nextSlide() {
  this.activeIndex = (this.activeIndex + 1) % this.images.length;
}

}


