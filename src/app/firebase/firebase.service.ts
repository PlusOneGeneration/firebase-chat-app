import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject, Observable} from "rxjs";
import * as firebase from "firebase";

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from "@angular/router";

@Injectable()
export class FirebaseService {
  database: any;
  app: any;
  user: Observable<firebase.User>;
  $user: BehaviorSubject<any> = new BehaviorSubject(null);

  users: FirebaseListObservable<any[]>;
  messages: FirebaseListObservable<any[]>;
  onlineUsers: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase,
              private router: Router,
              public afAuth: AngularFireAuth) {
    let config = {
      apiKey: "AIzaSyCaPoxUIQxAOx3P6sqjscBblMwLvaVXuAQ",
      authDomain: "test-5b16b.firebaseapp.com",
      databaseURL: "https://test-5b16b.firebaseio.com"
    };

    let user = this.afAuth.auth.currentUser || JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.$user.next(user);
    } else {
      this.afAuth.auth.signOut();
      localStorage.removeItem('user');
      this.$user.next(null);
    }

    this.user = afAuth.authState;

    this.messages = this.db.list('/room/messages/');
    this.onlineUsers = this.db.list('/room/online/');
    this.users = this.db.list('/users/');
  }

  signup(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.$user.next(this.afAuth.auth.currentUser);
        localStorage.setItem('user', JSON.stringify(this.afAuth.auth.currentUser));
        this.setUserToRoom(this.afAuth.auth.currentUser.uid).then(() => this.router.navigateByUrl('/app'));
      });
  }

  logout() {
    return Promise.resolve().then(() => {
      localStorage.removeItem('user');
      return this.removeUserFromRoom(this.afAuth.auth.currentUser.uid).then(() => {
        this.$user.next(null);
        this.afAuth.auth.signOut();
        this.router.navigateByUrl('/auth');
      });
    });
  }

  getMessages() {
    return this.messages;
  }

  sendMessage(message: any) {
    return this.messages.push({
      createdAt: Date.now(),
      text: message,
      author: this.afAuth.auth.currentUser.uid
    });
  }

  deleteMessage(key: string) {
    this.messages.remove(key);
  }

  getOnlineUsers() {
    return this.onlineUsers;
  }

  setUserToRoom(uid) {
    return this.getUserData(uid).then((user) => this.onlineUsers.push(user));
  }

  removeUserFromRoom(uid) {
    return this.onlineUsers.remove(uid);
  }

  addUser(user) {
    // remake with this.user.push()
    return this.db.database.ref('users/' + user.uid).set(user);
  }

  usersCash = {};

  getUserData(uid): Promise<any> {
    if (!this.usersCash[uid]) {
      // remake with this.user.list()
      this.usersCash[uid] = Promise.resolve().then(() => {
        return this.db.database.ref('users/' + uid).once('value').then((snapshot) => snapshot.val());
      })
    }

    return this.usersCash[uid];
  }
}
