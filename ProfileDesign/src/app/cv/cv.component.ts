import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {
data:FormGroup;
imageName:any;
skills:any=[];
languages:any[];
  constructor(private formService:FormService) { 
    //this.data=this.formService.getData();
    //console.log(this.data.value);
  }

  ngOnInit() {
    this.data=this.formService.getData();
    this.skills=this.data.get('skill').value.split(",");
    this.languages=this.data.get('language').value.split(",");
    this.imageName=this.formService.getImage();
  }


}
