import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn:'root'
})
export default class decodeService{

    constructor(private jwtHelp:JwtHelperService){}

    //Decode the jwt token
    decode(token:string){

        return this.jwtHelp.decodeToken(token);
    }


    //Verify the expiration time
    verifyValidite(token:any):boolean{

        const timeStamp = parseInt(localStorage.getItem("timeStamp")!)
        
        return (Date.parse(new Date().toString()) - timeStamp <= token.exp)

        
    }
}