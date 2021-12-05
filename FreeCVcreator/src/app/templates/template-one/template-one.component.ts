import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { TemplateRelatedService } from 'src/app/services/template-related.service';

@Component({
  selector: 'app-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.scss']
})
export class TemplateOneComponent implements OnInit {
  @ViewChild('selectedTemplate') selectedTemplate:ElementRef;

  @Input() form_profile_picture: any
  @Input() display_profile_picture: string
  @Input() first_name: string
  @Input() last_name: string
  @Input() email:string
  @Input() phone_number:string
  @Input() city;
  @Input() state:string
  @Input() zip_code:string
  @Input() profileEditor: string = ''
  @Input() jobs: Array<any> = []

  constructor(
    public templateService: TemplateRelatedService
  ) { }

  ngOnInit(): void {
  }

  public onExportPDF():void {
    console.log(this.selectedTemplate)
    let DATA = this.selectedTemplate.nativeElement;

    html2canvas(DATA).then(canvas => {
        let fileWidth = 210;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('CV.pdf');
    });   
  }
}
