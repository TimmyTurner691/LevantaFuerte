import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EjerciciosService, Ejercicio } from '../services/ejercicios.service';

@Component({
  selector: 'app-detalle-ejercicio',
  templateUrl: './detalle-ejercicio.page.html',
  styleUrls: ['./detalle-ejercicio.page.scss'],
  standalone: false
})
export class DetalleEjercicioPage implements OnInit {
  ejercicio: { nombre: string; descripcion: string };

  constructor(private router: Router, private ejerciciosService: EjerciciosService) {
    const nav = this.router.getCurrentNavigation();
    this.ejercicio = nav?.extras.state?.['ejercicio'];
  }

  ngOnInit() {}

  agregarEjercicio() {
    const nuevoEjercicio: Ejercicio = {
      nombre: this.ejercicio.nombre,
      descripcion: this.ejercicio.descripcion,
      peso: 0,
      sets: Array(5).fill(null).map(() => ({ reps: 5, activo: false }))
    };

    this.ejerciciosService.agregarEjercicio(nuevoEjercicio);
    this.router.navigate(['/tabs/tab1']);  // regresa a Tab1
  }
}
