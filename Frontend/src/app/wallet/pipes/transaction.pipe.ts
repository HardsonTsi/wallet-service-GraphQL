import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transaction'
})
export class TransactionPipe implements PipeTransform {

  transform(type): string {
    return type == 'CREDIT' ? 'green' : 'red'
  }

}
