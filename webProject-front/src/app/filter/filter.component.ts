import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { Category } from '../model/models';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import discountTransPipe from '../pipe/discountNumToString.pipe';
import rateTransPipe from '../pipe/rateTrans.pipe';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, TitleCasePipe,FormsModule,discountTransPipe,rateTransPipe],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit{

    @Output() eventEmitter = new EventEmitter()

    constructor(private render2:Renderer2, private elementRef:ElementRef){}

    selectedCategory:string = "-- Category --"
    selectedDiscount:string = "-- Discount --"
    selectedRate: string = "-- Rate --"

    categories:string[] = ["ALL","SHOES","CLOTHING","ACCESSORIES","EQUIPMENT"]
    discounts:number[] = [0,10,20,30,40,50,60,70,80,90,100]
    rates:number[] = [-1,5,4,3,2,1,0]
    
    filter(cat:string){

        switch(cat){

            case 'category': {

                const data = {
                    "type":cat,
                    "value":this.selectedCategory
                }

                this.eventEmitter.emit(data) 
                break
            }

            case 'discount':{



                const data = {
                    "type":cat,
                    "value":this.selectedDiscount
                }

                this.eventEmitter.emit(data) 
                break
            }

            case 'rate':{

                const data = {
                    "type":cat,
                    "value":this.selectedRate
                }

                this.eventEmitter.emit(data) 
                break
            }

        }
    }
    
    ngOnInit(): void {

    }
}
