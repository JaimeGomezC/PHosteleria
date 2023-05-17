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
  formData = new FormData();
  id?: string;
  loading = false;
  submitted = false;
  titulo?:string;
  selectedFile: File | null = null;
  imagenURL="";


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
      imagen_menu: [this.data?.imagen_menu],
      precio_pax: [this.data?.precio_pax, Validators.required],
      observaciones: [this.data?.observaciones]
    });
  }

  ngOnInit(): void {
  }
 
  public get f() {
    return this.form;
  }
  get f2() { return this.form.controls; }

  
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.formData.append('nombre_menu', this.form.value.nombre_menu);
    this.formData.append('precio_pax', this.form.value.precio_pax);
    this.formData.append('observaciones', this.form.value.observaciones);
    this.formData.append('imagen_menu', this.form.value.imagen_menu);
    // if (this.selectedFile) {
    //   this.formData.append('imagen_menu',this.selectedFile.name);
    // }
    
    if(this.data){
      this.addEditar(this.data);
    }else{
      this.addTurno();
    }
  }

  addTurno() {
    if(this.selectedFile){
      this.menu.uploadImage(this.selectedFile).subscribe(
        response=>{
           if(response['url']){
             this.form.patchValue({
              imagen_menu: response['url']
            });
            this.grabar();
           }
        },
        error=>{
          console.log(<any>error);
        }
      );
    }else{
      this.grabar();
    }
    
  }

  grabar() {
    this.menu.crearMenu(this.form.value).subscribe(
      (data) => {
        this.snack.open('Menu añadido !!', 'Aceptar', {
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

  onFileSelected(event: any):void {    
    this.selectedFile = event.target.files[0];
  };

}
