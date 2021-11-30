import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TemplateTransportService } from 'src/app/services/template-transport.service';
import { TemplateOneComponent } from './template-one/template-one.component';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  currentComponent=TemplateOneComponent

  constructor(public tps: TemplateTransportService) { }

  ngOnInit(): void {
  }
}
