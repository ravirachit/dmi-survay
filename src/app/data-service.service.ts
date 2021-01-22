import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http : HttpClient) { }

  // baseurl = "https://dmi.vistaconnect.com/dmi-clubbed-backend/api/"
  baseurl = "https://los.dmifinance.in/los/api/"

  getAuth() {
    return this.http.get(this.baseurl + 'getauth')
  }

  getUserDetails(key){
    return this.http.post(this.baseurl + 'getdbsms' , key);
  }

  eventTrack(phone,campign_number,eventname,eventvalue,listid){
    return this.http.post(this.baseurl + 'eventsms' , {phone,campign_number,eventname,eventvalue,listid});
  }

  formsubmit(key,location,ip,device,browser,emi_fillup,loan_month,mobile,work_profile,employement_type){
    return this.http.post(this.baseurl + 'sms_data_create' , {key,location,ip,device,browser,emi_fillup,loan_month,mobile,work_profile,employement_type});
  }

  getlocation(){
    return this.http.get('http://ip-api.com/json');
  }

  checkExpiration(key){
    return this.http.post(this.baseurl + 'pageexpirecheck' , {key});
  }
}



