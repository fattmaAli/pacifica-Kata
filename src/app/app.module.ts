import {HttpClientModule} from '@angular/common/http';
import {ApplicationRef, DoBootstrap, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {environment} from '@environments/environment';
import {NgxsModule, Store} from '@ngxs/store';
import {API_URL_SERVICE_IMPL} from '@providers/api/api-url.service';
import {HTTP_API_PROVIDER_IMPL} from '@providers/http/http-api.provider';
import {ProductsState} from '@store/products/products.state';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {GetAllProducts} from "@store/products/products.actions";
import {PanierState} from "@store/panier/panier.sate";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxsModule.forRoot([
      ProductsState,
      PanierState
    ]),
    FormsModule,
    AppRoutingModule

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
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(private store: Store) {
  // }
  // ngDoBootstrap(appRef: ApplicationRef): void {
  //   this.store.dispatch(new GetAllProducts());
  //   appRef.bootstrap(AppComponent)
  // }
}
