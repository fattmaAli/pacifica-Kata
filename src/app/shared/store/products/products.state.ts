import { Injectable } from "@angular/core";
import { Product } from "@models/product.model";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { GetAllProducts } from "./products.actions";
import { Observable } from "rxjs";
import { ProductsService } from "@services/Products/products.service";

export interface ProductsStateModel {
   products: Product[];
   
  }
  
@State<ProductsStateModel>({
   name: "Products",
 })

 @Injectable()
 export class ProductsState {
  
 
   @Selector()
   static products(state: ProductsStateModel): Product[] {
     return state.products;
   }
 
   constructor(readonly productsService: ProductsService, public store: Store) {}
 

   @Action(GetAllProducts)
   getAllProducts(
     ctx: StateContext<ProductsStateModel>,
     action: GetAllProducts
   ): Observable<Product[]> {
     return this.productsService.getAllProducts().pipe(
       tap((res) => {
         ctx.patchState({
           products: res,
         });
         
       })
     );
   }
 }
 