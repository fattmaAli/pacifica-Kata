import {PurchasedProduct} from "@models/purchased-product.model";

export class AddElementToCart{
  static readonly type = "[Panier] AddElementToCart";
  constructor(public element: PurchasedProduct) {
  }
}
