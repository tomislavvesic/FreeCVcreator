import { Component, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators'
import { TemplateRelatedService } from '../services/template-related.service';
import { Observable, Observer } from 'rxjs';
import { HexBase64BinaryEncoding } from 'crypto';
import { Url } from 'url';



@Component({
  selector: 'app-current-template',
  templateUrl: './current-template.component.html',
  styleUrls: ['./current-template.component.scss']
})
export class CurrentTemplateComponent {
  // var below decides which template is selected
  selectedTemp = this.templateService.chooseTemplate
  // var below is used to create PDF from selected template body
  @ViewChild('selectedTemplateBody') selectedTemplateBody;
  form_profile_picture: HTMLImageElement

  display_profile_picture: Observable<HexBase64BinaryEncoding>
  first_name: string
  last_name: string
  email:string
  phone_number:string
  city:string
  state:string
  zip_code:string
  profileEditor: string = ''
  jobs: Array<any> = []

  // Variables used for chaning color of templates
  tempColor: string = '#000000'
  tempBackground: string = '#FFFFFF'
  personalColor: string = '#FFFFFF'
  personalBackground: string = '#000044'

  // Quill editor options
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

  updateTemplateColor(event){
    console.log(event)
  }

  changedProfile(event: EditorChangeContent | EditorChangeSelection){
    this.profileEditor = event['editor']['root']['innerHTML']
  }

  addJob(){
    this.jobs.push({
      "jobsEditor": null,
      "expanded": true
    })
  }

  jobToggle(index){
    let job = this.jobs[index]
    job.expanded = !job.expanded
  }

  changedJobs(event: EditorChangeContent | EditorChangeSelection, index){
    let job = this.jobs[index]
    job.jobsEditor = event['editor']['root']['innerHTML']
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
    let filePath = "/images/" + Math.random() + this.form_profile_picture.id
    const fileRef = this.fireStorage.ref(filePath)
    
    // We need to upload image to firebase because we can't select it locally
    this.fireStorage.upload(filePath, this.form_profile_picture).snapshotChanges().pipe(
      finalize(() => {
        // Download image from firebase
        fileRef.getDownloadURL()
        .subscribe((url: Url)=>{
          let base64img
          // Turn Firebase URL to base64. PDF download only uses base64 and cannot download URL
          this.toDataURL(url, function(dataUrl) {
            base64img = dataUrl
          })

          // set observer to base64 image
          this.display_profile_picture = new Observable<HexBase64BinaryEncoding>((observer: Observer<HexBase64BinaryEncoding>) => {
            setInterval(() => observer.next(base64img), 2000);
          });
        })
      })
    ).subscribe()
  }

  onExportPDF():void {
    let DATA = this.selectedTemplateBody.selectedTemplate.nativeElement;

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
