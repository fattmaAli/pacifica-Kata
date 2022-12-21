import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Product } from '@models/product.model';
import { Observable } from 'rxjs';
import { HttpApiProvider, HTTP_API_PROVIDER_IMPL } from '@providers/http/http-api.provider';
import {
  API_URL_SERVICE_IMPL,
  ApiUrlService,
} from "@providers/api/api-url.service";
import { ProductMapper } from '../../mapper/product.mapper';
import {CategoryType} from "../../enumeration/category-type.enum";
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private productMapper: ProductMapper,
    @Inject(HTTP_API_PROVIDER_IMPL) private httpApiProvider: HttpApiProvider,
    @Inject(API_URL_SERVICE_IMPL) private apiUrlService: ApiUrlService
  ) {}
  getAllProducts(): Observable<Product[]> {
    const mapperFn = this.productMapper.dtoToModel.bind(this);
    this.httpApiProvider
      .getAll(this.apiUrlService.productApi(), mapperFn)
      .subscribe((res) => {});
    return this.httpApiProvider.getAll(
      this.apiUrlService.productApi(),
      mapperFn
    );
  }
  getProductTaxRate(product: Product){
    let rate = 0;
    switch (product.category){
      case CategoryType.FOOD : {
        rate = 0;
        break;
      }
      case CategoryType.MEDECINE: {
        rate = 0;
        break;
      }
      case CategoryType.BOOKS: {
        rate = 10;
        break;
      }
      default:
        rate = 20;
        break;
    }
    if(product.isImported) rate+=5;
    return rate;
  }
}
