import { Component, OnInit } from '@angular/core';
import { EjercicioService } from '../services/ejercicios.service';
import { PaisService } from '../services/pais.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  pais: any;

  constructor(
    private ejerciciosService: EjercicioService,
    private paisService: PaisService,
    private router: Router
  ) {}

  ejercicios: any[] = [];

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.ejercicios = this.ejerciciosService.obtenerRutina();

    this.ejerciciosService.rutina$.subscribe(data => {
      this.ejercicios = data;
    });

    this.pais = this.paisService.getPais();

  //   if (ejercicioSeleccionado) {
  //   this.ejercicios.push({
  //     nombre: ejercicioSeleccionado.titulo,
  //     descripcion: ejercicioSeleccionado.descripcion,
  //     peso: 20,
  //     sets: Array(5).fill({ reps: 5, activo: false })
  //   });
  // }
  }

  timerVisible = false; // controla si el timer se muestra o no
  timerValue = 0; // tiempo en segundos
  timerInterval: any = null;

  // Para controlar cuál set está activo para el timer
  ejercicioActivoIndex: number | null = null;
  setActivoIndex: number | null = null;

  clickEnSet(ejercicio: any, index: number, ejercicioIndex: number) {
    const set = ejercicio.sets[index];

    if (!set.activo) {
      set.activo = true;
    } else if (set.reps > 1) {
      set.reps--;
    } else if (set.reps === 1) {
      set.reps = 0;
    } else {
      set.reps = 5;
      set.activo = false;
    }

    // Lógica del timer

    if (set.reps === 0) {
      // Si el set que clickeaste llegó a 0 reps, oculta y resetea timer
      this.stopTimer();
    } else if (this.isUltimoSet(ejercicioIndex, index)) {
      // Si es el último set del último ejercicio (terminaste todo), ocultar timer
      this.stopTimer();
    } else if (index === 0) {
      // Si clickeaste la primera serie, mostrar timer y reiniciar contador
      this.startTimer(ejercicioIndex, index);
    } else if (
      this.timerVisible &&
      ejercicioIndex === this.ejercicioActivoIndex
    ) {
      // Si timer visible y clickeas otro set del mismo ejercicio, reiniciar timer
      this.startTimer(ejercicioIndex, index);
    }
  }

  startTimer(ejercicioIndex: number, setIndex: number) {
    this.ejercicioActivoIndex = ejercicioIndex;
    this.setActivoIndex = setIndex;
    this.timerValue = 0;
    this.timerVisible = true;

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      this.timerValue++;
    }, 1000);
  }

  stopTimer() {
    this.timerVisible = false;
    this.timerValue = 0;

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    this.ejercicioActivoIndex = null;
    this.setActivoIndex = null;
  }

  isUltimoSet(ejercicioIndex: number, setIndex: number): boolean {
    const ultimoEjercicioIndex = this.ejercicios.length - 1;
    const ultimoSetIndex =
      this.ejercicios[ultimoEjercicioIndex].sets.length - 1;

    return (
      ejercicioIndex === ultimoEjercicioIndex && setIndex === ultimoSetIndex
    );
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const paddedSecs = secs < 10 ? '0' + secs : secs;
    return `${mins}:${paddedSecs}`;
  }
}
