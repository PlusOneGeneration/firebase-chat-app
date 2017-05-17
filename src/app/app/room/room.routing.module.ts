import { Routes, RouterModule} from "@angular/router";
import { NgModule} from "@angular/core";
import { RoomComponent} from "./room.component";
import { RoomResolver} from "./room.resolver";
import { RoomCanActivate} from "./room.canActivate";

export const roomRoutes: Routes = [
  {
    path: 'room',
    component: RoomComponent,
    data: { title: 'Room' },
    canActivate: [RoomCanActivate],
    children: []
  },
  { path: '',
    redirectTo: 'room',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: 'room'}
];

@NgModule({
  imports: [
    RouterModule.forChild(roomRoutes)
  ],
  providers: [RoomResolver, RoomCanActivate],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
