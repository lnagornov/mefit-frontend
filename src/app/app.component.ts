import {Component, OnInit} from '@angular/core';

import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';

import {LoginService} from './services/login.service';
import {NgToastService} from "ng-angular-popup";
import {Profile} from "./models/profile.model";
import {Router} from "@angular/router";
import {ProfileService} from "./services/profile.service";
import {HttpErrorResponse} from "@angular/common/http";
import {GoalService} from "./services/goal.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  public title = 'MeFit';
  public isLoggedIn = false;
  public keycloakProfile: KeycloakProfile | null = null;
  private _loading: boolean = false;

  constructor(
    public readonly router: Router,
    public readonly keycloak: KeycloakService,
    private readonly loginService: LoginService,
    private readonly profileService: ProfileService,
    private readonly toast: NgToastService,
    private readonly goalService: GoalService,
  ) {
  }

  get loading(): boolean {
    return this._loading;
  }

  public async ngOnInit() {
    // Keycloak login
    this._loading = true;
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    // User is logged in
    if (this.isLoggedIn) {
      this.keycloakProfile = await this.keycloak.loadUserProfile();

      // Login to backend
      this.loginService.login(this.keycloakProfile.id).subscribe({
        next: (profile: Profile | undefined) => {
          this.profileService.profile = profile;
          if (profile === undefined) {
            this.toast.error({detail: "Sorry, server is not responding.", summary: "Please try later", duration: 2000});
            return;
          }

          this.goalService.initializeCurrentGoal(profile);

          // CHECK CONTENTS OF PROFILE TO REDIRECT
          if (profile?.addressId == null || profile.fitnessAttributesId == null) {
            //REDIRECT HERE TO PROFILE CREATION
          } else {
            // REDIRECT TO DASHBOARD
          }
        },
        error: () => {
          console.log('Initial Login failed. Backend login error.')
        },
      })
    }
    this._loading = false;
  }

  public async login() {
    this._loading = true;
    await this.keycloak.login().catch((error: HttpErrorResponse) => {
      this.toast.error({
        detail: "Error",
        summary: "Auth service doesn't respond, please contact to administration",
        duration: 2000
      })
    });
    this._loading = true;
  }

  public async logout() {
    if (await this.keycloak.isLoggedIn()) {
      await this.router.navigateByUrl("/home")
      await this.keycloak.logout();
      this.profileService.profile = undefined;
    }
    this.toast.warning({
      detail: "Can't log out",
      summary: "Please sign in first",
      duration: 2000
    })
  }
}
