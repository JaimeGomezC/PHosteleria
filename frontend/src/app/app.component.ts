import { Component } from '@angular/core';
import { ApiService } from './servicios/api.service';
import { UsuarioService } from './servicios/usuario.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(public login:UsuarioService) {   }
}
