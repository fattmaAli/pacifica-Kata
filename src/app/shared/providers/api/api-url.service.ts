import {InjectionToken} from "@angular/core";

export const API_URL_SERVICE_IMPL: InjectionToken<ApiUrlService> = new InjectionToken(
  "API_URL_SERVICE_IMPL"
);

export interface ApiUrlService {
  apiBase(): string;

  productApi(): string
}
