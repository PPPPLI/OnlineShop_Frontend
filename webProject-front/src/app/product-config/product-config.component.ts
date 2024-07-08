import {Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import ProductService from '../service/productConfi.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Category, Product } from '../model/models';
import categoryTransformPipe from '../pipe/category.pipe';
import RequestService from '../service/getRequest.service';
import { Subscription, tap } from 'rxjs';
import formValidationService from '../service/formValidation.service';

@Component({
  selector: 'app-product-config',
  standalone: true,
  imports: [CommonModule,TitleCasePipe,FormsModule,ReactiveFormsModule,categoryTransformPipe],
  templateUrl: './product-config.component.html',
  styleUrl: './product-config.component.css'
})
export class ProductConfigComponent implements OnInit,OnDestroy{

    element?:HTMLInputElement

    picture?:File

    product:Product

    warning:boolean = true

    warningMsg:string = ""
    private subscription!: Subscription

    constructor(private configService:ProductService,private request:RequestService,private elementRef:ElementRef,
                private validatorService:formValidationService){

        this.product = {
            name: "",
            description: "",
            rating: 0,
            discount:100,
            price:0,
            category:undefined,
            quantity:0
        }
    }


    categories:Category[] = [Category.SHOES,Category.CLOTHING,Category.ACCESSORIES,Category.EQUIPMENT]
    closeConfig(){

        this.configService.recoverModel(false)
        this.product.name = ""
        this.product.price=0
        this.product.category=undefined
        this.product.quantity=0
        this.picture = undefined
        this.product.discount = 100
        this.warning = false;
        this.warningMsg = ""
    }

    updateVal(){

        this.picture = this.element!.files![0];
    }

    closeWarning(){

        this.warning = false
    }


    sendData(){

      const url = "/back/products"
      let data = new FormData()
      data.append("img",this.picture!);
      data.append("product", new Blob([JSON.stringify(this.product)],{type:'application/json'}));



        if(this.product.id === 0){

            if(!this.validatorService.verify(this.product,this.picture!)){

                this.warning = true;
                this.warningMsg = "Please check your input"
                return
            }

            this.request.post_AddProduct(url,data)

                .pipe(
                    tap({
                        error: error => {

                            this.warning = true;
                            this.warningMsg = "Please try later"
                        }
                    })
                )
                .subscribe(res=>{

                    this.showresponse();
            })

        }else{

            this.request.put_modifiyProduct(url,data)

                .pipe(
                    tap({
                        error: error => {

                            this.warning = true;
                            this.warningMsg = "Please try later"
                        }
                    })
                )
                .subscribe(res=>{

                    this.showresponse();
            })
        }


    }

    ngOnInit(): void {

        this.element = this.elementRef.nativeElement.querySelector("#fileInput")

        {
            this.subscription = this.configService.productConfRecover$.subscribe(res=>{

                this.product.id = res.id
                this.product.category = res.category != undefined? res.category:undefined
                this.product.name = res.name;
                this.product.price = res.price;
                this.product.quantity = res.quantity;
                this.product.discount = res.discount;
                this.product.rating = res.rating;
            })
        }
    }

    ngOnDestroy(): void {

        if(this.subscription){

            this.subscription.unsubscribe();
        }

    }

    showresponse(){

        this.product.name = ""
        this.product.price=0
        this.product.category=undefined
        this.product.quantity=0
        this.picture = undefined
        this.product.discount = 100
        location.reload()
    }



}
