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

import { ModalLupaComponent } from './componentes/modal-lupa/modal-lupa.component';
import { CarouselInicioComponent } from './componentes/carousel-inicio/carousel-inicio.component';
import { GaleriaAdminComponent } from './componentes/galeria-admin/galeria-admin.component';
import { GaleriaAdminModalComponent } from './componentes/galeria-admin-modal/galeria-admin-modal.component';
import { CarouselComponent } from './componentes/carousel/carousel.component';
import { GaleriaComponent } from './componentes/galeria/galeria.component';



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
{path:'contacto',component:ConctatoComponent},
{path:'galeria',component:GaleriaComponent},
{path:'ModalLupa',component:ModalLupaComponent},
{path:'GaleriaAdmin',component:GaleriaAdminComponent},
{path:'GaleriaAdminModal',component:GaleriaAdminModalComponent},
// {path:'CarouselInicio',component:CarouselInicioComponent},
{path:'Carousel', component:CarouselInicioComponent},


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
  ConctatoComponent,CarouselInicioComponent,ModalLupaComponent,CarouselComponent
]