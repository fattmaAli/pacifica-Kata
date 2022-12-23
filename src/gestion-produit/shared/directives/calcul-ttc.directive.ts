import {CurrencyPipe} from '@angular/common';
import {Directive, ElementRef, Input, OnChanges, SimpleChanges, ViewContainerRef} from '@angular/core';
import {RoundTaxAmountPipe} from "../pipes/round-tax-amount.pipe";
import {Product} from "@models/product.model";

@Directive({
  selector: '[appCalculTtc]',
  providers: [RoundTaxAmountPipe, CurrencyPipe]
})
export class CalculTtcDirective implements OnChanges {
  @Input() appCalculTtc!: { price: number, tax: number }

  constructor(private elementRef: ElementRef, private roundTaxPipe: RoundTaxAmountPipe) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.elementRef.nativeElement.textContent =
      +(this.appCalculTtc.price + this.roundTaxPipe
        .transform(this.appCalculTtc.price * this.appCalculTtc.tax
          / 100)).toFixed(2)

  }

}
