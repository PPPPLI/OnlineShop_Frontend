import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './shop/shop/shop.component';
import { logedGuard, unLogedGuard } from './guard/loged.guard';
import { CartComponent } from './cart/cart.component';
import { UserManageComponent } from './user-manage/user-manage.component';

export const routes: Routes = [
    {path: 'register', component: RegisterComponent,canActivate:[unLogedGuard]},
    {path:'login',component:LoginComponent,canActivate:[unLogedGuard]},
    {path:'shop',component:ShopComponent},
    {path:'',redirectTo:"/shop", pathMatch:'full'},
    {path:'cart',component:CartComponent,canActivate:[logedGuard]},
    {path:'manage',component:UserManageComponent,canActivate:[logedGuard]}
];
