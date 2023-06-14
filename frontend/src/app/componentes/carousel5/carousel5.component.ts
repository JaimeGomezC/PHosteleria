import { Component, OnInit } from '@angular/core';
import { GaleriaService } from 'src/app/servicios/galeria.service';

@Component({
  selector: 'app-carousel5',
  templateUrl: './carousel5.component.html',
  styleUrls: ['./carousel5.component.scss']
})
export class Carousel5Component implements OnInit {

    /*registrosss = ['https://picsum.photos/id/1041/800/450','https://picsum.photos/id/1043/800/450','https://picsum.photos/id/1044/800/450','https://picsum.photos/id/1045/800/450','https://picsum.photos/id/1049/800/450','https://picsum.photos/id/1052/800/450','https://picsum.photos/id/1043/150/150', 'https://picsum.photos/id/1044/800/450'];*/

    images: any[] = [];
    activeIndex: number = 0;
   // firstImage: any; //Esto es para que al cargar la pagina salga marcada la primera foto y funcione la galeria con cursores sin llegar a usar el raton priomero

    constructor(private galeria:GaleriaService){

    }

    ngOnInit():void {
      this.galeria.searchByTipo('galeria').subscribe(data =>{
        console.log(data);
        if(data.length>0){
          this.images = data;
          this.images[0].active = true;
          //this.firstImage = this.images[0];//Esto es para que al cargar la pagina salga marcada la primera foto y funcione la galeria con cursores sin llegar a usar el raton priomero
        }
      },
      (error) => {
        console.log(error);
      })


    }


}
