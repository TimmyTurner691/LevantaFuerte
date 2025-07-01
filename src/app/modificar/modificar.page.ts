import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
  standalone: false,
})
export class ModificarPage {
  id: string = '';
  titulo: string = '';
  descripcion: string = '';

  constructor(private db: DatabaseService, private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const ejercicio = nav?.extras.state?.['ejercicio'];

    if (ejercicio) {
      this.id = ejercicio.id_ejercicio;
      this.titulo = ejercicio.titulo;
      this.descripcion = ejercicio.descripcion;
    }
  }

  guardar() {
    this.db.modificarEjercicio(this.id, this.titulo, this.descripcion).then(() => {
      this.router.navigate(['/listar']);
    });
  }
}
