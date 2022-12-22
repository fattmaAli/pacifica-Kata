import { Component,OnInit } from '@angular/core';
import { Product } from '@models/product.model';
import { Select, Store } from "@ngxs/store";
import { GetAllProducts } from '@store/products/products.actions';
import { ProductsState } from '@store/products/products.state';
import {
  combineAll,
  combineLatest,
  combineLatestAll,
  filter,
  merge,
  mergeAll,
  Observable,
  of,
  switchMap,
  tap
} from 'rxjs';
import {Router} from "@angular/router";
import {RouterPaths} from "@router/router.model";
import {PurchasedProduct} from "@models/purchased-product.model";
import {AddElementToCart, Totals} from "@store/panier/panier.actions";
import {CategoryType} from "../../shared/enumeration/category-type.enum";
import {FormControl, FormGroup} from "@angular/forms";
import {map} from "rxjs/operators";
import {PanierState} from "@store/panier/panier.sate";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Select(ProductsState.products)
  allProducts$: Observable<Product[]>;

  @Select(PanierState.purchasedElementsNumber)
  purchasedElementsNumber$: Observable<number>;
  filtredProducts$: Observable<Product[]>;
  categories$ = of(Object.entries(CategoryType).map((elem)=> elem[1]));
  readonly ALL = "All";

  categoryFilter = new FormGroup({filter :  new FormControl()});
  constructor(private store:Store, private router:Router){
  }
ngOnInit(){

  this.filtredProducts$ = merge(this.categoryFilter.controls.filter.valueChanges ,this.allProducts$ ).pipe(
    switchMap(() =>
      this.allProducts$.pipe(map(products => {
      if(this.categoryFilter.controls.filter.value && this.categoryFilter.controls.filter.value != this.ALL){
        return products.filter(value1 => value1.category === this.categoryFilter.controls.filter.value )
      }
      return products;
    })))
  )
}
  RedirectToShoppingCart(){
    this.store.dispatch(new Totals())
    this.router.navigateByUrl(RouterPaths.SHOPPINGCART)
  }

  addElementToCart($event: PurchasedProduct) {
    this.store.dispatch(new AddElementToCart($event))
  }
}
