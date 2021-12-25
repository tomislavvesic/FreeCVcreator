import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators'
import { TemplateRelatedService } from '../services/template-related.service';
import { map } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';



@Component({
  selector: 'app-current-template',
  templateUrl: './current-template.component.html',
  styleUrls: ['./current-template.component.scss']
})
export class CurrentTemplateComponent implements OnInit {
  selectedTemp = this.templateService.chooseTemplate
  id: number
  
  form_profile_picture: any
  display_profile_picture: any
  first_name: string
  last_name: string
  email:string
  phone_number:string
  city:string
  state:string
  zip_code:string

  @ViewChild('selectedTemplate') selectedTemplate;
  profileEditor: string = ''
  jobs: Array<any> = []

  modules:Object = {}
  quillStyles:Object={}

  constructor(
    private fireStorage: AngularFireStorage,
    public templateService: TemplateRelatedService
    ) {
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
    this.jobs.push({
      "jobsEditor": null
    })
  }

  deleteJob(index){
    this.jobs.splice(index,1)
  }

  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  onProfilePicture(event){
    this.form_profile_picture = event.target.files[0]
    let filePath = "/images/" + Math.random() + this.form_profile_picture.name
    const fileRef = this.fireStorage.ref(filePath)
    this.fireStorage.upload(filePath, this.form_profile_picture).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL()
        .subscribe((url)=>{
          let base64img
          this.toDataURL(url, function(dataUrl) {
            base64img = dataUrl
          })
          this.display_profile_picture = new Observable<string>((observer: Observer<string>) => {
            setInterval(() => observer.next(base64img), 2000);
          });
        })
      })
    ).subscribe()
  }

  onExportPDF():void {
    this.id = 1
    let DATA = this.selectedTemplate.selectedTemplate.nativeElement;

    html2canvas(DATA,{scale:5}).then(canvas => {
        let fileWidth = 210;
        let fileHeight = canvas.height * fileWidth / canvas.width;

        const FILEURI = canvas.toDataURL('pdf')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight, null, 'FAST')
        
        PDF.save('CV.pdf');
    }); 
  }
}
