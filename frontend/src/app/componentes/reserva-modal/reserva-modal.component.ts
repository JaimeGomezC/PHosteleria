import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente.service';


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
 
  constructor(private _formBuilder: FormBuilder,private router:ActivatedRoute,private cliente:ClienteService ) {
    this.router.params.subscribe(params => {
      console.log('Datos recibidos');
      console.log(params);
      const datos = params;
      this.datosRecibidos=params;
      this.maxPlazas=parseInt(datos['n_plazas']) ;
      console.log(this.maxPlazas);
     
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
    firstnombre: ['', Validators.required],
    firstapellidos: ['', Validators.required],
    firstemail: ['', Validators.required],
    first_tlf: ['', Validators.required],
    n_plazas: ['',[Validators.required,this.nPlazasValidar()]],
    firstobservaciones: [''],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  isLinear = true;
  
  getErrorMessage() {
    return "Correo incorrecto"
  }

  // superaPlazas(item:any) {
  //   this.firstFormGroup.controls["n_plazas"].valueChanges.subscribe((result => {
  //     console.log(`cambios: ${result}`);
  //     console.dir(this.firstFormGroup)
  //     console.log("holaaaaa")
  //     console.log(this.firstFormGroup.get('n_plazas'))
  //   }));
  // }
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
  // grabar() {
  //   this.cliente.(this.form.value).subscribe(
  //     (data) => {
  //       console.log('data');
        
  //       });
  //   }
 
  
}
