import { Injectable } from "@angular/core";
import { Product } from "@models/product.model";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { ProductsService } from "@services/Products/products.service";
import {PanierElement} from "@models/Panier-element.model";
import {AddElementToCart} from "@store/panier/panier.actions";

export interface PanierStateModel {
  purchasedElements: PanierElement[];

}

@State<PanierStateModel>({
  name: "Panier",
})

@Injectable()
export class PanierState {


  @Selector()
  static panier(state: PanierStateModel): PanierElement[] {
    return state.purchasedElements;
  }



  @Action(AddElementToCart)
  addElementToCart(
    ctx: StateContext<PanierStateModel>,
    action: AddElementToCart
  ): void {
    let el = ctx.getState().purchasedElements.find(value => value.productId === action.element.productId)
    if(!el){
    }
  }
}
