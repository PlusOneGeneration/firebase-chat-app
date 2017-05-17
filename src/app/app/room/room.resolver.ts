import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, BehaviorSubject} from "rxjs";

import { RoomService } from './room.service';
import { Room } from './Room';

@Injectable()
export class RoomResolver implements Resolve<Room> {

  // constructor(private roomService: RoomService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Room>|Promise<Room>|Room {
    // return this.roomService.getById(route.params['roomId']);
    // return new BehaviorSubject<Room>(new Room);
    return Promise.resolve(new Room());
  }
}
