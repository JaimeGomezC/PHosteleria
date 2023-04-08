import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormControlName} from '@angular/forms';
import { ApiService } from 'src/app/servicios/api.service';
import { Login } from 'src/app/interfaces/login';
import { Response } from 'src/app/interfaces/response';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  loginForm= new FormGroup({
    username:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  })
  constructor(private api:ApiService, private router:Router) {   }

  errorStatus:boolean=false;
  errorMsj:any='';

  ngOnInit(): void {
  }

  onLogin(form:Login){
    this.api.autentificar(form).subscribe(data=>{
      console.log(data);
      let dataResponse:Response=data;
      if(dataResponse.result =='ok'){
        sessionStorage.setItem("token",dataResponse.token);
        this.router.navigate(['turnos']);
      }else{
        this.errorStatus=true;
        this.errorMsj=dataResponse.details
      }
    })
  }

}
