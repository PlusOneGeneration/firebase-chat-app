import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import * as firebase from "firebase";

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseService {
  database: any;
  app: any;
  $user: BehaviorSubject<any> = new BehaviorSubject(null);
  currentUser: any;
  $message: Subject<any> = new Subject();
  $userAdded: Subject<any> = new Subject();
  $userRemoved: Subject<any> = new Subject();

  messages: FirebaseListObservable<any[]>;
  constructor(private db: AngularFireDatabase) {
    let config = {
      apiKey: "AIzaSyCaPoxUIQxAOx3P6sqjscBblMwLvaVXuAQ",
      authDomain: "test-5b16b.firebaseapp.com",
      databaseURL: "https://test-5b16b.firebaseio.com"
    };

    this.app = firebase.initializeApp(config);
    this.database = firebase.database();

    this.$user.subscribe((user) => {
      this.currentUser = user;
    });

    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.currentUser = user;
      this.$user.next(user);
    } else {
      firebase.auth().signOut();
      localStorage.removeItem('user');
      this.currentUser = null;
      this.$user.next(null);
    }

    this.messages = this.db.list('/room/messages/');

    this.observeOnlineUsers();
  }

  getDB() {
    return this.database;
  }

  getApp() {
    return this.app;
  }

  logout() {
    localStorage.removeItem('user');
    return this.removeUserFromRoom().then(() => {
      this.$user.next(null);
      this.currentUser = null;
      firebase.auth().signOut();
    });
  }

  getMessages() {
    return this.messages;
  }

  sendMessage(message: any) {
    return this.messages.push({
      createdAt: Date.now(),
      text: message,
      author: this.currentUser.uid
    });
  }

  deleteMessage(key: string) {
    this.messages.remove(key);
  }

  getOnlineUsers() {
    return Promise.resolve()
      .then(() => {
        return this.getDB().ref('room/online/').once('value')
          .then((snapshot) => {
            if (snapshot.val()) {

              let keys = Object.keys(snapshot.val());
              return keys.map((key) => snapshot.val()[key]);
            } else {
              return [];
            }
          })
      })
  }

  getNewUser() {
    return this.$userAdded;
  }

  getRemovedUser() {
    return this.$userRemoved;
  }

  observeOnlineUsers() {
    this.getDB().ref('room/online/').on('child_added', (snapshot) => {
      this.$userAdded.next(snapshot.val())
    });

    this.getDB().ref('room/online/').on('child_removed', (snapshot) => {
      this.$userRemoved.next(snapshot.val())
    });
  }

  addUser(user) {
    return this.getDB().ref('users/' + user.uid).set(user);
  }

  users = {};

  getUserData(uid): Promise<any> {
    if (!this.users[uid]) {
      this.users[uid] = Promise.resolve()
        .then(() => {
          return this.getDB().ref('users/' + uid).once('value').then((snapshot) => snapshot.val());
        });
    }

    return this.users[uid];
  }

  setUserToRoom() {
    return this.getUserData(this.currentUser.uid).then((user) => {
      return this.getDB().ref('room/online/' + user.uid).set(user);
    })
  }

  removeUserFromRoom() {
    return this.getUserData(this.currentUser.uid).then((user) => {
      return this.getDB().ref('room/online/' + user.uid).remove();
    })
  }
}
