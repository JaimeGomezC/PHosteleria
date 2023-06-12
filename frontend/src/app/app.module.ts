import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule,routingComponents } from './app-routing.module';//Se hace export en el routing de todos las rutas, es una buena practica 
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DatePipe } from '@angular/common';
//componentes
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { GaleriaComponent } from './componentes/galeria/galeria.component';



//Angular Material
import { SharedModule } from './shared/shared.module';
import { GaleriaAdminComponent } from './componentes/galeria-admin/galeria-admin.component';
import { GaleriaAdminModalComponent } from './componentes/galeria-admin-modal/galeria-admin-modal.component';
import { CarouselComponent } from './componentes/carousel/carousel.component';
import { Carousel2Component } from './componentes/carousel2/carousel2.component';
import { Carousel3Component } from './componentes/carousel3/carousel3.component';
import { Carousel4Component } from './componentes/carousel4/carousel4.component';
import { Carousel5Component } from './componentes/carousel5/carousel5.component';
import { PaymentFormComponent } from './componentes/payment-form-component/payment-form-component.component';
import { AlmacenComponent } from './componentes/almacen/almacen.component';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent, 
    FooterComponent,
    routingComponents,
    GaleriaComponent,
    GaleriaAdminComponent,
    GaleriaAdminModalComponent,
    CarouselComponent,
    Carousel2Component,
    Carousel3Component,
    Carousel4Component,
    Carousel5Component,
    PaymentFormComponent,
    AlmacenComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    FullCalendarModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
