import { Component } from '@angular/core';
import { GaleriaService } from 'src/app/servicios/galeria.service';

@Component({
  selector: 'app-carousel-inicio',
  templateUrl: './carousel-inicio.component.html',
  styleUrls: ['./carousel-inicio.component.css']
})

export class CarouselInicioComponent {

  items?:any;
  constructor(private galeria:GaleriaService) {

   }

   ngOnInit(): void {
    this.cargarDatos();

    
 }


 cargarDatos(){
  this.galeria.getFotosGaleria().subscribe(data =>{
    console.log(data);
    this.items = data;    
  },
  (error) => {
    console.log(error)
  })
}



}


