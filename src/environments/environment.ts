import {ApiUrlMockService} from "@providers/api/api-url-mock.service";
import {HttpApiMockProvider} from "@providers/http/http-api-mock.provider";
import {Environment} from "./environment.model";

export const environment: Environment = {
  production: false,
  apiUrlServiceClass: ApiUrlMockService,
  httpApiProviderClass: HttpApiMockProvider,
};
