import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleEjercicioPage } from './detalle-ejercicio.page';

describe('DetalleEjercicioPage', () => {
  let component: DetalleEjercicioPage;
  let fixture: ComponentFixture<DetalleEjercicioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEjercicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
