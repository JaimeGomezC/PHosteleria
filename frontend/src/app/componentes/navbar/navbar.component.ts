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
  
  ngOnInit(): void {
    this.tr.loadTranslations()
      .then(() => {
        // Las traducciones se han cargado correctamente
        console.dir(this.tr);

        // Puedes realizar otras acciones después de cargar las traducciones si es necesario
      })
      .catch(error => {
        // Hubo un error al cargar las traducciones
        console.error('Error loading translations:', error);
      });
  }

  cambiarIdioma(idioma: any): void {
    this.tr.cambiarIdioma(idioma.value);
  }

}
