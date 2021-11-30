import { Injectable } from '@angular/core';

interface templateData{
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
  profileEditor: string
  jobs: Array<any>
}

@Injectable({
  providedIn: 'root'
})
export class TemplateTransportService {
  datatransport: any
  currentTemplateTransport:string

  constructor() { }
}
