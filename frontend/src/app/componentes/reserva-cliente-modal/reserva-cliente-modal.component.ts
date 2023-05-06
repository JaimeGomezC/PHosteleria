import { Component, Inject, OnInit,Directive, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

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
    private dialogRef: MatDialogRef<ReservaClienteModalComponent>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    
  ) {
    console.log("aui el arraydatos");
    console.log(data);
    // console.log(data[1].cliente.nombre);
    if(data){this.titulo='EDITAR RESERVA'}else{this.titulo='NUEVA RESERVA'}
    this.form = this.formBuilder.group({
      //tabla Cliente
      id: [data ? data[1].cliente.id : ''],
      nombre: [data ? data[1].cliente.nombre : '', Validators.required],
      apellido1: [data ? data[1].cliente.apellido1 : '', Validators.required],
      apellido2: [data ? data[1].cliente.apellido2 : '', Validators.required],
      email: [data ? data[1].cliente.email : '', Validators.required],
      telefono: [data ? data[1].cliente.telefono : '', Validators.required],
      //tabla Reservas
      observaciones: [data ? data[0].reserva.observaciones : '', Validators.required],
      fecha: [data ? data[0].reserva.fecha : '', Validators.required],
      num_comensales: [data ? data[0].reserva.num_comensales : '', Validators.required],
      forma_pago: [data ? data[0].reserva.forma_pago : '', Validators.required],
      precio_total: [data ? data[0].reserva.precio_total : '', Validators.required],
      pagado_base: [data ? data[0].reserva.pagado_base : '', Validators.required],
      pagado_total: [data ? data[0].reserva.pagado_total : '', Validators.required],
      codigo_verificacion: [data ? data[0].reserva.codigo_verificacion : '', Validators.required],
      producto_extra: [data ? data[0].reserva.producto_extra : '', Validators.required]
    });
  }

  ngOnInit(): void {
    // this.createForm();
    console.log("oninit");
    console.log(this.data);
    if (this.data) {
    }
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


}
