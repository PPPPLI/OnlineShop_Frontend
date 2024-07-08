import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:"discountTrans",
    standalone:true
})
export default class discountTransPipe implements PipeTransform{

    transform(value:number) {
        
        switch(value){

            case 0: return "All";
            case 100: return "Full price"
            default: return value+"%"
        }
    }
}