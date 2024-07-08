import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component,ElementRef,OnDestroy,OnInit, Renderer2} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Account, Product } from '../model/models';
import AccountService from '../service/account.service';
import CartService from '../service/cart.service';
import FilterService from '../service/searchBar.service';
import ProductService from '../service/productConfi.service';

@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink, CommonModule,NgOptimizedImage],
  templateUrl: './navigator.component.html',
  styleUrl: './navigator.component.css'
})

export class NavigatorComponent implements OnInit, OnDestroy{

    title = 'webProject-front';
    doSearch:boolean = false;
    openAccount:boolean = false
    account!: Account
    articleNum:number = 0;
    

    constructor(
                private accountService:AccountService,
                private cartService:CartService,
                private filterSerivce:FilterService,
                private configService:ProductService,
                private render2:Renderer2,
                private elementRef:ElementRef
            ){}
  
    ngOnInit(): void {
        
        this.account = this.accountService.getAccount()
        this.cartService.isRecover$.subscribe(res=>{
        
            this.articleNum = res.get("number")?.quantity!;


            if(this.cartService.totalCount.quantity != 0){

                this.account.isEmpty = false;
            }else{

                this.account.isEmpty = true
            }
        })

        this.render2.setStyle(this.elementRef.nativeElement.querySelector("#scrollBox"),"visibility","hidden")

        if(this.account.isManager){
            this.render2.setStyle(this.elementRef.nativeElement.querySelector("#scrollBox"),"margin-right","20px")
        }
    }

    ngOnDestroy(): void {
        this.cartService.isRecover$.unsubscribe();
    }


    searchBar = new FormControl('')
  
    //search articles
    getSearch(){
  
        if(!this.doSearch){this.doSearch = true;
  
        }else{
  
            this.filterSerivce.recoverModel(this.searchBar.value!)
        }
        
    }
  
    getAccount(){

        this.openAccount = !this.openAccount

        if(this.openAccount){

            this.render2.setStyle(this.elementRef.nativeElement.querySelector("#scrollBox"),"visibility","visible")

        }else{

            this.render2.setStyle(this.elementRef.nativeElement.querySelector("#scrollBox"),"visibility","hidden")

        }
    }

    removeData(){
        localStorage.clear();
        location.reload();
    }

    openConfig(){

        this.configService.recoverModel(true)
    }

}

