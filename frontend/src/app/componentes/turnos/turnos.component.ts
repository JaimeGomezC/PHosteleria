import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TurnosResponse } from 'src/app/interfaces/turnosResponse';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { MenuService } from 'src/app/servicios/menu.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { TurnosModalAddComponent } from '../turnos-modal-add/turnos-modal-add.component';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

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
  arrayMenus?:any;


  constructor(private turno:TurnosService,private router:Router,private dialog:MatDialog,private menu:MenuService) {
    this.dataSource=new MatTableDataSource()
   }

  ngOnInit(): void {
     this.cargarDatos();
     this.cargarMenus();
  }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Turnos por página';
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
  cargarMenus(){
    this.menu.getMenus().subscribe(data =>{
      this.arrayMenus=data;
    },
    (error) => {
      console.log(error)
    })
  }    

  borrar(id:any):void {
    Swal.fire({
      title: 'Esta seguro que desea eliminar el registro?',
      text: "Va a eliminar una turno!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.turno.borrar(id).subscribe(data =>{
          this.cargarDatos();
          Swal.fire('Registro borrado!','Ha eliminado el turno.','success')
        },
        (error) => {
          console.log(error)
        })
      }
    })
  }
  verReserva(id:any):void {
    this.router.navigate(['ReservaCliente',{idTurno:id}]);
  }
 
  openModal(turno: any) {
    turno["listaMenu"]=this.arrayMenus;
    const dialogRef = this.dialog.open(TurnosModalAddComponent, {
      data: turno
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Modal cerrada con resultado: ${result}`);
      this.cargarDatos();
    });
  };
  
  edit_add_Turno(id:any):void {
    const turno:any={};
    turno["listaMenu"]=this.arrayMenus;

    const dialogRef = this.dialog.open(TurnosModalAddComponent,{
      width:'40%',
      data:turno
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
