import { Routes, RouterModule} from "@angular/router";
import { NgModule} from "@angular/core";
import { AuthComponent} from "./auth.component";
import { AuthCanActivate} from "./auth.canActivate";

export const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    data: { title: 'Auth' },
    canActivate: [AuthCanActivate]
  },
  { path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  // { path: '**', redirectTo: 'auth'}
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  providers: [AuthCanActivate],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
