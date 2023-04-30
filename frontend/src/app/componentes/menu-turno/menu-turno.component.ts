import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MenuResponse } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/servicios/menu.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MenuTurnoModalComponent } from '../menu-turno-modal/menu-turno-modal.component';

@Component({
  selector: 'app-menu-turno',
  templateUrl: './menu-turno.component.html',
  styleUrls: ['./menu-turno.component.css']
})
export class MenuTurnoComponent implements OnInit {

  loading = true;
  dataSource:MatTableDataSource<MenuResponse>;
  displayedColumns: string[] = [ 'nombre_menu','precio_pax', 'observaciones','acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private menu:MenuService,private router:Router,private dialog:MatDialog) {
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
   this.menu.getMenus().subscribe(data =>{
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
       this.menu.eliminar(id).subscribe(data =>{
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
   this.router.navigate(['ReservaCliente']);
 }

 openModal(menu: MenuResponse) {
   const dialogRef = this.dialog.open(MenuTurnoModalComponent, {
     data: menu
   });
   dialogRef.afterClosed().subscribe(result => {
     console.log(`Modal cerrada con resultado: ${result}`);
     this.cargarDatos();
   });
 };
 
 edit_add_Turno(id:any):void {
   const dialogRef = this.dialog.open(MenuTurnoModalComponent,{
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
