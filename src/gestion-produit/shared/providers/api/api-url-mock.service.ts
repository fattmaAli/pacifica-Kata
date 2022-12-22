import {ApiUrlService} from "@providers/api/api-url.service";

export class ApiUrlMockService implements ApiUrlService {

  apiBase(): string {
    return "assets/Mock/";
  }

  productApi(): string {
    return this.apiBase() + "products/products.json";
  }


}
