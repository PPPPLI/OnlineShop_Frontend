import { Injectable } from "@angular/core";
import { Product } from "../model/models";

@Injectable({
    providedIn:'root'
})
export default class formValidationService{

    verify(val:Product, pic:File){

        if(val.category != undefined && pic != undefined && val.name != '' && val.price != 0 && val.quantity != 0){

            return true
        }

        return false
    }
}