import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import {PanierElement} from "@models/Panier-element.model";
import {AddElementToCart, RemoveElementFromCart, Totals, UpdateElementInCart} from "@store/panier/panier.actions";
import {append, patch, removeItem, updateItem} from "@ngxs/store/operators";
import {ProductsState} from "@store/products/products.state";

export interface PanierStateModel {
  purchasedElements: PanierElement[];
  totalTTC: number ;
  totalTaxes: number;
}

@State<PanierStateModel>({
  name: "Panier",
})

@Injectable()
export class PanierState {

constructor(private store:Store) {
}
  @Selector()
  static totalTTC(state: PanierStateModel): number {
    return state.totalTTC;
  }
  @Selector()
  static totalTaxes(state: PanierStateModel): number {
    return state.totalTaxes;
  }
  @Selector()
  static purchasedElementsNumber(state: PanierStateModel): number {
    return state.purchasedElements.length;
  }
 @Selector()
  static purchasedElements(state: PanierStateModel): PanierElement[] {
    return state.purchasedElements;
  }


  @Action(AddElementToCart)
  addElementToCart(
    ctx: StateContext<(PanierStateModel)>,
    action: AddElementToCart
  ): void {
    let el = ctx.getState().purchasedElements?.find(value => value.productId === action.element.productId)
    if(!el){
      let purchasedElement: PanierElement={
        quantity: action.element.quantity,
        taxes: (+(action.element.priceTtc-this.store.selectSnapshot(ProductsState.products).find(value => value.id === action.element.productId).price).toFixed(2)),
        priceHT:this.store.selectSnapshot(ProductsState.products).find(value => value.id === action.element.productId).price,
        priceTTC:action.element.priceTtc,
        productId:action.element.productId,
      }
      ctx.setState(
        patch({
          purchasedElements: append<PanierElement>([purchasedElement])
        }))
    }
    else {
      ctx.dispatch(new UpdateElementInCart(action.element));
    }
  }
  @Action(UpdateElementInCart)
  updateElementInCart(
    ctx: StateContext<PanierStateModel>,
    action: UpdateElementInCart
  ): void {
    let el = ctx.getState().purchasedElements?.find(value => value.productId === action.element.productId)

    if(el){
      let purchasedElement: PanierElement={
        quantity: action.element.quantity+el.quantity,
        taxes: (+(action.element.priceTtc-this.store.selectSnapshot(ProductsState.products).find(value => value.id === action.element.productId).price).toFixed(2)),
        priceHT:ctx.getState().purchasedElements?.find(value => value.productId === action.element.productId).priceHT,
        priceTTC:action.element.priceTtc,
        productId:action.element.productId,
      }
      ctx.setState(
        patch({
      purchasedElements:updateItem<PanierElement>(
        (elt) => elt?.productId === el.productId,
        purchasedElement
      ),
    })
    );
    }
  }

  @Action(RemoveElementFromCart)
  RemoveElementFromCart(
    ctx: StateContext<PanierStateModel>,
    action: RemoveElementFromCart
  ): void {
    let el = ctx.getState().purchasedElements.find(value => value.productId === action.productId)
    if(el){
      ctx.setState(
        patch({
          purchasedElements: removeItem<PanierElement>(element => element.productId === el.productId),
        })
      );
    }
  }
  @Action(Totals)
  totals(
    ctx: StateContext<PanierStateModel>,
    action: Totals
  ): void {
  if (ctx.getState().purchasedElements) {
    ctx.setState(
      patch({
        totalTaxes: ctx.getState().purchasedElements.reduce(
          (accumulator, currentValue) => accumulator + (currentValue.taxes * currentValue.quantity),
          0
        ),
        totalTTC: ctx.getState().purchasedElements.reduce(
          (accumulator, currentValue) => accumulator + (currentValue.priceTTC * currentValue.quantity),
          0
        ),
      })
    );
  }
  }

}
