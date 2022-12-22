import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {map, pluck, tap} from "rxjs/operators";
import {HttpApiProvider} from "./http-api.provider";
import {ResponseDto} from "../../dto/response.dto";

@Injectable()
export class HttpApiMockProvider implements HttpApiProvider {
  /** "data" property name in response DTO*/
  private DATA_PROPERTY: string = "data";

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Send a command to the backend in order to request for an action.
   * Note : It is not intended to be used for REST use cases but rather for "command" oriented http call.
   * @param url The url for the command request
   * @param commandDto An optional object with any relevant properties to achieve the command.
   * @param toModelFn
   */
  sendCommand<T, U, R>(
    url: string,
    commandDto: T,
    toModelFn: (response: U) => R
  ): Observable<R> {
    return this.get(url, toModelFn);
  }

  sendDownloadCommand<T, R>(
    url: string,
    commandDto: T,
    toModelFn?: (response: HttpResponse<Blob>) => R
  ): Observable<any> {
    return this.httpClient.get(url);
  }

  sendCommandNoArg<R>(url: string): Observable<R> {
    return this.sendCommand(url, null, null);
  }

  update<U, T, R>(
    url: string,
    commandDto: T,
    toModelFn: (dto: U) => R
  ): Observable<R> {
    return this.get(url, toModelFn);
  }

  create<T, U, R>(
    dto: T,
    url: string,
    toModelFn: (response: U) => R
  ): Observable<R> {
    let observable$: Observable<ResponseDto<U>> = this.httpClient.post<
      ResponseDto<U>
    >(url, dto);
    return this.execute(observable$, toModelFn)[0];
  }

  getNoArg<R>(url: string): Observable<R> {
    return this.httpClient.get<R>(url);
  }

  get<U, R>(
    url: string,
    toModelFn: (dto: U) => R,
    options?: any
  ): Observable<R> {
    return this.httpClient.get<ResponseDto<U>>(url, options).pipe(
      pluck(this.DATA_PROPERTY),
      map((dtoList) => toModelFn(dtoList[0]))
    );
  }

  /**
   * Retrieves a list of <T> resources.
   * @param url The url for the get all request
   * @param toModelFn
   */
  getAll<U, R>(url: string, toModelFn: (dto: U) => R): Observable<R[]> {
    let observable$: Observable<ResponseDto<U>> = this.httpClient.get<
      ResponseDto<U>
    >(url);
    return this.execute(observable$, toModelFn);
  }

  /**
   * Delete a resource at the provided url
   * @param url The url for the delete request
   */
  delete<U, R>(url: string, toModelFn: (response: U) => R): Observable<R> {
    return this.get(url, toModelFn);
  }

  /**
   * Execute the Http request by subscribing to the Observable in argument
   * @param observable$ The Observable to subscribe on
   * @param toModelFn The mapper function to be applied on the ResponseDto
   */
  private execute<U, R>(
    observable$: Observable<ResponseDto<U>>,
    toModelFn: (dto: U) => R
  ): Observable<R[]> {
    if (!observable$) {
      throw new Error("Unable to process the response");
    }

    let models: R[] = [];

    return new Observable((observable) => {
      observable$.subscribe({
        next: (responseDto) => {
          models = responseDto.data.map((dto) => toModelFn(dto));
          return observable.next(models);
        },
        error: (err) => throwError(err),
      });
    });
  }
}
