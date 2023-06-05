import { Component,OnInit } from '@angular/core';
import { GaleriaService } from 'src/app/servicios/galeria.service';


@Component({
  selector: 'app-carousel3',
  templateUrl: './carousel3.component.html',
  styleUrls: ['./carousel3.component.scss']
})
export class Carousel3Component {
  images:any = [];

  constructor(private galeria:GaleriaService) {}

  ngOnInit(): void {
    this.fetchImages();
  }

  fetchImages(): void {
    this.galeria.searchByTipo('galeria').subscribe(data =>{
      console.log("data");
      console.log(data);
      if(data.length>0){
        this.images = data;
      } 
         
    },
    (error) => {
      console.log(error)
    })
  }
}
