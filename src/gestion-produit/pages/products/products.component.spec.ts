import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductsComponent} from './products.component';
import {By} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {NgxsModule, Store} from "@ngxs/store";
import {ProductsState} from "@store/products/products.state";
import {PanierState} from "@store/panier/panier.sate";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GestionProduitRoutingModule} from "../../gestion-produit-routing.module";
import {API_URL_SERVICE_IMPL} from "@providers/api/api-url.service";
import {environment} from "@environments/environment";
import {HTTP_API_PROVIDER_IMPL} from "@providers/http/http-api.provider";
import {CalculTtcDirective} from "../../shared/directives/calcul-ttc.directive";
import {ProductRoutingModule} from "@pages/products/product-routing.module";
import {RoundTaxAmountPipe} from "../../shared/pipes/round-tax-amount.pipe";
import {CommonModule} from "@angular/common";
import {RouterPaths} from "@router/router.model";
import {Router} from "@angular/router";

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductRoutingModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        NgxsModule.forRoot([
          ProductsState,
          PanierState
        ]),
        FormsModule,
        GestionProduitRoutingModule
      ],
      declarations: [ProductsComponent, CalculTtcDirective, RoundTaxAmountPipe],
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
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a button to return to panier page', () => {
    let panier = fixture.debugElement.query(By.css('.btnpanier'))
    expect(panier.nativeElement.textContent).toBe('Panier');
  });

  it('should navigate to "Panier"', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.RedirectToShoppingCart();
    expect(navigateSpy).toHaveBeenCalledWith(RouterPaths.SHOPPINGCART);
  });
});
