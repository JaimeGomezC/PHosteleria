import { Component, OnInit,ViewChild  } from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { ReservaService } from 'src/app/servicios/reserva.service';
import { MenuService } from 'src/app/servicios/menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { MatStepper } from '@angular/material/stepper';




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
  plzVacantes?:any;
  plazavalidar?:boolean=false;
  urlImagen?:any;
  @ViewChild('stepper') stepper!: MatStepper;
  isEditable = true;

 
  constructor(private _formBuilder: FormBuilder,private router:ActivatedRoute,private cliente:ClienteService,private menu:MenuService,private snack: MatSnackBar,private reserva:ReservaService,private http: HttpClient ) {
    this.router.params.subscribe(params => {
      console.log('Datos recibidos');
      console.log(params);
      this.datosRecibidos=params;
      this.maxPlazas=parseInt(this.datosRecibidos['n_plazas']) ;
      console.log(this.maxPlazas);
      if(params["id_menu"]!="null"){
        this.getMenuImg(params["id_menu"]);
      }
      
    });
  }
  ngOnInit(): void {
    this.cagardatos();
    this.calcularPlazasVacantes();
    this.stepper = this.stepper;
  }

  cagardatos(){
    this.firstFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
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
   
  }
  calcularPlazasVacantes(){
    this.reserva.calcularPlazasVacantes(this.datosRecibidos.idTurno).subscribe(
      (data) => {
        console.log("data3333")
        console.log(data)
        this.plzVacantes=data.plazas_vacantes;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  reservaMax(item:any){
    if (item.value > ((0.1 * this.maxPlazas)+this.plzVacantes)) {
      item.setErrors({ 'exceedsMaxPlazas': true });
    }
  }
  secondFormGroup = this._formBuilder.group({
    forma_pago: ['', Validators.required],
  });
  lastFormGroup = this._formBuilder.group({
    codigo: ['', Validators.required],
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
    Swal.fire({
      title: 'Se dispone a relaizar la reserva',
      text: "Revise los datos, ya no podrá modificarlos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.dir(this.stepper)
        this.stepper.next();
        this.isEditable=false;
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
    })
    
  }
  redirectToRedsys(): void {
    // Aquí puedes agregar la lógica para redirigir al usuario a Redsys
    // por ejemplo, utilizando el servicio Router de Angular
    // this.router.navigate(['/redsys']);
  }
  enviarPago() {
    const url = 'https://sis-t.redsys.es:25443/sis/rest/trataPeticionREST';
    
    const data = {
      Ds_Merchant_MerchantCode: '999008881',
      Ds_Merchant_Terminal: '001',
      Ds_Merchant_Order: '111',
      Ds_Merchant_Amount: '1000', // Importe en céntimos
      Ds_Merchant_Currency: '978', // Código de moneda (ejemplo: euros)
      Ds_Merchant_ProductDescription: 'Descripción del producto',
      Ds_Merchant_Titular: 'Sebastián',
      Ds_Merchant_MerchantURL: 'https://tu_url_de_retorno.com',
      Ds_Merchant_UrlOK: 'https://tu_url_de_confirmacion.com',
      Ds_Merchant_UrlKO: 'https://tu_url_de_cancelacion.com',
      // Agrega otros campos necesarios según tus requerimientos
    };
  
    this.http.post(url, data).subscribe((response) => {
      console.log('Respuesta de Redsys:', response);
      // Aquí puedes manejar la respuesta de Redsys
    });
  }
}
