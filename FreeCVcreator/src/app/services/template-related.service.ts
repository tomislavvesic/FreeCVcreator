import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplateRelatedService {
  chooseTemplate: string = 'temp1'

  constructor() { }
}
