import {Component, Input} from '@angular/core';
import {PanierElement} from "@models/Panier-element.model";
import {RouterPaths} from "@router/router.model";

@Component({
  selector: 'app-panier-element',
  templateUrl: './panier-element.component.html',
  styleUrls: ['./panier-element.component.css']
})
export class PanierElementComponent {
@Input()panierElement: PanierElement;
}
