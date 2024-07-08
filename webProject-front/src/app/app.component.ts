import { Component } from '@angular/core';
import { RouterLinkActive, RouterOutlet} from '@angular/router';
import { CommonModule} from '@angular/common';
import {NavigatorComponent} from './navigator/navigator.component'
import {RegisterComponent} from './register/register.component'
import {ShopComponent} from "./shop/shop/shop.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterLinkActive,
    NavigatorComponent,
    RegisterComponent,
    RouterOutlet,
    ShopComponent],
  template: `
    <app-navigator></app-navigator>
    <router-outlet></router-outlet>
 `,
  styles: ``
})
export class AppComponent {
    

}
