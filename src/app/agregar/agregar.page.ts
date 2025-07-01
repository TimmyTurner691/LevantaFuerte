import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
  standalone: false,
})
export class AgregarPage {
  titulo = '';
  descripcion = '';

  constructor(private db: DatabaseService, private router: Router) {}

  agregar() {
    if (this.titulo.trim() && this.descripcion.trim()) {
      this.db.insertarEjercicio(this.titulo, this.descripcion).then(() => {
        this.router.navigate(['/listar']);
      });
    }
  }
}
