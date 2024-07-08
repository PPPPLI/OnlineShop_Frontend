import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import RequestService from '../service/getRequest.service';
import { catchError, map } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,RouterLink, CommonModule, RouterLinkActive,NgOptimizedImage],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{

    doReturn:boolean=false
    doWarning:boolean= false
    warningMsg:string = ''

    constructor(private formBuilder:FormBuilder, private request:RequestService, private router:Router){}

    registerForm = this.formBuilder.group({
        userName : ['',[Validators.required,Validators.minLength(4)]],
        pwd : ['',[Validators.required,Validators.minLength(8)]],
        pwdConfirm: [''],
    })

    move(){

        this.doReturn = true
    }

    init(){
        this.doReturn = false
    }

    sendRegistration(event:Event){

        event.preventDefault();

        if(this.registerForm.status=='INVALID' ||  this.registerForm.value.pwd != this.registerForm.value.pwdConfirm){
            
            this.warningMsg = 'Please verify your input information...'
            this.doWarning = true;

        }else{

            const formValues = this.registerForm.value


            const body = {"username":this.registerForm.value.userName,
                          "password":this.registerForm.value.pwd}

            
            this.request.post_register("/back/auth/register",body)

                        .subscribe(
                            res=> {

                                formValues.pwd = ''
                                formValues.pwdConfirm = ''
                                formValues.userName = ''

                                if(res.status == 200){

                                    this.router.navigateByUrl("/login")
                                }else{
                                    
                                    this.warningMsg = 'Please try later...'
                                    this.doWarning = true;
                                }
                            }
                        )
        }


    }

    removeWarning(){this.doWarning = false}
}
