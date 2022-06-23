import {Component, OnInit} from '@angular/core';

import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

import {GoalService} from "../../services/goal.service";
import {ProfileService} from "../../services/profile.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {

  keycloakProfile: KeycloakProfile | null = null;
  public firstName?: string;

  constructor(
    private keycloakService: KeycloakService,
    public goalService: GoalService,
    private profileService: ProfileService,
  ) {
  }

  ngOnInit() {
    this.keycloakService.loadUserProfile().then((profile) => {
      this.keycloakProfile = profile;
      this.firstName = this.keycloakProfile?.firstName;
    });
    if (this.profileService.profile === undefined) {
      return;
    }
    this.goalService.initializeCurrentGoal(this.profileService.profile);
  }

  get loading(): boolean {
    return this.goalService.loading;
  }
}
