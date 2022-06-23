import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProfilePage} from "./profile.page";
import {ProfileAccountComponent} from "../../components/profile-account/profile-account.component";
import {ProfileAddressesComponent} from "../../components/profile-addresses/profile-addresses.component";
import {
  ProfileFitnessAttributesComponent
} from "../../components/profile-fitness-attributes/profile-fitness-attributes.component";
import {AuthGuard} from "../../guards/auth.guard";


const routes: Routes = [
  {
    path: 'profile',
    component: ProfilePage,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: 'account',
        component: ProfileAccountComponent
      },
      {
        path: 'addresses',
        component: ProfileAddressesComponent
      },
      {
        path: 'fitness-attributes',
        component: ProfileFitnessAttributesComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
