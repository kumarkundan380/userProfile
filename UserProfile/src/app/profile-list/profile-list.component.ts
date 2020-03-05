import { Component, OnInit } from '@angular/core';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';
import { ProfileService } from '../profile.service';
import { Profile } from '../profile';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {

  profile:Profile[];

  constructor(private profileService:ProfileService,private router:Router) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData(){
    this.profileService.getProfileList().subscribe((profile1: Profile[]) => {
      this.profile = profile1;
    });
  }

  deleteProfile(id:number) {
    this.profileService.deleteProfile(id).subscribe(
        data=>{
          this.reloadData();
        },
        error=>console.log(error));
  }
  updateProfile(id:number)
  {
 //   console.log(id)
        this.router.navigate(['update',id]);
  }

  profileDetails(id:number)
  {
   // console.log(id);
    this.router.navigate(['details',id]);
  }


}
