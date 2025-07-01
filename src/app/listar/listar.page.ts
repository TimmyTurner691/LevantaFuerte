import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Ejercicios } from '../services/ejercicios';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
  standalone: false,
})
export class ListarPage implements OnInit {
  listaEjercicios: Ejercicios[] = [];

  constructor(private db: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.db.dbState().subscribe(ready => {
      if (ready) {
        this.db.fetchNoticias().subscribe(data => {
          this.listaEjercicios = data;
        });
      }
    });
  }

  editarEjercicio(ejercicio: Ejercicios) {
    this.router.navigate(['/modificar'], { state: { ejercicio } });
  }
}
