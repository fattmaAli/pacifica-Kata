import {CurrencyPipe} from '@angular/common';
import {Directive, ElementRef, Input, OnChanges, SimpleChanges, ViewContainerRef} from '@angular/core';
import {RoundTaxAmountPipe} from "../pipes/round-tax-amount.pipe";
import {Product} from "@models/product.model";

@Directive({
  selector: '[appCalculTtc]',
  providers: [RoundTaxAmountPipe, CurrencyPipe]
})
export class CalculTtcDirective implements OnChanges {
  @Input() appCalculTtc!: { product: Product, tax: number, quantity: number }

  constructor(private elementRef: ElementRef, private roundTaxPipe: RoundTaxAmountPipe) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.elementRef.nativeElement.textContent =
      +(this.appCalculTtc.product.price + this.roundTaxPipe
        .transform(this.appCalculTtc.product.price * this.appCalculTtc.tax
          / 100)).toFixed(2)

  }

}
