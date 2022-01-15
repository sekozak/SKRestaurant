import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BucketComponent } from './bucket/bucket.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { DishesComponent } from './dishes/dishes.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{ path: 'home', component: HomeComponent }, 
{ path: 'menu', component: DishesComponent }, 
{ path: 'dish-details/:id', component: DishDetailsComponent }, 
{ path: 'add', component: FormComponent }, 
{ path: 'bucket', component: BucketComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' }, 
{ path: '**', component: HomeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
