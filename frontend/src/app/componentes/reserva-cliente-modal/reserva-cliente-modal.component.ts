import { Component, Inject, OnInit,Directive, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { MAT_DIALOG_DATA,MatDialog, MatDialogRef } from '@angular/material/dialog';


import { MatSnackBar } from '@angular/material/snack-bar';
import { TurnosResponse } from 'src/app/interfaces/turnosResponse';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { ModalLupaComponent } from '../modal-lupa/modal-lupa.component';


@Component({
  selector: 'app-reserva-cliente-modal',
  templateUrl: './reserva-cliente-modal.component.html',
  styleUrls: ['./reserva-cliente-modal.component.css']
})
export class ReservaClienteModalComponent implements OnInit {

  public form!: FormGroup;
  id?: string;
  loading = false;
  submitted = false;
  titulo?:string;
  // formGroup?: FormGroup;
  // post: any = '';

  constructor(
    public formBuilder: FormBuilder,
    private cliente: ClienteService,
    private dialog:MatDialog,
    private dialogRef: MatDialogRef<ReservaClienteModalComponent>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private turno:TurnosService
    
  ) {
    console.log("aui el arraydatos");
    console.log(data);
    // console.log(data[1].cliente.nombre);
    if(data){this.titulo='EDITAR RESERVA'}else{this.titulo='NUEVA RESERVA'}
   
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      //tabla Cliente
      id: [this.data ? this.data[1].cliente.id : ''],
      nombre: [this.data ? this.data[1].cliente.nombre : '', Validators.required],
      apellido1: [this.data ? this.data[1].cliente.apellido1 : '', Validators.required],
      apellido2: [this.data ? this.data[1].cliente.apellido2 : '', Validators.required],
      email: [this.data ? this.data[1].cliente.email : '', Validators.required],
      telefono: [this.data ? this.data[1].cliente.telefono : '', Validators.required],
      //tabla Reservas
      id_turno: ['1'],
      observaciones: [this.data ? this.data[0].reserva.observaciones : '', Validators.required],
      fecha: [this.data ? this.data[0].reserva.fecha : '', Validators.required],
      num_comensales: [this.data ? this.data[0].reserva.num_comensales : '', Validators.required],
      forma_pago: [this.data ? this.data[0].reserva.forma_pago : '', Validators.required],
      precio_total: [this.data ? this.data[0].reserva.precio_total : '', Validators.required],
      pagado_base: [this.data ? this.data[0].reserva.pagado_base : '', Validators.required],
      pagado_total: [this.data ? this.data[0].reserva.pagado_total : '', Validators.required],
      codigo_verificacion: [this.data ? this.data[0].reserva.codigo_verificacion : ''],
      producto_extra: [this.data ? this.data[0].reserva.producto_extra : '', Validators.required]
    });
    this.form.controls['codigo_verificacion'].disable();
    this.form.controls['fecha'].disable();
    
  }

  public get f() {
    return this.form;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if(this.data){
      this.addEditar(this.data);
    }else{
      this.addTurno();
    }
  }

  addTurno() {
    this.cliente.agregarCliente(this.form.value).subscribe(
      (data) => {
        console.log('data');
        console.log(this.form.value);
        this.snack.open('Turno añadido !!', 'Aceptar', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        this.cancelar();
      },
      (error) => {
        this.snack.open(error.message, 'Aceptar', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    );
  }
  cancelar() {
    this.dialogRef.close();
  }

  addEditar(item: any): void {
    this.cliente.actualizarCliente(this.form.value.id,this.form.value).subscribe(
      (data) => {
        this.snack.open('Turno modificado !!', 'Aceptar', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        this.cancelar();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openModal() {
    this.turno.getTurnos().subscribe(
      (dataresult) => {
        const dialogRef = this.dialog.open(ModalLupaComponent, {
          data: {
            datos:dataresult,
            titulo:"Lista de Turnos",
            camposArray:['fecha','turno','acciones'],//,'turno','n_plazas','observaciones'
          }
        });
        dialogRef.componentInstance.dataEvent.subscribe((result: any) => {
          this.form.patchValue({
            fecha: result.fecha,
            turno: result.turno
          });
        });

       },
      (error) => {
        console.log(error);
      }
    );
    
  };

}
