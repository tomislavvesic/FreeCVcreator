import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { TemplateRelatedService } from 'src/app/services/template-related.service';

@Component({
  selector: 'app-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.scss']
})
export class TemplateOneComponent {
  @ViewChild('selectedTemplate') selectedTemplate:ElementRef;

  @Input() display_profile_picture: any
  @Input() formData: any
  @Input() profileEditor: string = ''
  @Input() jobs: Array<any> = []

  constructor(
    public templateService: TemplateRelatedService
  ) { }
}
