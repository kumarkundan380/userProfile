import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Profile } from '../profile';
import { Router } from '@angular/router';
import { FormBuilder, Validators} from '@angular/forms'


@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {

   profile:Profile=new Profile();
   submitted=false;
   public selectedFile;
   imageName:any;
   dafaultImage:boolean=true;

  get firstName(){
    return this.profileForm.get('firstName');
  }
  get email(){
    return this.profileForm.get('email');
  }
  get mobile(){
    return this.profileForm.get('mobile');
  }

    constructor(private formBuilder:FormBuilder,private profileService:ProfileService,private router:Router) { }

    countries=['India','China','Japan','Australia','Canada','Russia','England','USA'];
    profileForm=this.formBuilder.group({
    firstName:['',[Validators.required,Validators.minLength(3)]],
    lastName:['',],
    email:['',[Validators.required,Validators.email]],
    designation:['',Validators.required],
    country:['',Validators.required],
    mobileNo:['',[Validators.required,Validators.minLength(10)]],
    dob:['',Validators.required],
    skill:['',Validators.required],
    hobbies:['',Validators.required],
    gender:['',Validators.required],
    address:['',Validators.required],
    languages:['',Validators.required],
    presentDesignation:['',Validators.required],
    companyName:['',Validators.required],
    period:['',Validators.required],
    sscBoard:['',Validators.required],
    sscPercentage:['',Validators.required],
    sscYear:['',Validators.required],
    hscBoard:['',Validators.required],
    hscPercentage:['',Validators.required],
    hscYear:['',Validators.required],
    bscBoard:['',Validators.required],
    bscPercentage:['',Validators.required],
    bscYear:['',Validators.required],
    pgBoard:['',Validators.required],
    pgPercentage:['',Validators.required],
    pgYear:['',Validators.required],
    bio:['',Validators.required]
  });
  ngOnInit() {
  }

  save(){
   this.profile=this.profileForm.value;
   const upLoadData=new FormData();
   upLoadData.append('myFile',this.selectedFile,this.selectedFile.name);
   this.profileService.imageUpload(upLoadData);
   this.profile.imageName=this.imageName;
   this.profileService.createProfile(this.profile).subscribe(data=>{
    this.router.navigate(['/profile']);
   }); 

  }

  public imagePath;
  imgURL:any;
  public message: string;
  readURL(files)
  {
    this.dafaultImage=false;
    if (files.length === 0)
        return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null)
    {
        this.message = "Only images are supported.";
        return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) =>
    { 
        this.imgURL = reader.result; 
    }
   this.selectedFile=files[0];
   this.imageName=files[0].name;
  }
 
  onSubmit(){
    this.submitted=true;
    this.save();

  }
}
