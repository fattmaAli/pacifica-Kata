import {ApiUrlProdService} from "@providers/api/api-url-prod.service";
import {HttpApiProdProvider} from "@providers/http/http-api-prod.provider";
import {Environment} from "./environment.model";

export const environment: Environment = {
  production: true,
  apiUrlServiceClass: ApiUrlProdService,
  httpApiProviderClass: HttpApiProdProvider,
};
