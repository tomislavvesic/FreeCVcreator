import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { TemplateRelatedService } from 'src/app/services/template-related.service';

@Component({
  selector: 'app-template-three',
  templateUrl: './template-three.component.html',
  styleUrls: ['./template-three.component.scss']
})
export class TemplateThreeComponent {
  @ViewChild('selectedTemplate') selectedTemplate: ElementRef;

  @Input() display_profile_picture: any;
  @Input() profile: any;
  @Input() skills: Array<any> = [];
  @Input() profileEditor = '';
  @Input() jobs: Array<any> = [];

  constructor(public templateService: TemplateRelatedService) {}
}
