import {Injectable} from "@angular/core";
import {ApiUrlService} from "@providers/api/api-url.service";

@Injectable()
export class ApiUrlProdService implements ApiUrlService {
  constructor() {
  }

  // vu qu'on n'a pas de back en ce moment
  apiBase(): string {
    return "assets/Mock/";
  }

  productApi(): string {
    return this.apiBase() + "products/products.json";
  }
}
