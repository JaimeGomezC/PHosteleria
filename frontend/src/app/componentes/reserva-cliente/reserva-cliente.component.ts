import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReservaService } from 'src/app/servicios/reserva.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ReservaResponse } from 'src/app/interfaces/reserva';
import { ReservaClienteModalComponent } from '../reserva-cliente-modal/reserva-cliente-modal.component';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-reserva-cliente',
  templateUrl: './reserva-cliente.component.html',
  styleUrls: ['./reserva-cliente.component.css']
})
export class ReservaClienteComponent implements OnInit {
  showSpinner: boolean = false;
  dataSource:MatTableDataSource<ReservaResponse>;
  displayedColumns: string[] = [ 'fecha','num_comensales','estado','forma_pago','codigo_verificacion','observaciones_reserva','acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  paramUrl:any;


  constructor(private reserva:ReservaService,
    private router:Router,
    private dialog:MatDialog,
    private cliente:ClienteService,
    private routerUrl:ActivatedRoute) {
    this.dataSource=new MatTableDataSource()
   }

  ngOnInit(): void {
    this.routerUrl.params.subscribe(params => {
      this.paramUrl=params
      this.showSpinner = true;
      if(params["idTurno"]){
        this.cargarDatorTurno()
      }else{
        this.cargarDatos();
      }
    });
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Reservas por página"
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarDatos(){
    this.showSpinner = true;
    this.reserva.getReservas().subscribe(data =>{
          this.dataSource.data=data;
          console.log(data)
          this.showSpinner = false;
    },
    (error) => {
      console.log(error)
    })
  }  
  cargarDatorTurno(){
    this.showSpinner = true;
    this.reserva.getReservaTurno(this.paramUrl["idTurno"]).subscribe(data =>{
      this.dataSource.data=data;
      this.showSpinner = false;
  },
  (error) => {
  console.log(error)
  })
  }
      
  borrarReserva(id:any):void {
    Swal.fire({
      title: 'Esta seguro que desea eliminar el registro?',
      text: "Va a eliminar una reserva!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reserva.eliminar(id).subscribe(data =>{
          if(this.paramUrl["idTurno"]){
            this.cargarDatorTurno();
          }else{
            this.cargarDatos();
          }
          Swal.fire('Registro borrado!','Ha eliminado la reserva.','success');
        },
        (error) => {
          console.log(error)
        })
      }
    })
  }

  openModal(cliente: any) {//NUEVA RESERVA
    
    const dialogRef = this.dialog.open(ReservaClienteModalComponent, {
      data: cliente,
      width:'80%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Modal cerrada con resultado: ${result}`);
      this.cargarDatos();
    });
  };

  edit_add_Turno(item:any):void {//UPDATE RESERVA
    this.cliente.getCliente(item.id_cliente).subscribe(respuesta =>{
      let arrayDatos=[{"reserva":item},{"cliente":respuesta}]
      const dialogRef = this.dialog.open(ReservaClienteModalComponent,{
        data: arrayDatos,
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        this.cargarDatos();
      },
      (error) => {
        console.log(error);
      });
    },
    (error) => {
      console.log(error)
    })
    
  }

  exportarReservas() {
    this.reserva.exportReservas();
  }
}
