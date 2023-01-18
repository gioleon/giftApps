import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {
  // Agarrando info de un input
  @ViewChild('txtBuscar') txtBuscar?: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  buscar(): void {
    if (this.txtBuscar?.nativeElement.value != undefined) {
      let valor: string = this.txtBuscar.nativeElement.value
        .trim()
        .toLowerCase();

      if (valor.length != 0) {
        // Buscar gifts
        this.gifsService.buscarGifs(valor);

        // reestablecer el input
        this.txtBuscar.nativeElement.value = '';
      }
    }
  }
}
