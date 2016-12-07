import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullable'
})
export class NullablePipe implements PipeTransform {

  transform(value: any, args?: any): any {
      if(value !== null && value !== '') {
          return value;
      }
      return '<i>aucun</i>';
  }

}
