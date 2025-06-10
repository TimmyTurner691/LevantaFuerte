import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Ejercicio {
  nombre: string;
  descripcion: string;
  peso: number;
  sets: { reps: number; activo: boolean }[];
}

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {
  private ejerciciosSubject = new BehaviorSubject<Ejercicio[]>([
    // Ejercicios iniciales por defecto en Tab1 (Stronglifts 5x5)
    {
      nombre: 'Sentadillas',
      descripcion: 'Ejercicio de pierna fundamental para fuerza y volumen.',
      peso: 0,
      sets: Array(5).fill(null).map(() => ({ reps: 5, activo: false })),
    },
    {
      nombre: 'Press de Banca',
      descripcion: 'Ejercicio de pecho y tríceps para fuerza superior.',
      peso: 0,
      sets: Array(5).fill(null).map(() => ({ reps: 5, activo: false })),
    },
    {
      nombre: 'Remo con Barra',
      descripcion: 'Ejercicio para espalda media y fuerza general.',
      peso: 0,
      sets: Array(5).fill(null).map(() => ({ reps: 5, activo: false })),
    },
  ]);

  ejercicios$ = this.ejerciciosSubject.asObservable();

  getEjercicios(): Ejercicio[] {
    return this.ejerciciosSubject.value;
  }

  agregarEjercicio(nuevo: Ejercicio) {
    const current = this.ejerciciosSubject.value;
    this.ejerciciosSubject.next([...current, nuevo]);
  }
}
