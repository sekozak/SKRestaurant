import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BucketComponent } from './bucket/bucket.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { DishesComponent } from './dishes/dishes.component';
import { FormComponent } from './form/form.component';
import { AuthGuard } from './guard/auth.guard';
import { LogGuard } from './guard/log.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{ path: 'home', component: HomeComponent }, 
{ path: 'menu', component: DishesComponent }, 
{ path: 'dish-details/:id', component: DishDetailsComponent }, 
{ path: 'add', component: FormComponent, canActivate: [AuthGuard] }, 
{ path: 'bucket', component: BucketComponent, canActivate: [AuthGuard]  },
{ path: 'login', component: LoginComponent, canActivate: [LogGuard] },
{ path: 'register', component: RegisterComponent, canActivate: [LogGuard] },
{ path: '', redirectTo: '/home', pathMatch: 'full' }, 
{ path: '**', component: HomeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
