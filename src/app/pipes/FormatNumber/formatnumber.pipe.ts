import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class FormatnumberPipe implements PipeTransform {

  transform(value: any, pattern: any, replacement: any): any {
    return value.toString().replace(new RegExp(pattern,'g'), replacement);
  }

}
