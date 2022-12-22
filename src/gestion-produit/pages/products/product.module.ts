import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {ProductsComponent} from './products.component';
import {ProductComponent} from './product/product.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CalculTtcDirective} from "../../shared/directives/calcul-ttc.directive";
import {RoundTaxAmountPipe} from "../../shared/pipes/round-tax-amount.pipe";


@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    CalculTtcDirective,
    RoundTaxAmountPipe
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    CalculTtcDirective,
    RoundTaxAmountPipe
  ],
  providers: [RoundTaxAmountPipe]
})
export class ProductModule {
}
