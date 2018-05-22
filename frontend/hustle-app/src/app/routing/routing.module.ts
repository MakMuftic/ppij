import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { WelcomeComponent} from "../Components/welcome/welcome.component";
import { StartpageComponent } from "../Components/startpage/startpage.component";
import { ProfileComponent } from "../Components/profile/profile.component";
const routes: Routes = [
  {
    path : "startpage",
    component: StartpageComponent
  },
  {
    path : "welcomepage",
    component: WelcomeComponent,
  },
  {
    path : "**",
    component: WelcomeComponent
  }

]
@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class RoutingModule {}
