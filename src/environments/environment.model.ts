import {Type} from "@angular/core";
import {ApiUrlService} from "@providers/api/api-url.service";
import {HttpApiProvider} from "@providers/http/http-api.provider";

export interface Environment {
  production: boolean;
  apiUrlServiceClass: Type<ApiUrlService>;
  httpApiProviderClass: Type<HttpApiProvider>;

}
