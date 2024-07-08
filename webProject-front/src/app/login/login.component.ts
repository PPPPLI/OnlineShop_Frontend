import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Output} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import RequestService from '../service/getRequest.service';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,RouterLink, CommonModule, RouterLinkActive,NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    doReturn:boolean=false
    doWarning:boolean= false
    warningMsg:string=''

    @Output()
    emiter = new EventEmitter()

    constructor(private formBuilder:FormBuilder,private request:RequestService,
                private router:Router){}

    registerForm = this.formBuilder.group({
        userName : ['',[Validators.required,Validators.minLength(4)]],
        pwd : ['',[Validators.required,Validators.minLength(4)]],
    })


    move(){

        this.doReturn = true
    }

    init(){
        this.doReturn = false
    }

    sendRegistration(event:Event){

        event.preventDefault();

        if(this.registerForm.status=='INVALID'){
            
            this.doWarning = true;
            this.warningMsg = "Please verify your input information..."

        }else{

            const formValues = this.registerForm.value
            const body = {
                
                "username": formValues.userName,
                "password": formValues.pwd        
            }

            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Basic ${(`${formValues.userName}:${formValues.pwd}`)}`
              });
              

            this.request.post_login("/back/auth/login", body,headers)
                    .pipe(

                        tap(
                            {
                                error: (error) => {
                                    formValues.pwd=""
                                    this.warningMsg = "Login failed"
                                    this.doWarning = true
                                }
                            }
                        )
                    )
                    .subscribe(res=>{

                        if(res.status==200 && res.body != null){
                            localStorage.setItem("jwtToken",JSON.stringify(res.body));
                            localStorage.setItem("timeStamp",Date.parse(new Date().toString()).toString())

                            formValues.pwd = "";
                            formValues.userName="";
                            this.doWarning = false;
                            location.reload();

                        }
                    })

        }


    }

    removeWarning(){this.doWarning = false}
}

