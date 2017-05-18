import {Component} from '@angular/core';
import {FirebaseService} from "../firebase/firebase.service";
import {Router} from "@angular/router";

export class Form {
  email: string = '';
  password: string = '';
  gender?: string = '';
  name?: string = '';

  reset() {
    this.email = '';
    this.password = '';
    this.gender = '';
    this.name = '';
  }
}

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  title = 'Auth works!';
  tab: string = 'login';
  form: Form = new Form();

  constructor(private firebaseService: FirebaseService) {
    this.form = new Form();
  }

  toggleTab() {
    if (this.tab === 'signup') {
      this.tab = 'login';
    } else {
      this.tab = 'signup';
    }

    this.form.reset();
  }

  login() {
    this.firebaseService.login(this.form.email, this.form.password);
  }

  signup() {
    this.firebaseService.signup(this.form.email, this.form.password)
      .then((res) => {
        let data = {
          email: this.form.email,
          gender: this.form.gender,
          name: this.form.name,
          uid: res.uid
        };

        return this.firebaseService.addUser(data);
      })
      .then(() => this.tab = 'login');
  }
}
