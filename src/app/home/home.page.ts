import {Component} from '@angular/core';
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private menu: MenuController) {
  }

  navegar(ruta: string) {
    this.menu.close().then(r => console.log(`Menú cerrado: ${r}`));
  }
}
