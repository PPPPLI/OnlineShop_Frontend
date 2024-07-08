import { Injectable } from "@angular/core";
import { Account } from "../model/models";
import decodeService from "./decodeToken.service";

@Injectable({
    providedIn:"root"
})
export default class AccountService{

    constructor(private decodeService:decodeService){}
    account!:Account

    getAccount(){

        const token = localStorage.getItem("jwtToken")
        

        if(token != null){

            const tokenInfo = this.decodeService.decode(token);
            if(this.decodeService.verifyValidite(tokenInfo)){

                this.account = {
                    nickName: tokenInfo.sub,
                    logined: true,
                    isManager: tokenInfo.scope[0] == 'ROLE_ADMIN',
                    isEmpty: true
                }
            }

        }else{
            this.account =  {
                nickName:"",
                logined:false,
                isManager: false,
                isEmpty:true,
            };
        }

        return this.account;
    }

}