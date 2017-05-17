import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { RoomRoutingModule} from "./room.routing.module";
import {RouterModule} from "@angular/router";

import { RoomComponent } from './room.component';
import { RoomService } from './room.service';


@NgModule({
  declarations: [
    RoomComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    RoomRoutingModule,
    FormsModule
  ],
  providers: [RoomService],
  exports: [RoomComponent],
  // bootstrap: [RoomComponent]
})
export class RoomModule { }
