import { Component, OnInit } from '@angular/core';
import { TemplateRelatedService } from '../services/template-related.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  constructor(
    private templateService: TemplateRelatedService
  ) { }

  ngOnInit(): void {
  }

  chooseTemp1(event){
    this.templateService.chooseTemplate = 'temp1'
  }
}
