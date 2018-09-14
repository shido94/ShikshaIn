import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'p2I'
})
export class P2IPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const image = value.split('.');
    let convert = '';
    for (let i = 0; i < image.length - 1; i++) {
      convert = convert + image[i] + '.';
    }
    const convertedImg = convert + 'png';
    return convertedImg;
  }

}
