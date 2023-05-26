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
  public firstFormGroup!: any;
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
      if(params["id_menu"]!="null"){
        this.getMenuImg(params["id_menu"]);
      }
      
    });
  }
  ngOnInit(): void {
    this.cagardatos()
  }
  cagardatos(){
    this.firstFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      num_comensales: ['',[Validators.required,this.nPlazasValidar()]],
      observaciones_cliente: [''],
      id_turno: [1],
      fecha: [this.datosRecibidos ? this.datosRecibidos.fechaReserva : ''],
      forma_pago: [''],
      estado: [''],
      precio_total: [0],
      pagado_base: [0],
      pagado_total: [0],
      codigo_verificacion: [''],
      producto_extra: [''],
    });
    if (this.maxPlazas && this.firstFormGroup.controls['num_comensales'].value > this.maxPlazas) {
      // Mostrar error en el HTML
      const nPlazasControl = this.firstFormGroup.controls['num_comensales'];
      nPlazasControl.setErrors({ 'exceedsMaxPlazas': true });
    }
  }
  
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
    this.cliente.agregarCliente(this.f.value).subscribe(
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
