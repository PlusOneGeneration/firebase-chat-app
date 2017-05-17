import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, BehaviorSubject} from "rxjs";

import { AppService } from './app.service';
import { App } from './App';

@Injectable()
export class AppResolver implements Resolve<App> {

  // constructor(private appService: AppService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<App>|Promise<App>|App {
    // return this.appService.getById(route.params['appId']);
    // return new BehaviorSubject<App>(new App);
    return Promise.resolve(new App());
  }
}
