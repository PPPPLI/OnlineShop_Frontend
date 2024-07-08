import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export default class TokenInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let token = localStorage.getItem('jwtToken')
        const authToken = token?.substring(13,token.length-2)
        if(authToken != null){

            const authReq = req.clone({

                "headers": req.headers.set('Authorization', `Bearer ${authToken}`)
            })
    
            return next.handle(authReq)
        }

        return next.handle(req)

    }
}