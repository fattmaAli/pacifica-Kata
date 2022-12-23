import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GestionProduitComponent } from './gestion-produit.component';
import {NgxsModule, Store} from "@ngxs/store";
import {ProductsState} from "@store/products/products.state";
import {PanierState} from "@store/panier/panier.sate";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {GestionProduitRoutingModule} from "./gestion-produit-routing.module";
import {API_URL_SERVICE_IMPL} from "@providers/api/api-url.service";
import {environment} from "@environments/environment";
import {HTTP_API_PROVIDER_IMPL} from "@providers/http/http-api.provider";
import {GetAllProducts} from "@store/products/products.actions";

describe('GestionProduitComponent', () => {
  let store :Store

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GestionProduitComponent
      ],
      imports: [
        RouterTestingModule,
        BrowserModule,
        HttpClientModule,
        NgxsModule.forRoot([
          ProductsState,
          PanierState
        ]),

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
    }).compileComponents();
    store = TestBed.inject(Store);
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(GestionProduitComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Panier'`, () => {
    const fixture = TestBed.createComponent(GestionProduitComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Panier');
  });

  it('it gets all products ', () => {
    store.dispatch(new GetAllProducts());
    const products = store.selectSnapshot(state => state.products);
    expect(products).not.toBeLessThan(0);
  });

});
