import {HttpClientModule} from '@angular/common/http';
import {ApplicationRef, DoBootstrap, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {environment} from '@environments/environment';
import {NgxsModule, Store} from '@ngxs/store';
import {API_URL_SERVICE_IMPL} from '@providers/api/api-url.service';
import {HTTP_API_PROVIDER_IMPL} from '@providers/http/http-api.provider';
import {ProductsState} from '@store/products/products.state';
import {GestionProduitRoutingModule} from './gestion-produit-routing.module';
import {GestionProduitComponent} from './gestion-produit.component';
import {FormsModule} from "@angular/forms";
import {PanierState} from "@store/panier/panier.sate";

@NgModule({
  declarations: [
    GestionProduitComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxsModule.forRoot([
      ProductsState,
      PanierState
    ]),
    FormsModule,
    GestionProduitRoutingModule

  ],
  providers: [
    {
      provide: API_URL_SERVICE_IMPL,
      useClass: environment.apiUrlServiceClass,
    },
    {
      provide: HTTP_API_PROVIDER_IMPL,
      useClass: environment.httpApiProviderClass,
    }

  ],
  bootstrap: [GestionProduitComponent]
})
export class GestionProduitModule {
}
