import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';
import {Account, Product} from "../../model/models";
import {CommonModule, CurrencyPipe, NgTemplateOutlet} from "@angular/common";
import {UrlTransformPipe} from "../../pipe/url-transform.pipe"
import discountPipe from '../../pipe/discount.pipe';
import discountPricePipe from '../../pipe/discountPrice.pipe';
import AccountService from '../../service/account.service';
import decodeService from '../../service/decodeToken.service';
import { Router } from '@angular/router';
import CartService from '../../service/cart.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import RequestService from '../../service/getRequest.service';
import { tap } from 'rxjs';
import ProductService from '../../service/productConfi.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    NgTemplateOutlet,UrlTransformPipe,CommonModule,CurrencyPipe,discountPipe,discountPricePipe,ReactiveFormsModule
  ],
  styleUrl: './product-card.component.css',
  templateUrl: './product-card.component.html',

})
export class ProductCardComponent implements OnInit{
    constructor(private elementRef:ElementRef,private render2:Renderer2,
                private accountService:AccountService,private decodeToken:decodeService,
                private router:Router, private cartService:CartService,
                private request:RequestService, private configService:ProductService,
    ){}

    @Output()
    emitHandler = new EventEmitter();

    @Input()product!:Product;

    quantity= new FormControl()
    rate:boolean[] = []
    account!:Account

    add(){

        if(!this.account.logined){
            this.router.navigateByUrl("/login")
            return
        }

        if(this.quantity.value > 0 && this.quantity.value <= this.product.quantity){

            this.request.patch_updateQuantity("/back/products/"+this.product.id,this.quantity.value)

                    .pipe(
                        tap({

                            error : error => alert("Please try later")
                        })
                    )

                    .subscribe(res=>{

                        this.product.quantity -= this.quantity.value;
                        this.cartService.recoverModel(this.product,this.quantity.value)
                        this.quantity.setValue("")
                    })

        }else{
                alert("Please check the quantity of product")
        }

    }

    inc(){

        if(this.product.quantity > this.quantity.value!){

            this.quantity.setValue(this.quantity.value!+1);
        }
    }

    dec(){

        if(this.quantity.value > 0){

            this.quantity.setValue(this.quantity.value-1)
        }
    }

    remove(){

        if(confirm("Confirm ?")){

            this.request.delete_removeProduct("/back/products/"+this.product.id!)
            .pipe(
                tap({
                    error:(error)=>{
                        console.log(error)
                        alert("Please try later")
                    }
                })
            )
            .subscribe(res=>{

                location.reload()
            })
        }

    }

    ngOnInit(): void {

        for(let i = 0; i < this.product.rating;i++){
            this.rate.push(true)
        }

        if(this.product.discount != 100){

            this.render2.setStyle(this.elementRef.nativeElement.querySelector("#shoesPrice"),"text-decoration","line-through")
            this.render2.setStyle(this.elementRef.nativeElement.querySelector("#shoesPrice"),"color","grey")
        }

        this.account = this.accountService.getAccount()
    }

    openConfig(){

        this.configService.recoverModel(true);
        this.configService.changeProductConf(this.product)
    }
}
