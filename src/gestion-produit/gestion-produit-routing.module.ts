import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouterPaths} from './shared/router/router.model';

const routes: Routes = [
  {
    path: "",
    redirectTo: RouterPaths.PRODUCTS,
    pathMatch: 'full'
  },
  {
    path: RouterPaths.SHOPPINGCART,
    loadChildren: () => import('@pages/panier/panier.module').then(m => m.PanierModule)
  },
  {
    path: RouterPaths.PRODUCTS,
    loadChildren: () => import('@pages/products/product.module').then(m => m.ProductModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GestionProduitRoutingModule {
}
