import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GaleriaService } from 'src/app/servicios/galeria.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-galeria-admin-modal',
  templateUrl: './galeria-admin-modal.component.html',
  styleUrls: ['./galeria-admin-modal.component.css']
})
export class GaleriaAdminModalComponent implements OnInit {

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
    private galeria: GaleriaService,
    private dialogRef: MatDialogRef<GaleriaAdminModalComponent>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
    console.log(data);
    if(data){this.titulo='EDITAR IMAGEN'}else{this.titulo='NUEVA IMAGEN'}
    this.form = this.formBuilder.group({
      nombre_imagen: [this.data?.nombre_imagen, /*Validators.required*/],
      id_admin: sessionStorage.getItem('usuario'),
      imagen_url: [this.data?.imagen_url, /*Validators.required*/],      
      descripcion: [this.data?.descripcion, /*Validators.required*/],
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

    this.formData.append('nombre_imagen', this.form.value.nombre_imagen);
    this.formData.append('descripcion', this.form.value.desccripcion);
    this.formData.append('observaciones', this.form.value.observaciones);
    this.formData.append('imagen_url', this.form.value.imagen_url);

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
      this.galeria.uploadFoto(this.selectedFile).subscribe(
        response=>{
           if(response['url']){
             this.form.patchValue({
              imagen_url: response['url']
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
    this.galeria.añadirFoto(this.form.value).subscribe(
      (data) => {
        this.snack.open('Imagen añadida !!', 'Aceptar', {
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
    this.galeria.actualizarFoto(item.id,this.form.value).subscribe(
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
