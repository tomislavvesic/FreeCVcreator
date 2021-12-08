import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators'
import { TemplateRelatedService } from '../services/template-related.service';


@Component({
  selector: 'app-current-template',
  templateUrl: './current-template.component.html',
  styleUrls: ['./current-template.component.scss']
})
export class CurrentTemplateComponent implements OnInit {
  selectedTemp = this.templateService.chooseTemplate
  
  form_profile_picture: any
  display_profile_picture: string
  first_name: string
  last_name: string
  email:string
  phone_number:string
  city:string
  state:string
  zip_code:string

  @ViewChild('temp1') temp1;
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

  onExportPDF():void {
    let DATA
    console.log(this.selectedTemp)
    if(this.selectedTemp == 'temp1'){
      DATA = this.temp1.temp1.nativeElement;
    } else if (this.selectedTemp == 'temp2'){
      DATA = 'test';
    }
    

    html2canvas(DATA).then(canvas => {
        let fileWidth = 210;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        const imageProps = PDF.getImageProperties(FILEURI)
        console.log(imageProps)
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('CV.pdf');
    });   
  }
}
