export class ProductDto {

  constructor(
    private _id: number,
    private _productName: string,
    private _price: number,
    private _quantity: number,
    private _isImported: boolean,
    private _category: string
  ) {
  }


  public get category(): string {
    return this._category;
  }

  public set category(value: string) {
    this._category = value;
  }

  public get isImported(): boolean {
    return this._isImported;
  }

  public set isImported(value: boolean) {
    this._isImported = value;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public set quantity(value: number) {
    this._quantity = value;
  }

  public get price(): number {
    return this._price;
  }

  public set price(value: number) {
    this._price = value;
  }

  public get productName(): string {
    return this._productName;
  }

  public set productName(value: string) {
    this._productName = value;
  }

  public get id(): number {
    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }

}
