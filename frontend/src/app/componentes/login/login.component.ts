import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormControlName,
} from '@angular/forms';
import { ApiService } from 'src/app/servicios/api.service';
import { Login } from 'src/app/interfaces/login';
import { Response } from 'src/app/interfaces/response';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private api: ApiService,
    private loginService: UsuarioService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  errorStatus: boolean = false;
  errorMsj: any = '';

  ngOnInit(): void {}

  formSubmit(form: any) {
    if (form.email.trim() == '' || form.email == null) {
      // Swal.fire('Introduzca el email','Email','success');
      this.snack.open('El email es requerido !!', 'Aceptar', {
        duration: 1000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }
    if (form.password.trim() == '' || form.password == null) {
      this.snack.open('El password es requerido !!', 'Aceptar', {
        duration: 1000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }

    this.loginService.generarToken(form).subscribe(
      (data) => {
        let dataResponse: Response = data;
        if (dataResponse.result == 'ok') {
          sessionStorage.setItem('token', dataResponse.accessToken);
          sessionStorage.setItem('usuario', dataResponse.user);
          this.router.navigate(['turnos']);
          this.loginService.login();
        }
      },
      (error) => {
        this.errorStatus = true;
        this.errorMsj = error.error.message;
      }
    );
  }
}
