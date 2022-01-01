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
  @Input() first_name: string
  @Input() last_name: string
  @Input() email:string
  @Input() phone_number:string
  @Input() city;
  @Input() state:string
  @Input() zip_code:string
  @Input() profileEditor: string = ''
  @Input() jobs: Array<any> = []

  @Input() tempColor: string = 'black'
  @Input() tempBackground: string = 'white'
  @Input() personalColor: string = 'white'
  @Input() personalBackground: string = '#000044'

  constructor(
    public templateService: TemplateRelatedService
  ) { }
}
