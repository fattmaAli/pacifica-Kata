import {Inject} from '@angular/core';
import {Injectable} from '@angular/core';
import {Product} from '@models/product.model';
import {Observable} from 'rxjs';
import {HttpApiProvider, HTTP_API_PROVIDER_IMPL} from '@providers/http/http-api.provider';
import {
  API_URL_SERVICE_IMPL,
  ApiUrlService,
} from "@providers/api/api-url.service";
import {ProductMapper} from '../../mapper/product.mapper';
import {CategoryType} from "../../enumeration/category-type.enum";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
    
  getDataSelector : Record< CategoryType, number> = {
    "Food" : 0,
    "Medecine" :0,
    "Books" :10,
    "Parfum" :20,
    "Electric" :20
}
getProductTaxRate = (product: Product):number => {
    let rate=this.getDataSelector[product.category]
    if (product.isImported) rate += 5;
    return rate
 }

  constructor(
    private productMapper: ProductMapper,
    @Inject(HTTP_API_PROVIDER_IMPL) private httpApiProvider: HttpApiProvider,
    @Inject(API_URL_SERVICE_IMPL) private apiUrlService: ApiUrlService
  ) {
  }

  getAllProducts(): Observable<Product[]> {
    const mapperFn = this.productMapper.dtoToModel.bind(this);
    this.httpApiProvider
      .getAll(this.apiUrlService.productApi(), mapperFn)
      .subscribe((res) => {
      });
    return this.httpApiProvider.getAll(
      this.apiUrlService.productApi(),
      mapperFn
    );
  }

}
