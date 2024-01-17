import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionesPageRoutingModule } from './configuraciones-routing.module';

import { ConfiguracionesPage } from './configuraciones.page';
import {IonicStorageModule} from "@ionic/storage-angular";

@NgModule({
  imports: [
    CommonModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    IonicModule,
    ConfiguracionesPageRoutingModule
  ],
  declarations: [ConfiguracionesPage]
})
export class ConfiguracionesPageModule {}
