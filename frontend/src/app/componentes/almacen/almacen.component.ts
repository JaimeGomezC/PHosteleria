import { Component } from '@angular/core';
import { AlmacenService } from 'src/app/servicios/almacen.service';
import { Almacen } from 'src/app/interfaces/almacen';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenComponent {
  almacenes: Almacen[] = [];

  constructor(private almacenService: AlmacenService) { }

  ngOnInit(): void {
    this.getAlmacenes();
  }
 
  getAlmacenes(): void {
    this.almacenService.getAlmacenes()
      .subscribe(almacenes => this.almacenes = almacenes);
  }
}
