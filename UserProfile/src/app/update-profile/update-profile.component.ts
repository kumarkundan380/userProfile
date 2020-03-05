import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { ActivatedRoute,Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { FormBuilder, Validators} from '@angular/forms'
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

   public image:any=[];
  id:number;
  profile:Profile;
  public selectedFile:any;
  imageName1:string;
  imgageCheck:boolean=true;

  constructor(private formBuilder:FormBuilder,private route:ActivatedRoute,private router:Router,private profileService:ProfileService) { }
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
    bio:['',Validators.required],
    imageName:['']
  }); 

  ngOnInit() {
    console.log("UPDATE DETAILS");
  //  console.log(this.profileForm.value.imageName);
    this.profile = new Profile();

    this.id = this.route.snapshot.params['id'];
   // console.log(this.id)
    
    this.profileService.getProfile(this.id)
      .subscribe(data => {
      //  console.log(data)
        this.profile = data;
        // this.profileForm.controls["firstName"].setValue(data.firstName);
        // this.profileForm.controls["lastName"].setValue(data.lastName);
        // this.profileForm.controls["email"].setValue(data.email);
       // console.log(data.imageName);
        let json = {
          firstName:data.firstName,
          lastName:data.lastName,
          email:data.email,
          designation:data.designation,
          country:'lll',
          mobileNo:data.mobileNo,
          dob:'zssasa',
          skill:data.skill,
          hobbies:data.hobbies,
          gender:'assa',
          address:data.address,
          languages:data.languages,
          presentDesignation:data.exprience.presentDesignation,
          companyName:data.exprience.companyName,
          period:data.exprience.period,
          sscBoard:data.education.sscBoard,
          sscPercentage:data.education.sscPercentage,
          sscYear:data.education.sscYear,
          hscBoard:data.education.hscBoard,
          hscPercentage:data.education.hscPercentage,
          hscYear:data.education.hscYear,
          bscBoard:data.education.bscBoard,
          bscPercentage:data.education.bscPercentage,
          bscYear:data.education.bscYear,
          pgBoard:data.education.pgBoard,
          pgPercentage:data.education.pgPercentage,
          pgYear:data.education.pgYear,
          bio:'saas',
          imageName:data.imageName,
        };
        this.profileForm.setValue(json);
        //console.log(this.profileForm.value.imageName);
      }, error => console.log(error));

      this.profileService.getImage().subscribe(
        response=>{
        this.image=response;
     //    console.log(this.image);
        }
      );
  }

  updateProfile() {
    this.profile=this.profileForm.value;

  //  console.log(this.profile.languages);
   // console.log(this.profile.presentDesignation);
    // console.log(this.profileForm.value.sscPercentage);
    // console.log(this.profileForm.value.languages);
  //  console.log(this.profileForm.value.imageName);
    this.profile.mobileNo=this.profileForm.value.mobileNo;
    this.profile.presentDesignation=this.profileForm.value.presentDesignation;
    this.profile.sscPercentage=this.profileForm.value.sscPercentage;
    this.profile.languages=this.profileForm.value.languages;
  
  //  this.profile.imageName=this.profileForm.value.imageName;
  
    console.log(this.profileForm.value.imageName);
  if(!this.imgageCheck){
    const upLoadData=new FormData();
    upLoadData.append('myFile',this.selectedFile,this.selectedFile.name);

    this.profileService.imageUpload(upLoadData);
    this.profile.imageName=this.imageName1;
  } 
  
    this.profileService.updateProfile(this.id, this.profile)
      .subscribe(
        (data)=>{
          this.profile = new Profile();
          this.gotoList();
      });
    
    
  }
  onSubmit() {
    this.updateProfile();    
  }

  gotoList() {
    this.router.navigate(['/profile']);
  }

  public imagePath;
  imgURL:any;
  public message: string;
  readURL(files)
  {
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
   this.imageName1=files[0].name;
   this.imgageCheck=false;
   
  // console.log(this.imageName);
  }
 

 
}
