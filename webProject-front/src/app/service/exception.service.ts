import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:"root"
})
export default class handleException{

    constructor(private handleError:HttpErrorResponse){}

    
}