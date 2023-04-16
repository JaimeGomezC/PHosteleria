import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// import { UserService, AlertService } from '../_services';
// import { MustMatch } from '../_helpers';
import { TurnosComponent } from '../turnos/turnos.component';
import { getTestBed } from '@angular/core/testing';
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

  constructor(
    public formBuilder: FormBuilder,
    private turno: TurnosService,
    private dialogRef: MatDialogRef<TurnosModalAddComponent>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
    console.log(data);
    this.form = this.formBuilder.group({
      turno: [data ? data.turno : '', Validators.required],
      id_admin: sessionStorage.getItem('usuario'),
      n_plazas: [data ? data.n_plazas : '', Validators.required],
      fecha: [data ? data.created_at : '', Validators.required],
      observaciones: [data ? data.observaciones : ''],

      visible: ['1', Validators.required],
    });
  }

  ngOnInit(): void {
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
