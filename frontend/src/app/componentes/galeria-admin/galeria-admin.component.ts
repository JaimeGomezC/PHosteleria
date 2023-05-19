import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GaleriaResponse } from 'src/app/interfaces/galeria';
import { GaleriaService } from 'src/app/servicios/galeria.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { GaleriaAdminModalComponent } from '../galeria-admin-modal/galeria-admin-modal.component';

@Component({
  selector: 'app-galeria-admin',
  templateUrl: './galeria-admin.component.html',
  styleUrls: ['./galeria-admin.component.css']
})
export class GaleriaAdminComponent implements OnInit {

  loading = true;
  dataSource:MatTableDataSource<GaleriaResponse>;
  displayedColumns: string[] = [ 'nombre_imagen','titulo','descripcion','acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private galeria:GaleriaService,private router:Router,private dialog:MatDialog) {
    this.dataSource=new MatTableDataSource()
  }

   ngOnInit(): void {
    this.cargarDatos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel="Fotos por página"
    this.dataSource.sort = this.sort;
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  cargarDatos(){
    this.galeria.getFotosGaleria().subscribe(data =>{
          this.dataSource.data=data;
          this.loading = false;
    },
    (error) => {
      console.log(error)
    })
  }

  borrar(item: any): void {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar el registro?',
      text: "¡Vas a eliminar una Foto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const directorio = item.imagen.substring(item.imagen.indexOf("/public/"));
        this.galeria.deleteImage(directorio).subscribe(
          () => {
            // La imagen se ha eliminado correctamente, ahora puedes eliminar el registro de la base de datos
            this.galeria.eliminar(item.id).subscribe(
              () => {
                this.cargarDatos();
                Swal.fire('¡Registro borrado!', 'Se ha eliminado la imagen.', 'success');
              },
              (error) => {
                console.log(error);
              }
            );
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  verFoto(id:any):void {
    this.router.navigate(['FotoCliente']);
  }
 
  openModal(menu: GaleriaResponse) {
    const dialogRef = this.dialog.open(GaleriaAdminModalComponent, {
      data: menu
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Modal cerrada con resultado: ${result}`);
      this.cargarDatos();
    });
  };
  
  edit_add_Foto(id:any):void {
    const dialogRef = this.dialog.open(GaleriaAdminModalComponent,{
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
