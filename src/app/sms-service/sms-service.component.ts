import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataServiceService } from '../data-service.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-sms-service',
  templateUrl: './sms-service.component.html',
  styleUrls: ['./sms-service.component.scss']
})
export class SmsServiceComponent implements OnInit {

  count:number=1;
  key:any='';
  keyValue:any='';
  authData:any='';
  userPhone:any='';
  userName:any='';
  eventName:any='';
  eventvalue:any='';
  listid:any='';
  userResp:any='';
  subOptions:any='';
  phoneNumber:any='';
  userLoanName:any='';
  checkExpiration:any='';
  userSelectedType:any='';
  userSelectedProfile:any='';
  optionSelectedUser:any='No';
  locationService:any='';
  deviceInfo:any='';
  deviceType:any='';
  userResponse:any=[];
  subOptionSelection:boolean=true;
  selected:boolean=false;
  selectedOtpn:boolean=false;
  termsAndCondCheck:boolean=false;

  workProfile:any=[
    {id:1,value:'AGRICULTURE AND ALLIED INDUSTRIES'},
    {id:2,value:'AUTOMOBILES AND AUTO COMPONENTS'},
    {id:3,value:'AVIATION'},
    {id:4,value:'BANKING AND FINANCIAL SERVICES'},
    {id:5,value:'CEMENT'},
    {id:6,value:'CONSUMER DURABLES'},
    {id:7,value:'ECOMMERCE'},
    {id:8,value:'EDUCATION AND TRAINING'},
    {id:9,value:'ENGINEERING AND CAPITAL GOODS'},
    {id:10,value:'FMCG'},
    {id:11,value:'GEMS AND JEWELLERY'},
    {id:12,value:'HEALTHCARE'},
    {id:13,value:'INFRASTRUCTURE'},
    {id:14,value:'INSURANCE'},
    {id:15,value:'IT & ITES'},
    {id:16,value:'MANUFACTURING'},
    {id:17,value:'MEDIA AND ENTERTAINMENT'},
    {id:18,value:'METALS AND MINING'},
    {id:19,value:'OIL AND GAS'},
    {id:20,value:'PHARMACEUTICALS'},
    {id:21,value:'PORTS'},
    {id:22,value:'POWER'},
    {id:23,value:'RAILWAYS'},
    {id:24,value:'REAL ESTATE'},
    {id:25,value:'RENEWABLE ENERGY'},
    {id:26,value:'RETAIL'},
    {id:27,value:'ROADS'},
    {id:28,value:'SCIENCE AND TECHNOLOGY'},
    {id:29,value:'SERVICES'},
    {id:30,value:'STEEL'},
    {id:31,value:'TELECOMMUNICATIONS'},
    {id:32,value:'TEXTILES'},
    {id:33,value:'TOURISM AND HOSPITALITY'},
    {id:34,value:'OTHERS'},
    {id:35,value:'CHARTERED ACCOUNTANT'},
    {id:36,value:'ARCHITECT'},
    {id:37,value:'LAWYER'},
    {id:38,value:'CONSULTANT'}
  ];
  
  empType:any=[
    {id:1,value:'Salaried'},
    {id:2,value:'Self Employed'},
    {id:3,value:'Professional'}
  ]

  constructor(private service : DataServiceService,
    private route : ActivatedRoute,private ngxService: NgxUiLoaderService,
    private device: DeviceDetectorService,private http : HttpClient) { }

  ngOnInit() {
    this.service.getAuth().subscribe(res => {
      this.authData = res;
      sessionStorage.setItem('dmi_token', this.authData.data.access_token)
      sessionStorage.setItem('dmi_instance_url', this.authData.data.instance_url)
    });
    this.showUserData();
  }

