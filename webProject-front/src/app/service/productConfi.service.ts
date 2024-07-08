import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "../model/models";

@Injectable({
    providedIn:'root'
})
export default class ProductService{

    doConfig:boolean = false

    productConfig:Product = {
        id: 0,
        name: "",
        description: "",
        rating: 0,
        discount:100,
        price:0,
        category:undefined,
        imgUrl: "",
        quantity:0
    }

    isRecover$ = new BehaviorSubject<boolean>(this.doConfig);

    productConfRecover$ = new BehaviorSubject<Product>(this.productConfig)

    recoverModel(state:boolean){

        this.doConfig = state;
        this.isRecover$.next(this.doConfig)
    }

    changeProductConf(val:Product){

        this.productConfig = val;
        this.productConfRecover$.next(this.productConfig)
    }
}