import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { PaisService } from '../services/pais.service';

@Component({
  selector: 'app-apirest',
  templateUrl: './apirest.page.html',
  styleUrls: ['./apirest.page.scss'],
  standalone: false,
})
export class ApirestPage implements OnInit {
  countries: any[] = [];

  cargando: boolean = true;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private paisService: PaisService
  ) {}

  ngOnInit() {
    this.apiService.getPaises().subscribe({
      next: (data) => {
        this.countries = data.slice(0, 10); //mostrar solo 10

        this.cargando = false;
      },

      error: (err) => {
        console.error('Error al obtener paises', err);

        this.cargando = false;
      },
    });
  }

  seleccionarPais(country: any) {
    this.paisService.setPais(country);

    this.router.navigate(['/tabs/tab1']);
  }
}
