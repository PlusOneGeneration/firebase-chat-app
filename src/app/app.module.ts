import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from "@angular/router";

import {AppComponent} from './app.component';
import {AuthModule} from "./auth/auth.module";
import {FirebaseModule} from "./firebase/firebase.module";
import {AppModule} from "./app/app.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([]),
    FirebaseModule,
    AppModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class MainAppModule {
}
