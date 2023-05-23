import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { MenuService } from 'src/app/servicios/menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-reserva-modal',
  templateUrl: './reserva-modal.component.html',
  styleUrls: ['./reserva-modal.component.css']
})
export class ReservaModalComponent implements OnInit {
  first=false;
  datosRecibidos?:any;
  maxPlazas?:any;
  plazavalidar?:boolean=false;
  urlImagen?:any;
 
  constructor(private _formBuilder: FormBuilder,private router:ActivatedRoute,private cliente:ClienteService,private menu:MenuService,private snack: MatSnackBar ) {
    this.router.params.subscribe(params => {
      console.log('Datos recibidos');
      console.log(params);
      const datos = params;
      this.datosRecibidos=params;
      this.maxPlazas=parseInt(datos['n_plazas']) ;
      console.log(this.maxPlazas);
      if(params["id_menu"]){
        this.getMenuImg(params["id_menu"]);
      }
      if (this.maxPlazas && this.firstFormGroup.controls['n_plazas'].value > this.maxPlazas) {
        // Mostrar error en el HTML
        const nPlazasControl = this.firstFormGroup.controls['n_plazas'];
        nPlazasControl.setErrors({ 'exceedsMaxPlazas': true });
      }
    });
  }
  ngOnInit(): void {
  }

  firstFormGroup = this._formBuilder.group({
    nombre: ['', Validators.required],
    apellido1: ['', Validators.required],
    apellido2: ['', Validators.required],
    email: ['', Validators.required],
    telefono: ['', Validators.required],
    n_plazas: ['',[Validators.required,this.nPlazasValidar()]],
    observaciones_cliente: [''],
    idTurno: [this.datosRecibidos ? this.datosRecibidos.idTurno : ''],
    fecha: [this.datosRecibidos ? this.datosRecibidos.fechaReserva : ''],
    forma_pago: [''],
    estado: [''],
    precio_total: [''],
    pagado_base: [''],
    pagado_total: [''],
    codigo_verificacion: [''],
    producto_extra: [''],
  });
  secondFormGroup = this._formBuilder.group({
    forma_pago: ['', Validators.required],
  });

  isLinear = true;
  
  getErrorMessage() {
    return "Correo incorrecto"
  }


  nPlazasValidar() {
    return (control: AbstractControl): ValidationErrors | null => {
      const n_plazas = control.value;
      if (n_plazas > this.maxPlazas) {
        this.plazavalidar=true;
        return { n_plazasSuperior: true };
      }
      this.plazavalidar=false;
      return null;
    };
  }
  public get f() {
    return this.firstFormGroup;
  }

  getMenuImg(item: any): void {
    this.menu.getMenu(item).subscribe(
      (data) => {
        console.log("data3333")
        console.log(data)
        this.urlImagen=data.imagen_menu;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  addTurno() {
    this.cliente.agregarCliente(this.firstFormGroup.value).subscribe(
      (data) => {
        const obj = JSON.parse(data.result);
        this.snack.open('Reserva añadida !!\n'+obj.message, 'Aceptar', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
      (error) => {
        this.snack.open(error.message, 'Aceptar', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    );
  }
  redirectToRedsys(): void {
    // Aquí puedes agregar la lógica para redirigir al usuario a Redsys
    // por ejemplo, utilizando el servicio Router de Angular
    // this.router.navigate(['/redsys']);
  }
}
