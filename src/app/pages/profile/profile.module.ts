import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {ProfileRoutingModule} from "./profile-routing.module";
import {ProfilePage} from "./profile.page";
import {ProfileAccountComponent} from "../../components/profile-account/profile-account.component";
import {ProfileAddressesComponent} from "../../components/profile-addresses/profile-addresses.component";
import {ProfileMenuComponent} from "../../components/profile-menu/profile-menu.component";
import {
  ProfileFitnessAttributesComponent
} from "../../components/profile-fitness-attributes/profile-fitness-attributes.component";


@NgModule({
  imports: [
    ProfileRoutingModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ProfilePage,
    ProfileAccountComponent,
    ProfileAddressesComponent,
    ProfileFitnessAttributesComponent,
    ProfileMenuComponent,
  ]
})
export class ProfileModule {
}
