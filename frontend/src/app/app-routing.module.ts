import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Componentes
import { ReservasComponent } from './componentes/reservas/reservas.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { LoginComponent } from './componentes/login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';




const routes: Routes = [
{path:'',component:InicioComponent},
{path:'reservas',component:ReservasComponent},
{path:'turnos',component:TurnosComponent},
{path:'login',component:LoginComponent},
{path:'menu',component:MenuComponent},

{path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[ReservasComponent,InicioComponent,TurnosComponent,LoginComponent,MenuComponent]