import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideRoutes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

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
export function tokenGetter() {
  return localStorage.getItem('access_token');
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
    EventfullComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [''],
        blacklistedRoutes: ['']
      }
    })],
  providers: [EventService,
              IgralisteService,
              DvoranaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
