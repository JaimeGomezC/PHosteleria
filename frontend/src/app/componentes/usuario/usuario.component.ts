import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioResponse } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UsuarioModalComponent } from '../usuario-modal/usuario-modal.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  loading = true;
  dataSource:MatTableDataSource<UsuarioResponse>;
  displayedColumns: string[] = [ 'name','email','acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private user:UsuarioService,private router:Router,private dialog:MatDialog) {
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
    this.user.getRegistros().subscribe(data =>{
          this.dataSource.data=data;
          this.loading = false;
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
        this.user.borrar(id).subscribe(data =>{
          this.cargarDatos();
          Swal.fire('Registro borrado!','Ha eliminado el turno.','success')
        },
        (error) => {
          console.log(error)
        })
      }
    })
  }
 
  openModal(item: any) {
    console.log(item)
    const dialogRef = this.dialog.open(UsuarioModalComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Modal cerrada con resultado: ${result}`);
      this.cargarDatos();
    });
  };
  
  edit_add_Turno(id:any):void {
    const dialogRef = this.dialog.open(UsuarioModalComponent,{
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
