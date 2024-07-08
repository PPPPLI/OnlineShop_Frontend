import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:"discountPricePipe",
    standalone:true
})
export default class discountPricePipe implements PipeTransform{

    transform(value: number, discount:number) {
        
        return value * (1 - discount / 100)
    }
}