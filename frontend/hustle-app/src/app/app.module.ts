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
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { StartpageComponent } from './Components/startpage/startpage.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { EventService } from './services/eventService';
import { LoginService } from "./services/login.service";
import { SportService } from "./services/sportService";
import { UserService } from "./services/userService";
import { VenueService } from "./services/venueService";
import { ImageService } from "./services/imageService";
import { CreateEventComponent } from './Components/create-event/create-event.component';
import { EventViewComponent } from './Components/event-view/event-view.component';
import { VenuesViewComponent } from './Components/venues-view/venues-view.component';
import { FavoriteViewComponent } from './Components/favorite-view/favorite-view.component';
export function tokenGetter() {
  return JSON.parse(localStorage.getItem('currentUser')).token;
}

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    StartpageComponent,
    ProfileComponent,
    CreateEventComponent,
    EventViewComponent,
    VenuesViewComponent,
    FavoriteViewComponent
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
  providers: [
    EventService,
    LoginService,
    SportService,
    VenueService,
    UserService,
    ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
