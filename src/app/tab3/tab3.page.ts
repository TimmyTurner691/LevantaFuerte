import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  photo = '';
  constructor() {}

  ngOnInit() {}

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    this.photo = image.dataUrl!;
  }

  async compartirFoto() {
    if (!this.photo) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mi Progreso 💪',
          text: '¡Mira mi entrenamiento!',
          url: this.photo,
        });
      } catch (error) {
        console.error('Error al compartir:', error);
      }
    } else {
      alert('La función de compartir no está disponible en este dispositivo.');
    }
  }
  resetFoto() {
    this.photo = '';
  }
}
