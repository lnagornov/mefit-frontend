import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {FullCalendarModule} from '@fullcalendar/angular'; // must go before calendar plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a calendar plugin!
import interactionPlugin from '@fullcalendar/interaction';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {NgToastModule} from "ng-angular-popup";

import {HttpTokenInterceptor} from "./interceptors/http.token.interceptor";
import {AppRoutingModule} from './app-routing.module';
import {ProfileModule} from "./pages/profile/profile.module";
import {DashboardPage} from './pages/dashboard/dashboard.page';
import {SetGoalPage} from './pages/set-goal/set-goal.page';
import {HomePage} from './pages/home/home.page';
import {WorkoutsPage} from './pages/workouts/workouts.page';
import {AppComponent} from './app.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {GoalsComponent} from './components/goals/goals.component';
import {ProgramListComponent} from './components/program-list/program-list.component';
import {ProgramListItemComponent} from './components/program-list-item/program-list-item.component';
import {CardButtonComponent} from './components/card-button/card-button.component';
import {WorkoutListComponent} from './components/workout-list/workout-list.component';
import {WorkoutListItemComponent} from './components/workout-list-item/workout-list-item.component';
import {ExerciseListComponent} from './components/exercise-list/exercise-list.component';
import {ExerciseListItemComponent} from './components/exercise-list-item/exercise-list-item.component'; // a calendar plugin!


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        realm: 'mefit',
        url: 'https://mefit-auth.herokuapp.com/auth',
        clientId: 'mefit-angular-app',
      },
      initOptions: {
        checkLoginIframe: false,
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardPage,
    CalendarComponent,
    GoalsComponent,
    ProgramListComponent,
    ProgramListItemComponent,
    SetGoalPage,
    CardButtonComponent,
    HomePage,
    WorkoutListComponent,
    WorkoutListItemComponent,
    WorkoutsPage,
    ExerciseListComponent,
    ExerciseListItemComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule, // register FullCalendar with you app
    ProfileModule,
    HttpClientModule,
    NgToastModule,
    KeycloakAngularModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true},
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
