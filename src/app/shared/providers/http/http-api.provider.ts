import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";

export const HTTP_API_PROVIDER_IMPL: InjectionToken<HttpApiProvider> = new InjectionToken(
  "HTTP_API_PROVIDER_IMPL"
);

export interface HttpApiProvider {
  /**
   * Send a command to the backend in order to request for an action.
   * Note : It is not intended to be used for REST use cases but rather for "command" oriented http call.
   * @param url The url for the command request
   * @param dto An optional object with any relevant properties to achieve the command.
   * @param toModelFn
   */
  sendCommand<T, U, R>(
    url: string,
    dto: T,
    toModelFn: (response: U) => R
  ): Observable<R>;

  sendDownloadCommand<T, R>(
    url: string,
    commandDto: T,
    toModelFn?: (response: HttpResponse<Blob>) => R
  ): Observable<any>;

  sendCommandNoArg<R>(url: string): Observable<R>;

  create<T, U, R>(
    dto: T,
    url: string,
    toModelFn: (response: U) => R
  ): Observable<R>;

  update<U, T, R>(url: string, dto: T, toModelFn: (dto: U) => R): Observable<R>;

  get<U, R>(
    url: string,
    toModelFn: (dto: U) => R,
    options?: any
  ): Observable<R>;

  getNoArg<R>(url: string): Observable<R>;

  /**
   * Retrieves a list of <T> resources.
   * @param url The url for the get all request
   * @param toModelFn
   */
  getAll<U, R>(url: string, toModelFn: (dto: U) => R): Observable<R[]>;

  /**
   * Delete a resource at the provided url
   * @param url The url for the delete request
   */
  delete<U, R>(url: string, toModelFn: (dto: U) => R): Observable<R>;
}
