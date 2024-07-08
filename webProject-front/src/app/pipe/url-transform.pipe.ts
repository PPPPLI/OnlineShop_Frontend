import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Pipe({
  name: 'urlTransform',
  standalone: true
})
export class UrlTransformPipe implements PipeTransform {

    constructor(private activeRoute:ActivatedRoute){}

  transform(value: string): string {

    return location.protocol +"//localhost:80/resources/images/" +value;
  }

}
