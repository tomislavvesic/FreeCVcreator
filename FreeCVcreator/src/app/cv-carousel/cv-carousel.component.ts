import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TemplateRelatedService } from '../services/template-related.service';
@Component({
  selector: 'app-cv-carousel',
  templateUrl: './cv-carousel.component.html',
  styleUrls: ['./cv-carousel.component.scss']
})
export class CvCarouselComponent {

  constructor(
    private templateService: TemplateRelatedService,
    public router: Router
  ) { }

  chooseTemp(event){
    this.templateService.chooseTemplate = event
    this.router.navigate(['template']);
  }
}
