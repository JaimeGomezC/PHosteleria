import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reserva-modal',
  templateUrl: './reserva-modal.component.html',
  styleUrls: ['./reserva-modal.component.css']
})
export class ReservaModalComponent implements OnInit {
  first=false;
  fecha?:any;
 
  constructor(private _formBuilder: FormBuilder,private router:ActivatedRoute) {}
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
    firstobservaciones: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  isLinear = true;
  
  getErrorMessage() {
    const form = this.firstFormGroup;
    console.log('dddd')
    console.log(form.root.status)
    
    if (form.root.status=='VALID') {
      this.first=false;
      console.log('El formulario tiene errores:');
    } else {
      // El formulario no tiene errores, proceder con el envío de datos
      console.log('El formulario se ha completado correctamente');
    }
  }
  
}
