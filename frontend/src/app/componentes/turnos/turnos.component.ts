import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/interfaces/turnos';
import { ApiService } from 'src/app/servicios/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  
  constructor(private api:ApiService,private router:Router) { }
  arrayTurnos=[{id:1,fecha:'28/03/2023',n_plazas:50,observaciones:'Las mesas se distribuyen...',tipo:'Mañana'}
  ,{id:2,fecha:'01/04/2023',n_plazas:20,observaciones:'Las sillas se distribuyen...',tipo:'Mañana'},
  {id:3,fecha:'03/04/2023',n_plazas:30,observaciones:'ssssdistribuyen...',tipo:'Noche'}]
  
  ngOnInit(): void {
    this.api.getTurnos().subscribe(data=>{
           console.log(data);

    })
    
  }
  
  borrar(id:any):void {
    console.log('eliminar'+id)
  }
  // borrar(id:any):void {
  //   console.log('eliminar'+id)
  //   for(let x=0;x<this.arrayTurnos.length;x++)
  //     if (this.arrayTurnos[x].id==id)
  //     {
  //       this.arrayTurnos.splice(x,1);
  //       return;
  //     }
  // }

}
