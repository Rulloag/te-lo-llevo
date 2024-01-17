import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.page.html',
  styleUrls: ['./configuraciones.page.scss'],
})
export class ConfiguracionesPage implements OnInit {
  apiUrl!: string;

  constructor(
    private router: Router,
    private configService: ConfigService
  ) {
    this.loadApiUrl().then(r => console.log(`ApiUrl cargado: [${r}]`));
  }

  async loadApiUrl() {
    this.apiUrl = await this.configService.getApiUrl();
  }

  saveApiUrl() {
    this.configService.setApiUrl(this.apiUrl);
  }

  ngOnInit() {
    return this.loadApiUrl();
  }

  goToHome() {
    this.router.navigate(['/home'], { replaceUrl: true, skipLocationChange: true, queryParamsHandling: 'merge' })
      .then(r => console.log(`Navegación desde listar a home: [${r}]`));
  }
}
