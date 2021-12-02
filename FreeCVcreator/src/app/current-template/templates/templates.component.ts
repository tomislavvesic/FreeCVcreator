import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateTransportService } from 'src/app/services/template-transport.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  selectedTemplate=''
  form_profile_picture: any
  display_profile_picture: string
  storageRef:any
  first_name: string
  last_name: string
  email:string
  phone_number:string
  city:string=this.templatetp.city
  state:string
  zip_code:string
  profileEditor: string = ''
  jobs: Array<any> = []
  @ViewChild('tmp1') tmp1;

  constructor(public templatetp: TemplateTransportService) { }

  ngOnInit(): void {
  }

  transportTemplate(){
    this.templatetp.templateTransport = this.tmp1.nativeElement.innerHTML
    console.log(this.tmp1)
  }
}
