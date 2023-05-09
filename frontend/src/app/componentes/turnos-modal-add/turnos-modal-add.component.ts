import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-turnos-modal-add',
  templateUrl: './turnos-modal-add.component.html',
  styleUrls: ['./turnos-modal-add.component.css'],
})
export class TurnosModalAddComponent implements OnInit {
  public form!: FormGroup;
  id?: string;
  loading = false;
  submitted = false;
  titulo?:string;

  constructor(
    public formBuilder: FormBuilder,
    private turno: TurnosService,
    private dialogRef: MatDialogRef<TurnosModalAddComponent>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
    console.log("data");
    console.log(data);
    if(data.id_admin){this.titulo='EDITAR TURNO'}else{this.titulo='NUEVO TURNO'};
    
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      turno: [this.data.turno, Validators.required],
      id_admin: sessionStorage.getItem('usuario'),
      n_plazas: [this.data.n_plazas, Validators.required],
      fecha: [this.data.fecha, Validators.required],
      observaciones: [this.data.observaciones],
      id_menu: [this.data.id_menu],
      listaMenu: [this.data.listaMenu],
      visible: [this.data.visible, Validators.required],
    });
  }

  public get f() {
    return this.form;

  }

  onSubmit(itemForm:FormGroup) {
    console.log(this.form);
    console.log(this.form.value);
    this.submitted = true;
    if (itemForm.invalid) {
      return;
    }
    if(this.titulo=='EDITAR TURNO'){
      this.addEditar(this.data);
    }else{
      this.addTurno();
    }
  }

  addTurno() {
    this.turno.addTurnos(this.form.value).subscribe(
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
    this.turno.modificar(item.id,this.form.value).subscribe(
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

  // onReset() {
  //   this.submitted = false;
  //   this.form.reset();
  // }
}