  showUserData(){
    this.ngxService.start();
    this.route.queryParams.subscribe(params=> {
      this.key = params['key']
      this.keyValue = { key: this.key }
      sessionStorage.setItem('loginKey', this.key);
      this.service.checkExpiration(this.key).subscribe(res=>{
        this.checkExpiration = res;
        if(res){
          if(this.checkExpiration.data=='Expired'){
            let timerInterval
            Swal.fire({
              title: 'Alert!',
              html: 'Your link is expired',
              timer: 5000,
              timerProgressBar: true,
              onBeforeOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                  const content = Swal.getContent()
                }, 100)
              },
              onClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                window.location.href = 'https://dmifinance.in';
              }
            });
          }
          if(this.checkExpiration.data=='Page Not Expired'){
            // alert('Page Not Expired')
          }
        }
      });
      if(params){
        this.service.getUserDetails(this.keyValue).subscribe(res=>{
          this.userResp=res;
          this.userResponse = this.userResp.data[0];
          this.userName = this.userResponse.name;
          this.userLoanName = this.userResponse.loanname;
          this.userPhone = this.userResponse.mobile;
          this.listid = this.userResponse.list_id;
          if(res){
            this.ngxService.stop();
            let eventName:any='EMI Pay Option Page Loaded with key = '+this.key;
            this.service.eventTrack(this.userPhone,this.key,eventName,0,this.listid).subscribe(res=>{});
          }
        });
      }
    });
  }
  
  optionSelected(option){
    let eventName:any='';
    if(option==1){
      this.subOptionSelection=false;
      eventName="Avail loan moratorium / deferment with the Term and Conditions mentioned";
      this.optionSelectedUser='Yes';this.selectedOtpn=true;
    }
    else if(option==2){
      eventName="Pay EMIs as usual";
      this.optionSelectedUser='No';this.selectedOtpn=true;
    }
    else if(option==9){eventName="Submit Button Clicked.";this.submitForm();}
    this.service.eventTrack(this.userPhone,this.key,eventName,option,this.listid).subscribe(res=>{});
  }

  suboptionSelected(value){
    let eventName:any='';
    this.subOptionSelection=true;
    if(value==3){this.subOptions='For March 2020 only';eventName='For March 2020 only';}
    else if(value==4){this.subOptions='For March and April 2020 only';eventName='For March and April 2020 only'}
    else if(value==5){this.subOptions='For March, April and May 2020';eventName='For March, April and May 2020'}
    this.service.eventTrack(this.userPhone,this.key,eventName,value,this.listid).subscribe(res=>{});
  }

  userWorkProfile(profile){
    this.userSelectedProfile=profile;
    this.selected=true;
    let eventName:any='Work Profile Selected';
    this.service.eventTrack(this.userPhone,this.key,eventName,7,this.listid).subscribe(res=>{});
  }

  userEmpType(type){
    this.userSelectedType=type;
    let eventName:any='Employment Type Selected';
    this.service.eventTrack(this.userPhone,this.key,eventName,8,this.listid).subscribe(res=>{});
  }

  onSearchChange(event){
    if(this.count == 1){
      this.count++;
      let eventName:any='Mobile field clicked';
      this.service.eventTrack(this.userPhone,this.key,eventName,6,this.listid).subscribe(res=>{});
    }
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  submitForm(){
    let message:any='';
    this.ngxService.start();
    if(this.optionSelectedUser=='No'){message='We thank you for choosing not to avail the moratorium facility and helping us extend this benefit to those affected by this pandemic genuinely.'}
    if(this.optionSelectedUser=='Yes'){message='Your request for moratorium has been received successfully.'}
    this.deviceInfo = this.device.getDeviceInfo();
    if(this.device.isMobile()==true){this.deviceType='Mobile'}
    else if(this.device.isTablet()==true){this.deviceType='Tablet'}
    else if(this.device.isDesktop()==true){this.deviceType='Desktop'};
    this.http.get("https://api.ipify.org/?format=json").subscribe(ipDATA => {
      this.http.get("https://ipapi.co/" + ipDATA['ip'] + "/json/").subscribe(clientInformation => {
        clientInformation['userAgent'] = window.navigator.userAgent;
        clientInformation['vendor'] = window.navigator.vendor;
        this.locationService=clientInformation;
        if(clientInformation){
          this.service.formsubmit(this.key,this.locationService.city,this.locationService.ip,this.deviceType,this.device.browser,this.optionSelectedUser,this.subOptions,this.phoneNumber,this.userSelectedProfile,this.userSelectedType).subscribe(res=>{
           if(res){
            this.ngxService.stop();
            Swal.fire({
              title: 'Thankyou',
              text: message,
              icon: "success",
              confirmButtonText: 'OK'
            }).then((result) => {
                if (result.value) {
                  let eventName:any='EMI Pay Option Submitted Successfully';
                  this.service.eventTrack(this.userPhone,this.key,eventName,10,this.listid).subscribe(res=>{});
                  window.location.href = 'https://dmifinance.in';
                }
              });
            }
          },error=>{
            this.ngxService.stop();
            Swal.fire({
              title: 'Alert',
              text: "Please try again",
              icon: "warning",
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.value) {
              }
            });
          });
        }
      });
    },error=>{
      this.ngxService.stop();
      Swal.fire({
        title: 'Alert',
        text: "Please try again",
        icon: "warning",
        confirmButtonText: 'OK'
      });
    });
  }

  showAlert(){
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Confirm!'
    });
  }

  openExample(){
    let eventName:any='Seen Example';
    this.service.eventTrack(this.userPhone,this.key,eventName,11,this.listid).subscribe(res=>{});
    Swal.fire({
      title: 'Example',
      text: 'Amit took a personal loan of INR 50,000 on a 12 month EMI. His EMI is INR 4,631 per month and original total interest to be paid by him is INR 6,736. If Amit decides to take a 3 month moratorium, he will end up paying additional interest of INR 3,473 which is 51% of the original interest.',
      icon: 'info',
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      }
    });
  }

}
