import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CvCarouselComponent } from './cv-carousel/cv-carousel.component';
import { CurrentTemplateComponent } from './current-template/current-template.component';
import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwPaginationModule } from 'jw-angular-pagination';
import { AppComponent } from './app.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { TemplatesComponent } from './templates/templates.component';
import { TemplateOneComponent } from './templates/template-one/template-one.component';
import { TemplateTwoComponent } from './templates/template-two/template-two.component';
import { SkillDisplayPipe } from './pipes/skill-display.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { SettingsComponent } from './settings/settings.component';
import { TemplateThreeComponent } from './templates/template-three/template-three.component';



@NgModule({
  declarations: [
    AppComponent,
    CvCarouselComponent,
    CurrentTemplateComponent,
    TemplatesComponent,
    TemplateOneComponent,
    TemplateTwoComponent,
    TemplateThreeComponent,
    NavbarComponent,
    SettingsComponent,
    SkillDisplayPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgbModule,
    JwPaginationModule,
    QuillModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
