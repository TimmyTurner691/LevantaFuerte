import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { EjercicioService } from '../services/ejercicios.service';
import { Ejercicios } from '../services/ejercicios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
  ejercicios: Ejercicios[] = [];

  constructor(
    private db: DatabaseService,
    private ejercicioService: EjercicioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.db.dbState().subscribe(ready => {
      if (ready) {
        this.db.fetchNoticias().subscribe(data => {
          this.ejercicios = data;
        });
      }
    });
  }

  seleccionarEjercicio(ejercicio: Ejercicios) {
  this.ejercicioService.agregarEjercicio({
    nombre: ejercicio.titulo,
    descripcion: ejercicio.descripcion,
    peso: 20,
    sets: Array(5).fill({ reps: 5, activo: false })
  });

  this.router.navigate(['/tabs/tab1']);
}
}