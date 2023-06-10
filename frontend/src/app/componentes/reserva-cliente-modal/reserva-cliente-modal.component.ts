import {Component,Inject,OnInit,} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder,FormGroup,FormControl,Validators,AbstractControl, ValidatorFn} from '@angular/forms';
import { ClienteService } from 'src/app/servicios/cliente.service';
import {MAT_DIALOG_DATA,MatDialog, MatDialogRef,} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { ModalLupaComponent } from '../modal-lupa/modal-lupa.component';

@Component({
  selector: 'app-reserva-cliente-modal',
  templateUrl: './reserva-cliente-modal.component.html',
  styleUrls: ['./reserva-cliente-modal.component.css'],
})
export class ReservaClienteModalComponent implements OnInit {
  public form!: FormGroup;
  id?: string;
  loading = false;
  submitted = false;
  titulo?: string;
  // formGroup?: FormGroup;
  // post: any = '';

  constructor(
    public formBuilder: FormBuilder,
    private cliente: ClienteService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ReservaClienteModalComponent>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private turno: TurnosService
  ) {
    console.log('aui el arraydatos');
    console.log(data);
    // console.log(data[1].cliente.nombre);
    if (data) {
      this.titulo = 'EDITAR RESERVA';
    } else {
      this.titulo = 'NUEVA RESERVA';
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      //tabla Cliente
      id_cliente: [this.data ? this.data[1].cliente.id : ''],
      nombre: [
        this.data ? this.data[1].cliente.nombre : '',
        Validators.required,
      ],
      apellido1: [
        this.data ? this.data[1].cliente.apellido1 : '',
        Validators.required,
      ],
      apellido2: [
        this.data ? this.data[1].cliente.apellido2 : '',
        Validators.required,
      ],
      email: [this.data ? this.data[1].cliente.email : '', [Validators.required, Validators.email]],
      telefono: [
        this.data ? this.data[1].cliente.telefono : '',
        [Validators.required, this.validateTelefono()]
      ],
      observaciones_cliente: [
        this.data ? this.data[1].cliente.observaciones_cliente : '',
      ],
      //tabla Reservas
      id_reserva: [this.data ? this.data[0].reserva.id : ''],
      id_turno: ['1'],
      fecha: [this.data ? this.data[0].reserva.fecha : '', Validators.required],
      num_comensales: [
        this.data ? this.data[0].reserva.num_comensales : '',
        Validators.required,
      ],
      forma_pago: [
        this.data ? this.data[0].reserva.forma_pago : '',
        Validators.required,
      ],
      estado: [
        this.data ? this.data[0].reserva.estado : '',
        Validators.required,
      ],
      precio_total: [this.data ? this.data[0].reserva.precio_total : 0],
      pagado_base: [this.data ? this.data[0].reserva.pagado_base : 1],
      pagado_total: [this.data ? this.data[0].reserva.pagado_total : 3],
      codigo_verificacion: [
        this.data ? this.data[0].reserva.codigo_verificacion : '',
      ],
      producto_extra: [this.data ? this.data[0].reserva.producto_extra : ''],
      observaciones_reserva: [
        this.data ? this.data[0].reserva.observaciones_reserva : '',
      ],
    });
    this.form.controls['codigo_verificacion'].disable();
    console.log(this.form.value);
  }

  public get f() {
    return this.form;
  }

  onSubmit() {
    this.submitted = true;
    console.log("enviar")
    console.dir(this.f.controls['telefono'])
    if (this.form.invalid) {
      return;
    }
    if (this.data) {
      this.addEditar(this.data);
    } else {
      this.addTurno();
    }
  }

  addTurno() {
    this.cliente.agregarCliente(this.form.value).subscribe(
      (data) => {
        const obj = JSON.parse(data.result);
        console.dir(obj)
        if(obj.error){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: obj.message,
          })
        }else{
          Swal.fire(
            'Reserva realizada!',
             obj.message,
            'success'
          );
        }
        this.cancelar();
      },
      (error) => {
        console.dir(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    );
  }
  cancelar() {
    this.dialogRef.close();
  }

  addEditar(item: any): void {
    this.cliente.updateCliente(this.form.value).subscribe(
      (data) => {
        const obj = JSON.parse(data.result);
        if (obj.error) {
          console.log('Mensaje:', obj.message);
          this.snack.open(obj.message, 'Aceptar', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        } else {
          this.snack.open('Reserva modificada !!'+obj.message, 'Aceptar', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.cancelar();
        }
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
            datos: dataresult,
            titulo: 'Lista de Turnos',
            camposArray: ['acciones', 'fecha', 'turno', 'n_plazas'], //,'turno','n_plazas','observaciones'
          },
        });
        dialogRef.componentInstance.dataEvent.subscribe((result: any) => {
          this.form.patchValue({
            fecha: result.fecha,
            turno: result.turno,
            id_turno: result.id,
          });
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
validateTelefono(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const telefonoPattern = /^\d{9}$/; // Assuming the phone number should be a 9-digit numeric value
  
      if (control.value && !telefonoPattern.test(control.value)) {
        return { invalidTelefono: true };
      }
  
      return null;
    };
  }
  
}
