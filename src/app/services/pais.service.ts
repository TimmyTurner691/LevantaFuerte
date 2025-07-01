import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private paisSeleccionado: any = null;

  setPais(pais: any) {
    this.paisSeleccionado = pais;
  }

  getPais() {
    return this.paisSeleccionado;
  }
}