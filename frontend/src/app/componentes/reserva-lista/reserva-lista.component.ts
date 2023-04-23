import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReservaService } from 'src/app/servicios/reserva.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ReservaResponse } from 'src/app/interfaces/reserva';

@Component({
  selector: 'app-reserva-lista',
  templateUrl: './reserva-lista.component.html',
  styleUrls: ['./reserva-lista.component.css']
})
export class ReservaListaComponent implements OnInit {
  loading = true;
  dataSource:MatTableDataSource<ReservaResponse>;
  displayedColumns: string[] = [ 'fecha','num_comensales','forma_pago','codigo_verificacion','observaciones','acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private reserva:ReservaService,private router:Router,private dialog:MatDialog) {
    this.dataSource=new MatTableDataSource()
   }

  ngOnInit(): void {
    this.cargarDatos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel="Reservas por página"
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarDatos(){
    this.reserva.getReservas().subscribe(data =>{
          this.dataSource.data=data;
          this.loading = false;
          console.log(data)
    },
    (error) => {
      console.log(error)
    })
  }  

}
