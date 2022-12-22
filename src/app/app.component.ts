import {Component, OnInit} from '@angular/core';
import {GetAllProducts} from "@store/products/products.actions";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Panier';

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllProducts());

  }
}
