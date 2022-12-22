import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '@models/product.model';
import {PanierElement} from "@models/Panier-element.model";
import {PurchasedProduct} from "@models/purchased-product.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OperationType} from "../../../shared/enumeration/operation-type.enum";
import {ProductsService} from "@services/Products/products.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() public productElement: Product;
  @Output() addElement = new EventEmitter<PurchasedProduct>();
  operationType = OperationType;
  form = new FormGroup({
    quantity: new FormControl()
  })

 getDataSelector : Record<OperationType, () => void> = {
    "ADD" : ()=>this.form.controls.quantity.setValue(this.form.controls.quantity.value + 1),
    "REMOVE" :()=>this.form.controls.quantity.setValue(this.form.controls.quantity.value - 1)
 }
  updateQuantity = (operation: OperationType):void =>this.getDataSelector[operation]()
 
  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.form.controls.quantity.setValue(1)
    this.form.setValidators([Validators.min(1), Validators.max(this.productElement.quantity)])
  }

  getProductTaxRate() {
    return this.productsService.getProductTaxRate(this.productElement);
  }

  addToCart(priceTTC) {
    if (this.form.valid) {
      this.addElement.emit({
        productId: this.productElement.id,
        quantity: this.form.controls.quantity.value,
        priceTtc: parseFloat(priceTTC.innerHTML)
      })
    }
  }
 
}
