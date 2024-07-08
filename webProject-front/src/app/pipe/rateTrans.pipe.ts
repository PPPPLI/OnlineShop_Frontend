import { Pipe, PipeTransform } from "@angular/core";

@Pipe({

    name:'rateTransPipe',
    standalone:true
})
export default class rateTransPipe implements PipeTransform{

    transform(value: number) {
        
        return value == -1? "All":value
    }
}