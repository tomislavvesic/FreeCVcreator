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

interface Skills {
  skillset: string,
  skill_range: any,
}

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

  profile = {
    first_name: '',
    last_name: '',
    email:'',
    phone_number:'',
    city:'',
    state:'',
    zip_code:'',
    // Variables used for chaning color of templates
    tempColor: '#000000',
    tempBackground: '#FFFFFF',
    personalColor: '#FFFFFF',
    personalBackground: '#000044',
    // Variables used for user sites
    github: '',
    linkedln: '',
    website: '',
  }
  display_profile_picture: Observable<HexBase64BinaryEncoding>
  skills: Array<Skills> = []
  profileEditor: string = ''
  jobs: Array<any> = []

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
        ['link', 'image'],
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
      "background-color":"rgba(220, 220, 220, 1)",
      "color":"rgb(30, 30, 30)",
      "quill-editor":"20px",
      "border-bottom-right-radius": "15px",
      "border-bottom-left-radius": "15px"
    }
  }

  changeTempColor(tempColor ,tempBackground ,personalColor ,personalBackground){
    this.profile.tempColor = tempColor
    this.profile.tempBackground = tempBackground
    this.profile.personalColor = personalColor
    this.profile.personalBackground = personalBackground
  }

  addSkill(): void{
    this.skills.push({
      "skillset": null,
      "skill_range": null
    })
  }

  changedProfile(event: EditorChangeContent | EditorChangeSelection): void{
    this.profileEditor = event['editor']['root']['innerHTML']
  }

  addJob(): void{
    this.jobs.push({
      "jobsEditor": null,
      "expanded": true
    })
  }

  jobToggle(index: number): void{
    let job = this.jobs[index]
    job.expanded = !job.expanded
  }

  changedJobs(event: EditorChangeContent | EditorChangeSelection, index: number): void{
    let job = this.jobs[index]
    job.jobsEditor = event['editor']['root']['innerHTML']
  }

  deleteJob(index: number): void{
    this.jobs.splice(index,1)
  }

  toDataURL(url: string, callback: (data: string | ArrayBuffer | null) => void): void {
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

  onProfilePicture(event: any): void{
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
          this.toDataURL(url.toString(), function(dataUrl) {
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
