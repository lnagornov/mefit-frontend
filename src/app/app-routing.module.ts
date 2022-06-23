import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from "./guards/auth.guard";
import {DashboardPage} from './pages/dashboard/dashboard.page';
import {SetGoalPage} from "./pages/set-goal/set-goal.page";
import {HomePage} from "./pages/home/home.page";
import {WorkoutsPage} from "./pages/workouts/workouts.page";


const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/home",
  },
  {
    //Base URL needs to be set
    //Auth guard
    path: "dashboard",
    component: DashboardPage,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [ AuthGuard ],
  },
  {
    path: "set-goal",
    component: SetGoalPage,
    canActivate: [ AuthGuard ],
  },
  {
    path: "home",
    component: HomePage
  },
  {
    path: "workouts/:workoutId",
    component: WorkoutsPage,
    canActivate: [ AuthGuard ], 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
