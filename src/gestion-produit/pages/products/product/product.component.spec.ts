import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductComponent} from './product.component';
import {By} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {NgxsModule} from "@ngxs/store";
import {ProductsState} from "@store/products/products.state";
import {PanierState} from "@store/panier/panier.sate";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GestionProduitRoutingModule} from "../../../gestion-produit-routing.module";
import {API_URL_SERVICE_IMPL} from "@providers/api/api-url.service";
import {environment} from "@environments/environment";
import {HTTP_API_PROVIDER_IMPL} from "@providers/http/http-api.provider";
import {ProductRoutingModule} from "@pages/products/product-routing.module";
import {CalculTtcDirective} from "../../../shared/directives/calcul-ttc.directive";
import {RoundTaxAmountPipe} from "../../../shared/pipes/round-tax-amount.pipe";

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxsModule.forRoot([
          ProductsState,
          PanierState
        ]),
        FormsModule,
        GestionProduitRoutingModule
      ],
      declarations: [ProductComponent, CalculTtcDirective, RoundTaxAmountPipe],
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
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a button "Ajouter" to add product to cart', () => {
    let ajouter = fixture.debugElement.query(By.css('.addbtn'))
    expect(ajouter.nativeElement.textContent).toBe('Ajouter');
  });

  it('should display price" ', () => {
    let prix = fixture.debugElement.query(By.css('.prix'))
    expect(prix.nativeElement.textContent).toBe('Prix:');
  });

  it('should display category" ', () => {
    let category = fixture.debugElement.query(By.css('.categorie'))
    expect(category.nativeElement.textContent).toBe('Categorie:');
  });
});
