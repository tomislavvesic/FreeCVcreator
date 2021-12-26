import { Component, OnInit } from '@angular/core';
import { TemplateRelatedService } from '../services/template-related.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent {

  constructor(
    private templateService: TemplateRelatedService
  ) { }

  chooseTemp(event){
    this.templateService.chooseTemplate = event
  }
}
