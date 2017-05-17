import {Component} from '@angular/core';
import {FirebaseService} from "./firebase/firebase.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: any;

  constructor(private firebaseService: FirebaseService,
              private router: Router) {
    this.firebaseService.$user.subscribe((user) => this.user = user);
  }

  logout() {
    this.firebaseService.logout().then(() => {
    console.log('>>>>> logout')
      this.router.navigateByUrl('/auth')
    });
  }
}
