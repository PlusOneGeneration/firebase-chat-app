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
        this.setUserToRoom(this.afAuth.auth.currentUser.uid)
          .then((user) => {
            if (!user) {
              console.log('User not found. Logout');
              return this.logout();
            }

            this.router.navigateByUrl('/app')
          });
      });
  }

  logout() {
    return Promise.resolve().then(() => {
      localStorage.removeItem('user');
      return this.removeUserFromRoom(this.afAuth.auth.currentUser.uid)
        .then(() => {
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

  setUserToRoom(uid): Promise<any> {
    return this.getUserData(uid)
      .then((user) => {
        if (!user) {
          return null;
        }

        return this.setOnlineUser(user)
          .then(() => user);
      });
  }

  getOnlineUser(uid): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.object('/room/online/' + uid).subscribe((user) => {
        if (!user) {
          return resolve(null);
        }

        return resolve(user)
      }, reject);
    });
  }

  setOnlineUser(user) {
    return this.db.object('/room/online/' + user.uid).set(user);
  }

  removeUserFromRoom(uid) {
    return this.onlineUsers.remove(uid);
  }

  addUser(user) {
    return this.db.object('/users/' + user.uid).set(user);
  }

  usersCache = {};

  getUserData(uid): Promise<any> {
    if (!this.usersCache[uid]) {
      this.usersCache[uid] = Promise.resolve().then(() => {
        return new Promise((resolve, reject) => {
          this.db.object('/users/' + uid).subscribe((user) => {
            if (!user) {
              return resolve(null);
            }

            return resolve(user)
          }, reject);
        });
      });
    }

    return this.usersCache[uid];
  }

  banUser(user: any) {
    return this.db.object('/room/bannedUsers/' + user.uid).set(user);
  }

  unBanUser(user: any) {
    return this.db.object('/room/bannedUsers/' + user.uid).remove();
  }
}
