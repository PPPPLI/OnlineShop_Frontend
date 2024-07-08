import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'discountPipe',
    standalone:true
})
export default class discountPipe implements PipeTransform{

    transform(value: any) {
        
        if(value != 0){

            return (value) + '% Off'
        }

        return '';
        
    }
}