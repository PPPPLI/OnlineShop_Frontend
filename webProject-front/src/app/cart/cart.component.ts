import { Component, OnDestroy, OnInit } from '@angular/core';
import CartService from '../service/cart.service';
import { Product } from '../model/models';
import { CommonModule, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { UrlTransformPipe } from '../pipe/url-transform.pipe';
import discountPricePipe from '../pipe/discountPrice.pipe';
import AccountService from '../service/account.service';
import { Subscription, tap } from 'rxjs';
import RequestService from '../service/getRequest.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,CurrencyPipe,UrlTransformPipe,TitleCasePipe,discountPricePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit,OnDestroy{

    constructor(private cartService:CartService, private request:RequestService){}

    cart!:Product[]
    private subscription!: Subscription

    ngOnInit(): void {
        
        
        this.subscription = this.cartService.isRecover$.subscribe(res =>{
            
            this.cart = new Array()

            res.forEach((product)=>{

                this.cart.push(product)
            })
        })
    }

    ngOnDestroy(): void {
        
        if(this.subscription){

            this.subscription.unsubscribe()
        }
    }


    remove(name:string,index:number){


        this.request.patch_updateQuantity("/back/products/add/"+this.cart[index].id,this.cart[index].quantity)
            .pipe(
                tap({
                    error: error => alert("Please try later")
                })
            )
            .subscribe(res=>{

                this.cartService.removeModel(name);
            })

        
    }

    removeCart(index:number){

        if(index == 0){
            
            this.request.path_updateQuantityGroup("/back/products",this.cart)
                    .pipe(
                        tap({

                            error: error=>{
                                alert("Please try later")
                                return
                            }
                        })
                    )
                    .subscribe(res=>{

                        console.log(res)
                    })
        }

        this.cartService.clearModel();
    }

}
