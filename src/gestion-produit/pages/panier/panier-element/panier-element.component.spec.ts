import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PanierElementComponent} from './panier-element.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {NgxsModule, Store} from "@ngxs/store";
import {ProductsState} from "@store/products/products.state";
import {PanierState} from "@store/panier/panier.sate";
import {PanierComponent} from "@pages/panier/panier.component";
import {API_URL_SERVICE_IMPL} from "@providers/api/api-url.service";
import {environment} from "@environments/environment";
import {HTTP_API_PROVIDER_IMPL} from "@providers/http/http-api.provider";
import {By} from "@angular/platform-browser";

describe('PanierElementComponent', () => {
  let component: PanierElementComponent;
  let fixture: ComponentFixture<PanierElementComponent>;

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

      ], teardown: {destroyAfterEach: false}
    }).compileComponents();
    fixture = TestBed.createComponent(PanierElementComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Qte: " ', () => {
    let quantity = fixture.debugElement.query(By.css('.qte'))
    expect(quantity).toBeTruthy();
  });
  it('should display "Taxes:"  ', () => {
    let Taxes = fixture.debugElement.query(By.css('.ptax'))
    expect(Taxes.nativeElement.textContent).toBe('Taxes: ');
  });
  it('should display "Prix unitaire HT " ', () => {
    let prixHt = fixture.debugElement.query(By.css('.puht'))
    expect(prixHt.nativeElement.textContent).toBe('Prix unitaire HT ');
  });
  it('should display "Prix unitaire TTC " ', () => {
    let prixTtc = fixture.debugElement.query(By.css('.puttc'))
    expect(prixTtc.nativeElement.textContent).toBe('Prix unitaire TTC ');
  });
});

