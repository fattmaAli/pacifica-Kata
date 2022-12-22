import {Component, OnInit} from '@angular/core';
import {GetAllProducts} from "@store/products/products.actions";
import {Store} from "@ngxs/store";

@Component({
  selector: 'gestion-produit-root',
  templateUrl: './gestion-produit.component.html',
  styleUrls: ['./gestion-produit.component.css']
})
export class GestionProduitComponent implements OnInit {
  title = 'Panier';

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllProducts());

  }
}
