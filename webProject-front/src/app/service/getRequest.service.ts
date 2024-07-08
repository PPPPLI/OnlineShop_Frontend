import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product, User } from "../model/models";


@Injectable({
    providedIn:"root"
})

export default class RequestService{

    constructor(private httpClient:HttpClient){}

    post_login(url:string, data:object,headers:HttpHeaders){

        return this.httpClient.post(url,data,{observe:'response',headers})
    }

    post_register(url:string, data:object){

        return this.httpClient.post(url,data,{observe:'response'})
    }

    get_product(url:string){

        return this.httpClient.get<Array<Product>>(url,{observe:'response'})
    }

    delete_removeProduct(url:string){

        let param = new HttpParams()
        return this.httpClient.delete(url,{observe:'response'})
    }


    post_AddProduct(url:string,data:FormData){



        return this.httpClient.post(url,data,{observe:'response'})

    }

    put_modifiyProduct(url:string,data:FormData){

        return this.httpClient.put(url,data,{observe:'response'})
    }


    patch_updateQuantity(url:string,quantity:number){

        const data = {

            'quantity':quantity
        }

        return this.httpClient.patch(url,data,{observe:'response'})
    }

    path_updateQuantityGroup(url:string,data:Product[]){

        const header = new HttpHeaders({

            'Content-Type':'application/json'
        })

        let val = data.slice(1)
        return this.httpClient.patch(url,JSON.stringify(val),{observe:'response', headers:header})
    }

    get_user(url:string){

        return this.httpClient.get<User[]>(url,{observe:'response'})
    }

    post_blockUser(url:string){

        return this.httpClient.post(url,null,{observe:'response'})
    }
}

