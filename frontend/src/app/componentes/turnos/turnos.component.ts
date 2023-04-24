import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TurnosResponse } from 'src/app/interfaces/turnosResponse';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { TurnosModalAddComponent } from '../turnos-modal-add/turnos-modal-add.component';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit,AfterViewInit {
 
  loading = true;
  dataSource:MatTableDataSource<TurnosResponse>;
  displayedColumns: string[] = [ 'fecha','turno','visible','n_plazas', 'observaciones','acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private turno:TurnosService,private router:Router,private dialog:MatDialog,private datePipe: DatePipe) {
    this.dataSource=new MatTableDataSource()
    
   }

  ngOnInit(): void {
     this.cargarDatos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel="Turnos por página"
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarDatos(){
    this.turno.getTurnos().subscribe(data =>{
          this.dataSource.data=data;
          this.loading = false;
    },
    (error) => {
      console.log(error)
    })
  }  

  borrar(id:any):void {
    this.turno.borrar(id).subscribe(data =>{
      this.cargarDatos();
      Swal.fire('Turno', 'Borrado', 'success');
    },
    (error) => {
      console.log(error)
    })
  }
  verReserva(id:any):void {
    this.router.navigate(['ReservasLista']);
  }
 
  openModal(turno: TurnosResponse) {
    // let fechaFormateada = this.datePipe.transform(turno.fecha, 'dd/MM/yyyy');
    // console.log(turno)
    // console.log(fechaFormateada)
    // let nuevo=new Date(fechaFormateada);
    // turno.fecha=new Date(fechaFormateada);

    const dialogRef = this.dialog.open(TurnosModalAddComponent, {
      data: turno
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Modal cerrada con resultado: ${result}`);
      this.cargarDatos();
    });
  };
  
  edit_add_Turno(id:any):void {
    const dialogRef = this.dialog.open(TurnosModalAddComponent,{
      width:'40%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.cargarDatos();
    },
    (error) => {
      console.log(error)
    });
  }
}
