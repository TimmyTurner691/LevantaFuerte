import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleEjercicioPageRoutingModule } from './detalle-ejercicio-routing.module';

import { DetalleEjercicioPage } from './detalle-ejercicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleEjercicioPageRoutingModule
  ],
  declarations: [DetalleEjercicioPage]
})
export class DetalleEjercicioPageModule {}
