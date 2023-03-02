import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'balance'
})
export class BalancePipe implements PipeTransform {

  transform(balance): unknown {
    return balance >= 0 ? 'teal' : 'red';
  }

}
