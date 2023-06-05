import { Component, OnInit } from '@angular/core';
import { TraductorService } from 'src/app/servicios/traductor.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private traductorService: TraductorService) { }
  public tr=this.traductorService;
  idiomaSeleccionado?: string;
  rutaImagen: string = '';

  
  ngOnInit(): void {
    const idiomaGuardado = localStorage.getItem('idioma');
    if (idiomaGuardado) {
      let valor=JSON.parse(idiomaGuardado);
      this.idiomaSeleccionado = valor._value;
      this.cargarRutaImagen();
    } else {
      // Establece un idioma predeterminado si no se encuentra en el localStorage
      this.idiomaSeleccionado = 'es';
      this.cargarRutaImagen();
    }
    // this.tr.loadTranslations()
    //   .then(() => {
    //     // Las traducciones se han cargado correctamente
    //     console.dir(this.tr);

    //     // Puedes realizar otras acciones después de cargar las traducciones si es necesario
    //   })
    //   .catch(error => {
    //     // Hubo un error al cargar las traducciones
    //     console.error('Error loading translations:', error);
    //   });
  }

  cambiarIdioma(idioma: any): void {
    this.tr.cambiarIdioma(idioma);
    this.idiomaSeleccionado = idioma;
    this.cargarRutaImagen();
  }
  cargarRutaImagen(): void {
    if (this.idiomaSeleccionado === 'es') {
      this.rutaImagen = '../assets/imagenes/es-flag.png';
    } else if (this.idiomaSeleccionado === 'en') {
      this.rutaImagen = '../assets/imagenes/en-flag.png';
    } else if (this.idiomaSeleccionado === 'fr') {
      this.rutaImagen = '../assets/imagenes/fr-flag.png';
    } else if (this.idiomaSeleccionado === 'pt') {
      this.rutaImagen = '../assets/imagenes/pt-flag.png';
    }
  }
  
}
