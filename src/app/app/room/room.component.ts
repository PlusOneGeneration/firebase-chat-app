import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../firebase/firebase.service";
import * as moment from "moment";
import {Observable, Subject, BehaviorSubject} from "rxjs";

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  users: any;

  messages: any;
  message: any = '';

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    this.messages = this.firebaseService.getMessages();

    this.users = this.firebaseService.getOnlineUsers();
  }

  send() {
    this.firebaseService.sendMessage(this.message);
    this.message = '';
  }

  date(date) {
    return moment(date).format('H: m (DD / MM / YYYY)');
  }


  getUserData(uid) {
    return this.firebaseService.getUserData(uid)
  }

  deleteMessage(key) {
    return this.firebaseService.deleteMessage(key);
  }
}
