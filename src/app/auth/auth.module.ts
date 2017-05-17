import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule }   from '@angular/forms';

import {AuthRoutingModule} from "./auth.routing.module";
import {RouterModule} from "@angular/router";

import {AuthComponent} from './auth.component';
import {AuthService} from './auth.service';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    AuthRoutingModule,
    FormsModule
  ],
  providers: [AuthService],
  exports: [AuthComponent],
  // bootstrap: [AuthComponent]
})
export class AuthModule {
}
