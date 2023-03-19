import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Componentes
import { ReservasComponent } from './componentes/reservas/reservas.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';




const routes: Routes = [
{path:'',component:InicioComponent},
{path:'reservas',component:ReservasComponent},
{path:'turnos',component:TurnosComponent},
{path:'**',redirectTo:'',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
