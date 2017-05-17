import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {AppResolver} from "./app.resolver";
import {AppCanActivate} from "./app.canActivate";
import {roomRoutes} from "./room/room.routing.module";

export const appRoutes: Routes = [
  {
    path: 'app',
    component: AppComponent,
    data: {title: 'App'},
    canActivate: [AppCanActivate],
    children: [
      ...roomRoutes
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  providers: [AppResolver],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
