import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { BucketComponent } from './bucket/bucket.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { DishesComponent } from './dishes/dishes.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { AuthGuard } from './guard/auth.guard';
import { LogGuard } from './guard/log.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{ path: 'home', component: HomeComponent }, 
{ path: 'menu', component: DishesComponent }, 
{ path: 'adminview', component: AdminViewComponent, canActivate: [AuthGuard] }, 
{ path: 'editmenu', component: EditMenuComponent, canActivate: [AuthGuard] }, 
{ path: 'dish-details/:id', component: DishDetailsComponent,canActivate: [AuthGuard] }, 
{ path: 'editdish/:id', component: EditFormComponent, canActivate: [AuthGuard] },
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
