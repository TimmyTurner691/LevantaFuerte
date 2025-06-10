import { Component } from '@angular/core';
import { Router } from '@angular/router'

interface EjercicioDisponible {
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  ejerciciosDisponibles: EjercicioDisponible[] = [
    { nombre: 'Peso Muerto', descripcion: 'Ejercicio de espalda baja y fuerza general.' },
    { nombre: 'Press Militar', descripcion: 'Ejercicio para hombros y tríceps.' },
    { nombre: 'Dominadas', descripcion: 'Ejercicio de espalda y bíceps.' },
    
  ];

  constructor(private router: Router) {}

  seleccionarEjercicio(ejercicio: EjercicioDisponible) {
    this.router.navigate(['/detalle-ejercicio'], { state: { ejercicio } });
  }
}
