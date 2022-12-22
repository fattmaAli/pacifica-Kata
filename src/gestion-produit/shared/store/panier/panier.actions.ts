import {PurchasedProduct} from "@models/purchased-product.model";

export class AddElementToCart {
  static readonly type = "[Panier] AddElementToCart";

  constructor(public element: PurchasedProduct) {
  }
}

export class UpdateElementInCart {
  static readonly type = "[Panier] UpdateElementInCart";

  constructor(public element: PurchasedProduct) {
  }
}

export class RemoveElementFromCart {
  static readonly type = "[Panier] RemoveElementFromCart";

  constructor(public productId: number) {
  }
}

export class Totals {
  static readonly type = "[Panier] Totals";

  constructor() {
  }
}
