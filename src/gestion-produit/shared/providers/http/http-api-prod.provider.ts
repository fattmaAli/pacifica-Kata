import {HttpClient, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {map, pluck} from "rxjs/operators";
import {ResponseDto} from "../../dto/response.dto";
import {HttpApiProvider} from "./http-api.provider";

@Injectable()
export class HttpApiProdProvider implements HttpApiProvider {
  /** "data" property name in response DTO*/
  private DATA_PROPERTY: string = "data";

  constructor(private httpClient: HttpClient) {
  }

  sendCommand<T, U, R>(
    url: string,
    commandDto: T,
    toModelFn: (response: U) => R
  ): Observable<R> {
    return this.httpClient.post<ResponseDto<U>>(url, commandDto).pipe(
      pluck(this.DATA_PROPERTY),
      map((dtoList) => toModelFn(dtoList[0]))
    );
  }

  sendDownloadCommand<T, R>(
    url: string,
    commandDto: T,
    toModelFn?: (response: HttpResponse<Blob>) => R
  ): Observable<any> {
    return this.httpClient
      .post(url, commandDto, {observe: "response", responseType: "blob"})
      .pipe(map((dto) => toModelFn(dto)));
  }

  sendCommandNoArg<R>(url: string): Observable<R> {
    return this.sendCommand(url, null, null);
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

  update<U, T, R>(
    url: string,
    commandDto: T,
    toModelFn: (dto: U) => R
  ): Observable<R> {
    return this.httpClient.patch<ResponseDto<U>>(url, commandDto).pipe(
      pluck(this.DATA_PROPERTY),
      map((dtoList) => toModelFn(dtoList[0]))
    );
  }

  getAll<U, R>(url: string, toModelFn: (dto: U) => R): Observable<R[]> {
    let observable$: Observable<ResponseDto<U>> = this.httpClient.get<
      ResponseDto<U>
    >(url);
    return this.execute(observable$, toModelFn);
  }

  delete<U, R>(url: string, toModelFn: (response: U) => R): Observable<R> {
    return this.httpClient.delete<any>(url);
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
