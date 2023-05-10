import { AfterViewInit, Inject, Component, OnInit, ViewChild,EventEmitter, Output } from '@angular/core';
import { MenuService } from 'src/app/servicios/menu.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA,MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-modal-lupa',
  templateUrl: './modal-lupa.component.html',
  styleUrls: ['./modal-lupa.component.css']
})
export class ModalLupaComponent implements OnInit {

  loading = true;
  dataSource:MatTableDataSource<any>;
  displayedColumns: string[] = this.data.camposArray;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  form: any;
  @Output() dataEvent = new EventEmitter<any>();
  Object = Object;
  
  
  constructor(private menu:MenuService,
    public formBuilder: FormBuilder,
    private router:Router,
    private dialog:MatDialog,
    private snack: MatSnackBar,
    private dialogRef: MatDialogRef<any>,
    

    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      console.log("data")
    console.log(data)
    this.dataSource=new MatTableDataSource();
    this.form = this.formBuilder.group({});
   }

   ngOnInit(): void {
    this.cargarDatos();
    const firstKey = Object;

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
 onSubmit(item:any) {
  console.log(item)
  console.dir(this.dialogRef)
  this.sendData(item)
  this.cancelar()
}

sendData(data: any) {
  this.dataEvent.emit(data);
}
 cargarDatos(){
  console.dir(this.dataSource)
        this.dataSource.data=this.data.datos;
        this.loading = false;
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

 cancelar() {
  this.dialogRef.close();
}
}
