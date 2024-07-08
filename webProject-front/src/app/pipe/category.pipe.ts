import { Pipe, PipeTransform } from "@angular/core";
import { UrlTransformPipe } from "./url-transform.pipe";
import { Category } from "../model/models";

@Pipe({
    name:"categoryPipe",
    standalone:true
})
export default class categoryTransformPipe implements PipeTransform{

    transform(value: Category): string {
        
        switch(value){

            case 0: return "SHOES";
            case 1: return "CLOTHING";
            case 2: return "ACCESSORIES";
            case 3: return "EQUIPMENT";
            default: return "OTHER";
        }
    }
}