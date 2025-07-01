import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ejercicios } from './ejercicios';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  public database!: SQLiteObject;

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  tablaEjercicio: string =
    'CREATE TABLE IF NOT EXISTS ejercicio(id_ejercicio INTEGER PRIMARY KEY autoincrement, titulo VARCHAR(40) NOT NULL, descripcion TEXT NOT NULL);';

  registroEjercicio: string =
    "INSERT or IGNORE INTO ejercicio(id_ejercicio,titulo,descripcion) VALUES (1,'Peso Muerto','Ejercicio de espalda baja y fuerza general.');";

  listaEjercicio = new BehaviorSubject([]);

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private alertController: AlertController
  ) {
    this.crearBD();
  }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  dbState() {
    return this.isDBReady.asObservable();
  }

  fetchNoticias(): Observable<Ejercicios[]> {
    return this.listaEjercicio.asObservable();
  }

  crearBD() {
    this.platform
      .ready()
      .then(() => {
        this.sqlite
          .create({
            name: 'bdejercicios.db',

            location: 'default',
          })
          .then((db: SQLiteObject) => {
            this.database = db;

            this.crearTablas();
          });
      })
      .catch((e) => {
        this.presentAlert('Error en las plataforma: ' + e);
      });
  }

  async crearTablas() {
    try {
      await this.database.executeSql(this.tablaEjercicio, []);
      await this.database.executeSql(this.registroEjercicio, []);
      this.isDBReady.next(true);

      this.buscarEjercicios();
    } catch (error) {
      this.presentAlert('Error en las tablas: ' + error);
    }
  }

  buscarEjercicios() {
    return this.database
      .executeSql('SELECT * FROM ejercicio', [])
      .then((res) => {
        let items: Ejercicios[] = [];

        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            items.push({
              id_ejercicio: res.rows.item(i).id_ejercicio,

              titulo: res.rows.item(i).titulo,

              descripcion: res.rows.item(i).descripcion,
            });
          }
        }

        this.listaEjercicio.next(items as any);
      });
  }

  insertarEjercicio(titulo: string, descripcion: string) {
    return this.database
      .executeSql('INSERT INTO ejercicio(titulo,descripcion) VALUES(?,?)', [
        titulo,
        descripcion,
      ])
      .then((res) => {
        this.buscarEjercicios();
      });
  }

  modificarEjercicio(id: string, titulo: string, descripcion: string) {
    return this.database
      .executeSql(
        'UPDATE ejercicio SET titulo = ?, descripcion = ? WHERE id_ejercicio = ?',
        [titulo, descripcion, id]
      )
      .then((res) => {
        this.buscarEjercicios();
      });
  }

  eliminarEjercicio(id: string) {
    return this.database
      .executeSql('DELETE FROM ejercicio WHERE id_ejercicio = ?', [id])
      .then((res) => {
        this.buscarEjercicios();
      });
  }
}
