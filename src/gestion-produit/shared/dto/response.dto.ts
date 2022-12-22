export class ResponseDto<T> {
  constructor(private _data: T[], private _status: string) {
  }

  public get getData(): T[] {
    return this._data;
  }

  public get getStatus(): string {
    return this._status;
  }

  set data(value: T[]) {
    this._data = value;
  }

  set status(value: string) {
    this._status = value;
  }
}
