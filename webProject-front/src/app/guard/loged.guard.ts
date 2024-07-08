import { CanActivateFn, Router } from '@angular/router';
import DecodeService from '../service/decodeToken.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
    providedIn:'root'
})
class permissionService{

    constructor(private decodeService:DecodeService,private router:Router){}
    canActivateLoged(){

        const token = localStorage.getItem("jwtToken");
        if(token != null){
            
            const tokenInfo = this.decodeService.decode(token);
            if(this.decodeService.verifyValidite(tokenInfo)){
                return true
            }
        }
        this.router.navigateByUrl("/")
        return false
    }

    canActivateUnLoged(){

        const token = localStorage.getItem("jwtToken");
        if(token != null){
            const tokenInfo = this.decodeService.decode(token);

            if(this.decodeService.verifyValidite(tokenInfo)){
                this.router.navigateByUrl("/")
                return false
            }
        }
        return true
    }
}





export const logedGuard: CanActivateFn = (route, state) => {
  
    return inject(permissionService).canActivateLoged()
    
};


export const unLogedGuard: CanActivateFn = (route, state) => {

    return inject(permissionService).canActivateUnLoged()
};