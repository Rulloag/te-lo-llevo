import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Solicitud} from '../../../modelos/solicitud';
import {Transporte} from '../../../modelos/transporte';
import {Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {ConfigService} from "../../../services/config.service";

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  solicitudes: Solicitud[] = [];

  constructor(
    private configService: ConfigService,
    private http: HttpClient,
    private router: Router,
    private loadingController: LoadingController
  ) {
  }

  ngOnInit() {
    this.getSolicitudes().then(r => console.log(`Solicitudes cargadas: [${r}]`));
  }

  async getSolicitudes() {
    const loading = await this.loadingController.create({
      message: 'Cargando solicitudes...',
    });
    await loading.present();
    const apiUrl = this.configService.getApiUrl();
    this.http.get<any[]>(`http://${apiUrl}/solicitudes`)
      .subscribe(data => {
        this.solicitudes = data.map(item => {
          let transporte = item.transporte
            ? new Transporte(
              item.transporte.id,
              item.transporte.patente,
              item.transporte.anio,
              item.transporte.marca,
              item.transporte.modelo)
            : null; // or a default Transporte instance

          return new Solicitud(
            item.id,
            item.numeroDeOrden,
            item.origen,
            item.destino,
            item.descripcion,
            item.direccionOrigen,
            item.direccionDestino,
            item.codigoSeguimiento,
            item.estado,
            transporte
          );
        });

        loading.dismiss();
      }, err => {
        // handle error here
        loading.dismiss();
      });
  }

  async filtrarTransportes(solicitud: Solicitud) {
    const loading = await this.loadingController.create({
      message: 'Buscando transportes...',
    });
    await loading.present();

    this.http.get<{
      transportes: Transporte[]
    }>('http://192.168.100.27:8080/transportes/busqueda?textoBusqueda=' + solicitud.textoBusqueda)
      .subscribe(data => {
        solicitud.transportesFiltrados = data.transportes;
        loading.dismiss();
      }, err => {
        // handle error here
        loading.dismiss();
      });
  }

  seleccionarTransporte(solicitud: Solicitud, transporte: Transporte) {
    solicitud.transporteSeleccionado = transporte;
    solicitud.transportesFiltrados = [];
    solicitud.textoBusqueda = `${transporte.marca} ${transporte.modelo}: ${transporte.patente}`;
  }

  async asignarTransporte(solicitud: Solicitud) {
    if (solicitud.transporteSeleccionado) {
      const loading = await this.loadingController.create({
        message: 'Asignando transporte...',
      });
      await loading.present();

      this.http.patch<{estado: string}>('http://192.168.100.27:8080/solicitudes/' + solicitud.codigoSeguimiento + '/asignacion', {transporteId: solicitud.transporteSeleccionado.id})
        .subscribe(response => {
          solicitud.transporte = solicitud.transporteSeleccionado;
          solicitud.transporteSeleccionado = null;
          solicitud.estado = response.estado;
          loading.dismiss();
        }, err => {
          // handle error here
          loading.dismiss();
        });
    }
  }

  goToHome() {
    this.router.navigate(['/home'], { replaceUrl: true, skipLocationChange: true, queryParamsHandling: 'merge' })
      .then(r => console.log(`Navegación desde listar a home: [${r}]`));
  }
}
