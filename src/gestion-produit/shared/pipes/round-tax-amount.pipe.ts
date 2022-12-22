import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'roundTaxAmount'
})
export class RoundTaxAmountPipe implements PipeTransform {

  transform(value: number): number {
    return +(Math.ceil(value * 20) / 20).toFixed(2);
  }

}
