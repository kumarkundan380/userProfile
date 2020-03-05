import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';


const routes: Routes = [
  {path:'',redirectTo:'/profile',pathMatch:'full'},
  {path: 'profile',component:ProfileListComponent},
  {path: 'add',component:CreateProfileComponent},
  {path: 'details/:id',component:ProfileDetailsComponent},
  {path: 'update/:id',component:UpdateProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
