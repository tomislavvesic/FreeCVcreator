import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-template-two',
  templateUrl: './template-two.component.html',
  styleUrls: ['./template-two.component.scss']
})
export class TemplateTwoComponent {
  @ViewChild('selectedTemplate') selectedTemplate:ElementRef;

  @Input() display_profile_picture: any
  @Input() profile: any
  @Input() skills: Array<any>
  @Input() profileEditor: string = ''
  @Input() jobs: Array<any> = []

  constructor() { }
}
