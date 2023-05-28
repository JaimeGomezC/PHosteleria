import { Component, OnInit } from '@angular/core';
import { GaleriaService } from 'src/app/servicios/galeria.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  imagenes: any[] = []; // Array de imágenes obtenidas desde la API
  imagenActual: string = ''; // URL de la imagen actual
  imagenNueva: string = ''; // URL de la nueva imagen
  indexActual: number = 0; // Índice de la imagen actual
  indexNueva: number = 1; // Índice de la nueva imagen

  constructor(private galeria:GaleriaService) { }

  ngOnInit() {
    this.obtenerImagenesDeAPI();
    if(this.imagenes.length>1){
      setInterval(() => {
        this.cambiarImagen();
      }, 8000);
    }else{
      this.imagenes.push({imagen_url:"../assets/imagenes/fondoCocina.jpg"})
      this.imagenActual = this.imagenes[0].imagen_url;
    }
    
  }

  obtenerImagenesDeAPI() {
    this.galeria.getFotosGaleria().subscribe(data => {
      this.imagenes = data;
      if (this.imagenes.length > 0) {
        this.imagenActual = this.imagenes[this.indexActual].imagen_url;
      }
    },
    (error) => {
      console.log(error)
    })
  }

  cambiarImagen() {
    this.indexActual = (this.indexActual + 1) % this.imagenes.length;
    this.indexNueva = (this.indexActual + 1) % this.imagenes.length; 
    this.imagenActual = this.imagenes[this.indexActual].imagen_url;
    this.imagenNueva = this.imagenes[this.indexNueva].imagen_url; 
  }

}
