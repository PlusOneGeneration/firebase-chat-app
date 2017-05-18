import {Injectable} from "@angular/core";
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable, BehaviorSubject} from "rxjs";
import {FirebaseService} from "../firebase/firebase.service";

@Injectable()
export class AppCanActivate implements CanActivate, CanActivateChild {
  constructor(private firebaseService: FirebaseService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    let user = JSON.parse(localStorage.getItem('user')) || this.firebaseService.afAuth.auth.currentUser;

    if (!user) {
      this.router.navigateByUrl('/auth');
      return false;
    } else {
      return true;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.canActivate(childRoute, state);
  }
}
