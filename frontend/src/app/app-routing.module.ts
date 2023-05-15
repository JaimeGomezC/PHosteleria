import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Componentes
import { ReservasComponent } from './componentes/reservas/reservas.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { LoginComponent } from './componentes/login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { TurnosModalAddComponent } from './componentes/turnos-modal-add/turnos-modal-add.component';
import { ReservaModalComponent } from './componentes/reserva-modal/reserva-modal.component';
import { ReservaClienteComponent } from './componentes/reserva-cliente/reserva-cliente.component';
import { ReservaClienteModalComponent } from './componentes/reserva-cliente-modal/reserva-cliente-modal.component';
import { MenuTurnoComponent } from './componentes/menu-turno/menu-turno.component';
import { MenuTurnoModalComponent } from './componentes/menu-turno-modal/menu-turno-modal.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { UsuarioModalComponent } from './componentes/usuario-modal/usuario-modal.component';
import { ConctatoComponent } from './componentes/conctato/conctato.component';



const routes: Routes = [
{path:'',component:InicioComponent},
{path:'reservas',component:ReservasComponent},
{path:'turnos',component:TurnosComponent},
{path:'login',component:LoginComponent},
{path:'menu',component:MenuComponent},
{path:'turnosModal',component:TurnosModalAddComponent},
{path:'ReservasModal',component:ReservaModalComponent},
{path:'menucomida',component:MenuTurnoComponent},
{path:'ReservaCliente',component:ReservaClienteComponent},
{path:'MenuTurnoModalComponent',component:MenuTurnoModalComponent},
{path:'Usuarios',component:UsuarioComponent},
{path:'UsuarioModal',component:UsuarioModalComponent},
{path:'Conctato',component:ConctatoComponent},


{path:'reservaClienteModal',component:ReservaClienteModalComponent},

{path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[ReservasComponent,InicioComponent,
  TurnosComponent,LoginComponent,
  MenuComponent,TurnosModalAddComponent,
  ReservaModalComponent,ReservaClienteComponent,
  ReservaClienteModalComponent,MenuTurnoComponent,
  MenuTurnoModalComponent,UsuarioComponent,UsuarioModalComponent,
  ConctatoComponent
]