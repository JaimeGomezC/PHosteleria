import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.css']
})
export class UsuarioModalComponent implements OnInit {
  public form!: FormGroup;
  id?: string;
  loading = false;
  submitted = false;
  titulo?:string;

  constructor(
    public formBuilder: FormBuilder,
    private user: UsuarioService,
    private dialogRef: MatDialogRef<UsuarioModalComponent>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
    console.log("data");
    console.log(data);
    if(data){this.titulo='EDITAR ADMINISTRADOR'}else{this.titulo='NUEVO ADMINISTRADOR'}
    this.form = this.formBuilder.group({
      name: [data?.name, Validators.required],
      email: [data?.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8)]],
      
    });
  }

  ngOnInit(): void {

  }

  public get f() {
    return this.form;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }
    if(this.data){
      this.addEditar(this.data);
    }else{
      this.addTurno();
    }
  }

  addTurno() {
    this.user.registrar(this.form.value).subscribe(
      (data) => {
        this.snack.open('Usuario añadido !!', 'Aceptar', {
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
    this.user.modificar(item.id,this.form.value).subscribe(//item.id,
      (data) => {
        this.snack.open('Usuario modificado !!', 'Aceptar', {
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
