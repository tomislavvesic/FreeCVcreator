import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CvCarouselComponent } from './cv-carousel/cv-carousel.component';
import { CurrentTemplateComponent } from './current-template/current-template.component';
import { TemplatesComponent } from './templates/templates.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: CvCarouselComponent },
  { path: 'template', component: CurrentTemplateComponent },
  { path: 'templates', component: TemplatesComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }