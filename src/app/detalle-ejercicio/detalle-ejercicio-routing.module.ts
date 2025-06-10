import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleEjercicioPage } from './detalle-ejercicio.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleEjercicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleEjercicioPageRoutingModule {}
