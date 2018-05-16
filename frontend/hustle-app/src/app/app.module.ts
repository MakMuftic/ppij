import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { provideRoutes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoutingModule } from "./routing/routing.module";
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { StartpageComponent } from './Components/startpage/startpage.component';
import { EventsComponent } from './Components/events/events.component';
import { EventComponent } from './Components/event/event.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { EventListComponent } from './Components/event-list/event-list.component';
import { EventfullComponent } from './Components/eventfull/eventfull.component';
import { EventService } from './services/eventService';
import { IgralisteService } from "./services/igralisteService";
import { DvoranaService } from "./services/dvoranaService";
import { LoginService } from "./services/login.service";
import { SportlistComponent } from './Components/sportlist/sportlist.component';
import { SportService } from "./services/sportService";
import { UserService } from "./services/userService";
import { VenueService } from "./services/venueService";
import { ImageService } from "./services/imageService";
export function tokenGetter() {
  return JSON.parse(localStorage.getItem('currentUser')).token;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    StartpageComponent,
    EventsComponent,
    EventComponent,
    ProfileComponent,
    EventListComponent,
    EventfullComponent,
    SportlistComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [''],
        blacklistedRoutes: ['']
      }
    })],
  providers: [EventService,
              IgralisteService,
              DvoranaService,
            LoginService,
          SportService,
        VenueService,
      UserService,
    ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
