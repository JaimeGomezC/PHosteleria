import { Component, OnInit } from '@angular/core';
import { Turnos } from '../../interfaces/turnos';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  constructor() { 

  }
  
  arrayReservas:Turnos[]=[{id:1,fecha:'28/03/2023',n_plazas:50,observaciones:'Las mesas se distribuyen...',tipo:'Mañana'}
        ,{id:2,fecha:'01/04/2023',n_plazas:20,observaciones:'Las sillas se distribuyen...',tipo:'Mañana'},
        {id:3,fecha:'03/04/2023',n_plazas:30,observaciones:'ssssdistribuyen...',tipo:'Noche'}]
  ngOnInit(): void {
  }

}
