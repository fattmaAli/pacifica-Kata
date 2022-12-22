import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PanierRoutingModule} from './panier-routing.module';
import {PanierComponent} from './panier.component';
import {PanierElementComponent} from './panier-element/panier-element.component';


@NgModule({
  declarations: [
    PanierComponent,
    PanierElementComponent
  ],
  imports: [
    CommonModule,
    PanierRoutingModule
  ]
})
export class PanierModule {
}
