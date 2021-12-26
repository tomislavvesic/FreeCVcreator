import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-template-two',
  templateUrl: './template-two.component.html',
  styleUrls: ['./template-two.component.scss']
})
export class TemplateTwoComponent {
  @ViewChild('selectedTemplate') selectedTemplate:ElementRef;

  @Input() display_profile_picture: any
  @Input() first_name: string
  @Input() last_name: string
  @Input() email:string
  @Input() phone_number:string
  @Input() city;
  @Input() state:string
  @Input() zip_code:string
  @Input() profileEditor: string = ''
  @Input() jobs: Array<any> = []

  constructor() { }
}
