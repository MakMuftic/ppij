import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { WelcomeComponent} from "../Components/welcome/welcome.component";
import { StartpageComponent } from "../Components/startpage/startpage.component";
import { EventsComponent } from "../Components/events/events.component";
import { EventComponent } from "../Components/event/event.component";
import { ProfileComponent } from "../Components/profile/profile.component";
import { EventfullComponent } from "../Components/eventfull/eventfull.component";
const routes: Routes = [
  {
    path: "event/:id",
    component: EventfullComponent
  },
  {
    path : "startpage",
    component: StartpageComponent
  },
  {
    path: "events",
    component: EventsComponent
  },
  {
    path : "user/:username",
    component: ProfileComponent
  },
  {
    path : "**",
    component: WelcomeComponent
  }


]
@NgModule({
  imports: [[RouterModule.forRoot(routes)]],
  exports: [RouterModule]
})
export class RoutingModule {}
