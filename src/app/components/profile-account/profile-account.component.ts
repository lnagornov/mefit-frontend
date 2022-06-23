import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

import {ProfileService} from "../../services/profile.service";
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.scss']
})
export class ProfileAccountComponent implements OnInit {

  accountForm!: FormGroup;
  keycloakProfile: KeycloakProfile | null = null;
  changeProfileLink: string = environment.auth_api_url_user_profile;

  constructor(
    private readonly profileService: ProfileService,
    private readonly keycloakService: KeycloakService,
    private readonly http: HttpClient,
    private readonly formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.keycloakService.loadUserProfile().then((profile) => {
      this.keycloakProfile = profile;
      this.initializeForm();
      this.accountForm.get('username')?.disable();
      this.accountForm.get('firstName')?.disable();
      this.accountForm.get('lastName')?.disable();
      this.accountForm.get('email')?.disable();
    });
  }

  initializeForm(): void {
    this.accountForm = this.formBuilder.group({
      firstName: [this.keycloakProfile?.firstName],
      lastName: [this.keycloakProfile?.lastName],
      email: [this.keycloakProfile?.email],
      username: [this.keycloakProfile?.username]
    });
  }

  get username() {
    return this.accountForm.get('username');
  }

  get firstName() {
    return this.accountForm.get('firstName');
  }

  get lastName() {
    return this.accountForm.get('lastName');
  }

  get email() {
    return this.accountForm.get('email');
  }
}

