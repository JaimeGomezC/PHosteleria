import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from 'src/app/servicios/menu.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu-turno-modal',
  templateUrl: './menu-turno-modal.component.html',
  styleUrls: ['./menu-turno-modal.component.css']
})
export class MenuTurnoModalComponent implements OnInit {

  form!: FormGroup;
  id?: string;
  loading = false;
  submitted = false;
  titulo?:string;
  imagen?:File;

  constructor(
    public formBuilder: FormBuilder,
    private menu: MenuService,
    private dialogRef: MatDialogRef<MenuTurnoModalComponent>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
    console.log(data);
    if(data){this.titulo='EDITAR MENU'}else{this.titulo='NUEVO MENU'}
    this.form = this.formBuilder.group({
      nombre_menu: [this.data?.nombre_menu, Validators.required],
      id_admin: sessionStorage.getItem('usuario'),
      imagen_menu: [this.data?.n_plazas, Validators.required],
      fecha: [this.data?.fecha, Validators.required],
      precio_pax: [this.data?.precio, Validators.required],
      observaciones: [this.data?.observaciones]
    });
  }

  ngOnInit(): void {

  }
 
  public get f() {
    console.dir(this.form.controls["fecha"].errors?.["required"])
    console.dir(this.form.controls["fecha"])
    console.dir(this.form)
    return this.form;
  }
  get f2() { return this.form.controls; }

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
    this.menu.crearMenu(this.form.value).subscribe(
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
    this.menu.actualizarMenu(item.id,this.form.value).subscribe(
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
  onFileSelected(event:any) {
    this.form.value.imagen_menu=event.target.files[0].name;
    this.imagen= event.target.files[0];
  }
  
}
