import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PanierElement} from "@models/Panier-element.model";
import {Select, Store} from "@ngxs/store";
import {RemoveElementFromCart, Totals} from "@store/panier/panier.actions";
import {Observable, Subject, takeUntil, tap} from "rxjs";
import {ProductsState} from "@store/products/products.state";
import {Product} from "@models/product.model";

@Component({
  selector: 'app-panier-element',
  templateUrl: './panier-element.component.html',
  styleUrls: ['./panier-element.component.css']
})
export class PanierElementComponent implements OnInit, OnDestroy {
  @Input() panierElement: PanierElement;
  destroyer$ = new Subject();

  @Select(ProductsState.products)
  allProducts$: Observable<Product[]>;

  panierElementProduct: Product = undefined;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.allProducts$.pipe(takeUntil(this.destroyer$), tap((list: Product[]) => {
      this.panierElementProduct = list.find((value: Product) => value.id === this.panierElement.productId)

    })).subscribe();
  }

  ngOnDestroy() {
    this.destroyer$.next("");
    this.destroyer$.complete();
  }

  RemoveElementFromCart() {
    this.store.dispatch(new RemoveElementFromCart(this.panierElement.productId))
    this.store.dispatch(new Totals())

  }
}
