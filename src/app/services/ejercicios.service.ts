import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EjercicioService {
  private ejercicio = new BehaviorSubject<any[]>([]);
  rutina$ = this.ejercicio.asObservable();

  agregarEjercicio(ejercicio: any) {
    const actual = this.ejercicio.getValue();
    this.ejercicio.next([...actual, ejercicio]);
  }

  obtenerRutina() {
    return this.ejercicio.getValue();
  }
}