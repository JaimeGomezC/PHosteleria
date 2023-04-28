import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente.service';


@Component({
  selector: 'app-reserva-modal',
  templateUrl: './reserva-modal.component.html',
  styleUrls: ['./reserva-modal.component.css']
})
export class ReservaModalComponent implements OnInit {
  first=false;
  fecha?:any;
 
  constructor(private _formBuilder: FormBuilder,private router:ActivatedRoute,private cliente:ClienteService ) {}
  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const datos = params; // Datos recibidos
      this.fecha=datos;
      console.log(datos);
      console.log(this);
      console.log(this.fecha);
    });
  }

  firstFormGroup = this._formBuilder.group({
    firstnombre: ['', Validators.required],
    firstapellidos: ['', Validators.required],
    firstemail: ['', Validators.required],
    first_tlf: ['', Validators.required],
    firstobservaciones: ['']
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  isLinear = true;
  
  getErrorMessage() {
    return "Correo incorrecto"
  }

  // grabar() {
  //   this.cliente.(this.form.value).subscribe(
  //     (data) => {
  //       console.log('data');
        
  //       });
  //   }
 
  
}
