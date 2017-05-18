import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {FirebaseService} from "../firebase/firebase.service";

@Injectable()
export class AuthCanActivate implements CanActivate {
  constructor(private firebaseService:FirebaseService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    let user = JSON.parse(localStorage.getItem('user')) || this.firebaseService.afAuth.auth.currentUser;

    if (user) {
      this.router.navigateByUrl('/app');
      return false;
    } else {
      return true;
    }
  }
}
