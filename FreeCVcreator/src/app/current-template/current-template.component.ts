import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators'


@Component({
  selector: 'app-current-template',
  templateUrl: './current-template.component.html',
  styleUrls: ['./current-template.component.scss']
})
export class CurrentTemplateComponent implements OnInit {
  selectedTemp = 'temp1'
  
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

  constructor(private http: HttpClient, private fireStorage: AngularFireStorage) {
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
  }

  addJob(){
    this.jobs.push({"jobsEditor":null, "jobTitle":null})
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
