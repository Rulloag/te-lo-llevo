import {IonicStorageModule} from "@ionic/storage-angular";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {IonicModule, IonicRouteStrategy} from "@ionic/angular";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {RouteReuseStrategy} from "@angular/router";
import {NgModule} from "@angular/core";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot() // Aquí se carga IonicStorageModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
