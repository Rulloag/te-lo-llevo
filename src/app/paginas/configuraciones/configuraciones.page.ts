import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ConfigService} from "../../services/config.service";
import {AlertController, LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.page.html',
  styleUrls: ['./configuraciones.page.scss'],
})
export class ConfiguracionesPage implements OnInit {
  apiUrl!: string;

  constructor(
    private router: Router,
    private configService: ConfigService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.loadApiUrl().then(r => console.log(`ApiUrl cargado: [${r}]`));
  }

  async loadApiUrl() {
    this.apiUrl = await this.configService.getApiUrl();
    return this.apiUrl;
  }

  async saveApiUrl() {
    const loading = await this.loadingController.create({
      message: 'Guardando...',
    });
    await loading.present();

    this.configService.setApiUrl(this.apiUrl);

    await loading.dismiss();

    const alert = await this.alertController.create({
      header: 'Guardado',
      message: 'La URL de la API se ha guardado correctamente.',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
    return this.loadApiUrl();
  }

  goToHome() {
    this.router.navigate(['/home'], { replaceUrl: true, skipLocationChange: true, queryParamsHandling: 'merge' })
      .then(r => console.log(`Navegación desde listar a home: [${r}]`));
  }
}
