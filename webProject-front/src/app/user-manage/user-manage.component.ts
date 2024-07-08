import { Component, OnInit } from '@angular/core';
import { User } from '../model/models';
import RequestService from '../service/getRequest.service';
import { tap } from 'rxjs';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-user-manage',
  standalone: true,
  imports: [CommonModule,TitleCasePipe],
  templateUrl: './user-manage.component.html',
  styleUrl: './user-manage.component.css'
})
export class UserManageComponent implements OnInit{

    user?:User[]

    constructor(private request:RequestService){}

    ngOnInit(): void {

        this.refreshData()
    }

    block(username: String){

        this.request.post_blockUser("/back/users/block/"+ username)
            .pipe(
                tap({
                    error: error => {alert("Please try later")}
                })
            )
            .subscribe(res=>{

                this.refreshData()
            })
    }

    unblock(username: String){

        this.request.post_blockUser("/back/users/unblock/"+ username)
        .pipe(
            tap({
                error: error => {alert("Please try later")}
            })
        )
        .subscribe(()=>{

            this.refreshData()
        })
    }

    refreshData(){

        this.request.get_user("/back/users")
            .pipe(
                tap({

                    error: error => { }
                })
            )
            .subscribe(res=>{

                console.log(res.body)
                this.user = res.body!
            })
    }
}
