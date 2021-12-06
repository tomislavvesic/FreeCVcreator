import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplateRelatedService {
  chooseTemplate: string = ''
  templatePDF

  constructor() { }
}
