import {Component, OnInit} from '@angular/core';
import {RouterPaths} from "@router/router.model";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {PanierElement} from "@models/Panier-element.model";
import {PanierState} from "@store/panier/panier.sate";
@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  routerPaths:RouterPaths
  @Select(PanierState.purchasedElements)
  purchasedElements$: Observable<PanierElement[]>;
  @Select(PanierState.purchasedElementsNumber)
  purchasedElementsNumber$: Observable<number>;
  @Select(PanierState.totalTaxes)
  totalTaxes$: Observable<number>;
  @Select(PanierState.totalTTC)
  totalTTC$: Observable<number>;

constructor() {

}

}
