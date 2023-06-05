import { Component, OnInit } from '@angular/core';
import { TraductorService } from 'src/app/servicios/traductor.service';

@Component({
  selector: 'app-conctato',
  templateUrl: './conctato.component.html',
  styleUrls: ['./conctato.component.css']
})
export class ConctatoComponent implements OnInit {

  constructor(private traductorService: TraductorService) { }
  public tr=this.traductorService;

  ngOnInit(): void {
    // this.traductorService.loadTranslations()
    // .then(() => {
    //   // Las traducciones se han cargado correctamente
    //   // Puedes realizar otras acciones después de cargar las traducciones si es necesario
    // })
    // .catch(error => {
    //   // Hubo un error al cargar las traducciones
    //   console.error('Error loading translations:', error);
    // });
  }

}
