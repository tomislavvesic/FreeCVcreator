import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.scss']
})
export class TemplateOneComponent implements OnInit {
  form_profile_picture: any
  display_profile_picture: string
  storageRef:any
  first_name: string
  last_name: string
  email:string
  phone_number:string
  city:string
  state:string
  zip_code:string
  profileEditor: string = ''
  jobs: Array<any> = []

  constructor() { }

  ngOnInit(): void {
  }

}
