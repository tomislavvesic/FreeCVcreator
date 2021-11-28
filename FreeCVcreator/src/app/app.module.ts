import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { CvCarouselComponent } from './cv-carousel/cv-carousel.component';
import { CurrentTemplateComponent } from './current-template/current-template.component';
import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { JwPaginationModule } from 'jw-angular-pagination';
import { AppComponent } from './app.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { AngularFireModule } from '@angular/fire/compat'

@NgModule({
  declarations: [
    AppComponent,
    CvCarouselComponent,
    CurrentTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyB6yprhbamHlaPhybBumoVKyiMJQKqRngg",
      authDomain: "freeonlinecvmaker.firebaseapp.com",
      databaseURL: "https://freeonlinecvmaker-default-rtdb.firebaseio.com",
      projectId: "freeonlinecvmaker",
      storageBucket: "freeonlinecvmaker.appspot.com",
      messagingSenderId: "414857368113",
      appId: "1:414857368113:web:2ce096769fe5da469e3b10",
      measurementId: "G-547RPN2D8C"
    }),
    NgbModule,
    JwPaginationModule,
    QuillModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
