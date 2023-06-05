import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../servicios/usuario.service';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(private loginservice: UsuarioService,private router: Router) {}

  ngOnInit(): void {}

  public cerrarSesion() {
    if (this.loginservice.isLoggedIn()) {
      this.loginservice.cerrarSesion().subscribe(
        (data: any) => {
          console.log(data);
          if (data.result=='ok') {
            sessionStorage.removeItem('token');
            this.router.navigate(['']);
            Swal.fire('Sesión','Cerrada', 'success');
          }else{
            Swal.fire('Sesión', data.message, 'warning');
          }
        },
        (error: any) => {
          console.log(error);
          Swal.fire('Sesión','error', 'warning');
        }
      );
      console.log('Cerrando sesión');
    }
  }
}
