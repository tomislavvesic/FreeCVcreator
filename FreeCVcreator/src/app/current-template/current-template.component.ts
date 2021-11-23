import { Component, OnInit, HostListener } from '@angular/core';

import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import {NgbConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-current-template',
  templateUrl: './current-template.component.html',
  styleUrls: ['./current-template.component.scss']
})
export class CurrentTemplateComponent implements OnInit {
  profileEditor: string = ''
  jobsEditor: string = ''
  jobs: Array<number> = [1,2]
  modules = {}

  constructor(ngbConfig: NgbConfig) {
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
  }

  ngOnInit(): void {
  }

  changedProfile(event: EditorChangeContent | EditorChangeSelection){
    this.profileEditor = event['editor']['root']['innerHTML']
  }

  changedJobs(event: EditorChangeContent | EditorChangeSelection){
    this.jobsEditor = event['editor']['root']['innerHTML']
  }
}
