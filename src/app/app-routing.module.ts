import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { P0Component } from './p0/p0.component';
import { P1Component } from './p1/p1.component';
import { SmsServiceComponent } from './sms-service/sms-service.component';
import { P2Component } from './p2/p2.component';

const routes : Routes = [
  { path : 'p2service' , component : SmsServiceComponent},
  { path : 'p0' , component : P0Component},
  { path : 'p1' , component : P1Component},
  { path : 'p2' , component : P2Component}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class AppRoutingModule { }
