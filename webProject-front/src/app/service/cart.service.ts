import { Injectable } from "@angular/core";
import { Account, Category, Product } from "../model/models";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:"root"
})
export default class CartService{
    
    products:Map<string,Product> = new Map();
    totalCount:Product = {

        id: 0,
        name: "number",
        description: "",
        rating: 0,
        discount:0,
        price:0,
        category:Category.SHOES,
        imgUrl: "",
        quantity:0

    };

    constructor(){

        this.products.set("number", this.totalCount)
    }

    isRecover$ = new BehaviorSubject<Map<string,Product>>(this.products);

    recoverModel(val:Product,num:any){


        if(this.products.has(val.name)){

            this.products.get(val.name)!.quantity += parseInt(num);
            this.totalCount.rating += this.products.get(val.name)!.price * parseInt(num) * (1 - this.products.get(val.name)!.discount/100)
            this.totalCount.quantity += parseInt(num);
            
        }else{

            const product:Product = {
                id: val.id,
                name: val.name,
                description: val.description,
                discount:val.discount,
                rating: val.rating,
                price:val.price,
                category: val.category,
                imgUrl: val.imgUrl,
                quantity:0
            };
            
            this.products.set(product.name,product);
            this.products.get(product.name)!.quantity = parseInt(num);
            this.totalCount.price += this.products.get(product.name)!.price * (1 - this.products.get(val.name)!.discount/100)
            this.totalCount.rating += this.products.get(product.name)!.price * parseInt(num) * (1 - this.products.get(val.name)!.discount/100)
            this.totalCount.quantity += parseInt(num);

        }
        this.isRecover$.next(this.products);
    }


    removeModel(name:string){
        let product = this.products.get("number")
        product!.quantity -= this.products.get(name)!.quantity
        product!.price -= this.products.get(name)!.price * (1 - this.products.get(name)!.discount/100)
        product!.rating -= this.products.get(name)!.price * (1 - this.products.get(name)!.discount/100) * this.products.get(name)!.quantity

        this.products.delete(name)
        
        this.isRecover$.next(this.products)
    }

    clearModel(){

        this.products.clear()
        let newCount:Product = {

            id: 0,
            name: "number",
            description: "",
            rating: 0,
            discount:0,
            price:0,
            category:Category.SHOES,
            imgUrl: "",
            quantity:0
    
        };

        this.totalCount = newCount;

        this.products.set("number", this.totalCount)
        this.isRecover$.next(this.products)
    }

}