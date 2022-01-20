import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from '../environments/environment'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishComponent } from './dish/dish.component';
import { DishesComponent } from './dishes/dishes.component';
import { BucketComponent } from './bucket/bucket.component';
import { FormComponent } from './form/form.component'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating/rating.component';
import { SearchPipePipe } from './search-pipe.pipe';
import { FilterComponent } from './filter/filter.component';
import { HomeComponent } from './home/home.component';
import { BucketStorage } from './bucketStorage';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { DishReviewComponent } from './dish-review/dish-review.component';
import { CurrencyStorageService } from './currency-storage.service';
import { StorageService } from './storage.service';
import { ReviewStorageService } from './review-storage.service';
import { ReviewListComponent } from './review-list/review-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// import { GoogleMapsModule } from '@angular/google-maps'

@NgModule({
  declarations: [
    AppComponent,
    DishComponent,
    DishesComponent,
    BucketComponent,
    FormComponent,
    RatingComponent,
    SearchPipePipe,
    FilterComponent,
    HomeComponent,
    DishDetailsComponent,
    DishReviewComponent,
    ReviewListComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [StorageService,ReviewStorageService,BucketStorage,CurrencyStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
