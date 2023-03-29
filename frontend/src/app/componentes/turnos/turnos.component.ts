import { Component, OnInit } from '@angular/core';
import { TurnosResponse } from 'src/app/interfaces/turnosResponse';
import { ApiService } from 'src/app/servicios/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  
  constructor(private api:ApiService,private router:Router) { }
  arrayTurnos:any=[]
  
  ngOnInit(): void {
    this.api.getTurnos().subscribe(data =>{
           let dataResponse:TurnosResponse=data;
           this.arrayTurnos=dataResponse.Turnos;
    })
    
  }
  
  editarTurno(id:any):void {
    console.log('editar'+id)
  }

  nuevoTurno():void {
    console.log('Nuevo turno')
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
