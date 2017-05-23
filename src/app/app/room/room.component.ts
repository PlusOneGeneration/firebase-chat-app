import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../firebase/firebase.service";
import * as moment from "moment";
import {Observable, Subject, BehaviorSubject} from "rxjs";
import messaging = firebase.messaging;

class Message {
  $key?: string;
  text: string = '';
  createdAt?: any;
  author: string;
}

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  users: any;

  messages: any;
  message: Message = new Message();
  currentUser: any = null;

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    this.messages = this.firebaseService.getMessages();

    this.users = this.firebaseService.getOnlineUsers();

    this.firebaseService.$user.subscribe((user) => {
      this.currentUser = user;
    });

    this.messages.subscribe(null, (err) => console.log('>>>>> err', err))
  }

  send() {
    this.firebaseService.sendMessage(this.message);
    this.message = new Message();
  }

  dateConvert(date) {
    return moment(date).format('H:m:s (DD/MM/YYYY)');
  }

  isYou(uid) {
    return this.currentUser.uid === uid;
  }

  getUserData(uid) {
    return this.firebaseService.getUserData(uid)
  }

  deleteMessage(key) {
    return this.firebaseService.deleteMessage(key);
  }

  editMessage(key) {
    return this.firebaseService.editMessage(key).then((message: any) => {
      this.message = message;
    });
  }

  checkBanMessages() {
    return this.firebaseService.getMessages().subscribe((messages) => {
      this.messages = Observable.of(messages);
    }, (err) => {
      if (err) {
        this.messages = Observable.of([]);
      }
    });
  }

  banUser(user) {
    return this.firebaseService.banUser(user).then(() => this.checkBanMessages());
  }

  unBanUser(user) {
    return this.firebaseService.unBanUser(user).then(() => this.checkBanMessages());
  }

  isBannedUser(uid): Promise<any> {
    return this.firebaseService.isBannedUser(uid);
  }
}
