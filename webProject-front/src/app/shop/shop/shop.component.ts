import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../../model/models";
import RequestService from "../../service/getRequest.service";
import {CommonModule, NgForOf} from "@angular/common";
import {ProductCardComponent} from "../product-card/product-card.component";
import { Subscription, tap } from 'rxjs';
import { FilterComponent } from '../../filter/filter.component';
import FilterService from '../../service/searchBar.service';
import { ProductConfigComponent } from '../../product-config/product-config.component';
import ProductService from '../../service/productConfi.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    NgForOf,
    ProductCardComponent,
    FilterComponent,
    ProductConfigComponent,
    CommonModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',

})
export class ShopComponent implements OnInit,OnDestroy{

  products!: Product[];
  filteredProducts!:Product[]
  searchedProducts!:Product[]
  cart!: Product[];
  filter:Map<string,any> = new Map([["category","ALL"],["discount","0"],["rate","-1"]])
  doConfig:boolean = false
  private subscription_searchBar!: Subscription
  private subscription_config!: Subscription

  constructor(private request:RequestService,

              private searchBarService:FilterService,private configService:ProductService
  ) { }

  //Add the article into the cart
  addToCart(event:number){

    this.cart.push(this.products[event-1]);
  }


  ngOnInit(): void {

    this.request.get_product('/back/products')
        .pipe(
            tap({
                error:(error)=>{
                    localStorage.clear();
                    location.reload()
                }
            })
        )
        .subscribe((res)=>{
            this.products = res.body!;
            this.filteredProducts = res.body!
            this.searchedProducts = res.body!
            this.subscription_searchBar = this.searchBarService.isRecouver$.subscribe(res=>{
        
                this.filteredProducts = this.products
                this.filteredProducts = this.filteredProducts.filter(ele => this.searchBarFilter(ele,res))
                this.searchedProducts = this.filteredProducts.filter(ele => this.searchBarFilter(ele,res))
            })
        })

    this.subscription_config = this.configService.isRecover$.subscribe(res=>{

        this.doConfig = res
    })
  }

  ngOnDestroy(): void {

      if(this.subscription_config){
        this.subscription_config.unsubscribe()
      }

      if(this.subscription_searchBar){

        this.subscription_searchBar.unsubscribe()
      }
  }




  getFilter(event:any){
    this.filteredProducts = this.searchedProducts
    this.filter.set(event.type,event.value)
    this.filteredProducts = this.filteredProducts.filter(ele => this.filterFunction(ele))
  }


  filterFunction(ele:any){

    let filterRes = true;

    if(this.filter.get("category") != 'ALL' && filterRes){
        filterRes = ele.category == this.filter.get("category")
    }

    if(this.filter.get("discount") != '0' && filterRes){
        filterRes = ele.discount == this.filter.get("discount")
    }

    if(this.filter.get("rate") != '-1' && filterRes){
        filterRes = ele.rating == this.filter.get("rate")
    }

    return filterRes;
  }

  searchBarFilter(ele:Product,word:string){

    if(word === null  && word === ""){

        return true;
    }

    return (ele.name.toLowerCase().includes(word) || ele.category!.toString().toLowerCase().includes(word))
  }

}
