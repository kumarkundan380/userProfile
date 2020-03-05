import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://localhost:8082/profile';

  constructor(private http:HttpClient) { }

  getProfile(id:number):Observable<any> {
    
    return this.http.get(`${this.baseUrl}` +'/fetch/'+`${id}`);
   
  }

  createProfile(profile:Object):Observable<Object>{
    return this.http.post(`${this.baseUrl}`+'/add',profile);
  }

  updateProfile(id:number,value:any):Observable<Object> {
    return this.http.put(`${this.baseUrl}`+'/update/'+`${id}`,value);
  }

  deleteProfile(id:number):Observable<any> {
    return this.http.delete(`${this.baseUrl}`+'/delete/'+`${id}`,{responseType:'text'});
  }

  getProfileList():Observable<any>{
  
   return this.http.get(`${this.baseUrl}`+'/findAll',{ responseType:'json'})
    
  }

  getImage(){
   return this.http.get(`${this.baseUrl}`+'/getImage');
  }

  imageUpload(uploadImage:FormData){
    this.http.post('http://localhost:8082/profile'+'/uploadImage',uploadImage).subscribe(
    res=>{
    }
    );
    }
}
