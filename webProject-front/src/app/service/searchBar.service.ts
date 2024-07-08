import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export default class FilterService{

    keyWord:string = ""

    isRecouver$ = new BehaviorSubject<string>(this.keyWord)

    recoverModel(val:string){
        
        this.keyWord = val;
        console.log(this.keyWord)
        this.isRecouver$.next(this.keyWord)
    }
}