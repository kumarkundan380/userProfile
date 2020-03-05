import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';
import { ProfileListComponent } from '../profile-list/profile-list.component';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  id:number;
  data:FormGroup;
  profile:Profile;
  skills:any=[];
  languages:any[];
  public image:any=[];

  constructor(private route:ActivatedRoute,private router:Router,private profileService:ProfileService) { }

  ngOnInit() {
    this.profile = new Profile();
    
    this.id = this.route.snapshot.params['id'];
   // console.log(this.id);
    this.profileService.getProfile(this.id)
      .subscribe(data => {
       
        this.profile = data;
     //   console.log(this.profile.address);
        this.skills=this.profile.skill.split(',');
        this.languages=this.profile.languages.split(',');
      });
      this.profileService.getImage().subscribe(
        response=>{
        this.image=response;
         //console.log(this.image);
        }
      );

  }

  list(){
    this.router.navigate(['profile']);
  }

}
