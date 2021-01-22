import { NgxUiLoaderModule, NgxUiLoaderHttpModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION } from  'ngx-ui-loader';
import { MatFormFieldModule, MatInputModule ,MatRadioModule,MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatIconModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SmsServiceComponent } from './sms-service/sms-service.component';
import { AppRoutingModule } from './app-routing.module';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { P0Component } from './p0/p0.component';
import { P1Component } from './p1/p1.component';
import { P2Component } from './p2/p2.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "blur": 2,
  "fgsColor": "#065189",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "wandering-cubes",
  "gap": 50,
  "logoPosition": "center-center",
  "logoSize": 100,
  "logoUrl": "assets/Dmifinance-logo.png",
  "overlayColor": "rgba(220,220,220,0.87)",
  "text": "Please wait...",
  "textColor": "#000000",
  "textPosition": "center-center",
};

@NgModule({
  declarations: [
    AppComponent,
    SmsServiceComponent,
    P0Component,
    P1Component,
    P2Component
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    MatRadioModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    BrowserAnimationsModule,
    DeviceDetectorModule.forRoot(),
    NgbModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
