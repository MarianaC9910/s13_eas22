import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
  template: `
    <button (click)="takePhoto()">Tomar Foto</button>
    <button (click)="getLocation()">Obtener Ubicación</button>
    <button (click)="checkNetwork()">Verificar Red</button>
  `,
})
export class HomePage {

  constructor() {}
  photo: string | null = null;
  location: { latitude: number; longitude: number } | null = null;
  networkStatus: boolean | null = null;
  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
      });
      this.photo = image.webPath || null;
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  async getLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } catch (error) {
      console.error('Error al obtener ubicación:', error);
    }
  }

  async checkNetwork() {
    try {
      const status = await Network.getStatus();
      this.networkStatus = status.connected;
    } catch (error) {
      console.error('Error al verificar red:', error);
    }
  }
}

