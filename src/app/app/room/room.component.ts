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
  users: any[] = [];


  messages: any[] = [];
  message: any = '';

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    this.firebaseService.getMessages()
      .then((messages) => {
        console.log('>>>>> messages []', messages)
        this.messages = messages;
      });

    this.firebaseService.getOnlineUsers()
      .then((users) => {
        console.log('>>>>> users []', users)
        this.users = users;
      });

    this.firebaseService.getMessage$().subscribe((message) => {
      this.messages.push(message)
    });

    this.firebaseService.getNewUser().subscribe((user) => {
      this.users.push(user);
    });

    this.firebaseService.getRemovedUser().subscribe((user) => {
      this.users = this.users.filter((_user) => _user.uid !== user.uid);
      // this.users.push(user);
    });
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
}
