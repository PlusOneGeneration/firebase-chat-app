import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule} from "./app.routing.module";
import {RouterModule} from "@angular/router";

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import {AppCanActivate} from "./app.canActivate";
import {RoomModule} from "./room/room.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    RoomModule
  ],
  providers: [AppService, AppCanActivate],
  exports: [AppComponent]
})
export class AppModule { }
