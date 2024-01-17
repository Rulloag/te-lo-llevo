import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AlertController, LoadingController} from "@ionic/angular";
import {ConfigService} from "../../../services/config.service";

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  solicitudForm!: FormGroup;
  loading!: HTMLIonLoadingElement;
  constructor(
    private configService: ConfigService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.solicitudForm = this.formBuilder.group({
      numeroDeOrden: [''],
      origen: [''],
      destino: [''],
      descripcion: [''],
      direccionOrigen: [''],
      direccionDestino: ['']
    });
  }

  async mostrarLoading() {
    this.loading = await this.loadingController.create({
      message: 'Enviando solicitud...'
    });
    await this.loading.present();
  }

  ocultarLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

  async mostrarAlerta(codigoSeguimiento: string) {
    const alert = await this.alertController.create({
      header: 'Solicitud creada',
      message: `Código de seguimiento: ${codigoSeguimiento}`,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.solicitudForm.reset();
          this.router.navigate(['/solicitudes/listar']);
        }
      }]
    });

    await alert.present();
  }

  crearSolicitud() {
    this.mostrarLoading().then(r => console.log(`Loading creado: [${r}]`));
    const apiUrl = this.configService.getApiUrl();
    this.http.post<SolicitudResponse>(`http://${apiUrl}/solicitudes`, this.solicitudForm.value)
      .subscribe(response => {
        console.log(response);
        this.ocultarLoading();
        this.mostrarAlerta(response.codigoSeguimiento);
      }, error => {
        this.ocultarLoading();
      });
  }

  goToHome() {
    this.router.navigate(['/home'], { replaceUrl: true, skipLocationChange: true, queryParamsHandling: 'merge' })
      .then(r => console.log(`Navegación desde listar a home: [${r}]`));
  }
}

interface SolicitudResponse {
  codigoSeguimiento: string;
}
