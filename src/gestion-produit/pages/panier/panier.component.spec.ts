import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PanierComponent} from './panier.component';
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {RouterPaths} from "@router/router.model";
import {NgxsModule, Store} from "@ngxs/store";
import {ProductsState} from "@store/products/products.state";
import {PanierState} from "@store/panier/panier.sate";
import {API_URL_SERVICE_IMPL} from "@providers/api/api-url.service";
import {environment} from "@environments/environment";
import {HTTP_API_PROVIDER_IMPL} from "@providers/http/http-api.provider";
import {HttpClientModule} from "@angular/common/http";
import {By} from "@angular/platform-browser";

describe('PanierComponent', () => {
  let component: PanierComponent;
  let fixture: ComponentFixture<PanierComponent>;
  let router: Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
        NgxsModule.forRoot([
          ProductsState,
          PanierState
        ]),
      ],
      declarations: [PanierComponent],
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

    fixture = TestBed.createComponent(PanierComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a button to return to porducts page "continuer vos achats" ', () => {
    let button = fixture.debugElement.query(By.css('i'))
    expect(button.nativeElement.textContent).toBe('continuer vos achats');
  });

  it('should navigate to Products', () => {
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.returnToProducts();
    expect(navigateSpy).toHaveBeenCalledWith(RouterPaths.PRODUCTS);
  });

  it('should display "votre panier est vide" ', () => {
    let vide = fixture.debugElement.query(By.css('.vide'))
    expect(vide.nativeElement.textContent).toBe('Votre panier est vide');
  });

  it('should display "Total Taxes"  ', () => {
    let totalTaxes = fixture.nativeElement.querySelector('.taxes')
    expect(totalTaxes.innerHTML).toBe('Total Taxes');
  });
  it('should display "Total TTC" ', () => {
    let totalTTC = fixture.debugElement.query(By.css('.ttc'))
    expect(totalTTC.nativeElement.textContent).toBe('Total TTC');
  });
});
