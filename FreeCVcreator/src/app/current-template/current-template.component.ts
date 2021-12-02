import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators'
import { TemplateTransportService } from '../services/template-transport.service';
import { TemplateOneComponent } from './templates/template-one/template-one.component';


@Component({
  selector: 'app-current-template',
  templateUrl: './current-template.component.html',
  styleUrls: ['./current-template.component.scss']
})
export class CurrentTemplateComponent implements OnInit {
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
  
  
  modules:Object = {}
  quillStyles:Object={}

  currentComponent=TemplateOneComponent

  constructor(
    private http: HttpClient,
    private fireStorage: AngularFireStorage,
    public tps: TemplateTransportService
    ) {
    // this.tps.datatransport = {
    //   form_profile_picture: this.form_profile_picture,
    //   display_profile_picture: this.display_profile_picture,
    //   storageRef: this.storageRef,
    //   first_name: this.first_name,
    //   last_name: this.last_name,
    //   email: this.email,
    //   phone_number: this.phone_number,
    //   city: this.city,
    //   state: this.state,
    //   zip_code: this.zip_code,
    //   profileEditor: this.profileEditor,
    //   jobs: this.jobs,
    // }
    this.modules = {
      toolbar: [
        ['bold', 'italic', 'underline'],
      
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        
        [{ 'indent': '-1' }, { 'indent': '+1' }], 
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']
      ]
    }
    this.quillStyles = {
      "height":"150px",
      "background-color":"rgba(33, 37, 41, 1)",
      "color":"rgb(220, 220, 220)",
      "quill-editor":"20px"
    }
  }

  ngOnInit(): void {
  }

  changedProfile(event: EditorChangeContent | EditorChangeSelection){
    this.profileEditor = event['editor']['root']['innerHTML']
  }

  changedJobs(event: EditorChangeContent | EditorChangeSelection, index){
    let job = this.jobs[index]
    job.jobsEditor = event['editor']['root']['innerHTML']
    console.log(this.tps.datatransport)
  }

  addJob(){
    this.jobs.push({"jobsEditor":null})
  }

  deleteJob(index){
    this.jobs.splice(index,1)
  }

  onProfilePicture(event){
    this.form_profile_picture = event.target.files[0]
    let filePath = "/images/" + Math.random() + this.form_profile_picture.name
    const fileRef = this.fireStorage.ref(filePath)
    this.fireStorage.upload(filePath, this.form_profile_picture).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url)=>{
          this.display_profile_picture = url
        })
      })
    ).subscribe()
  }
}
