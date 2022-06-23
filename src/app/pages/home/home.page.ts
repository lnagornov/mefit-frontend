import {Component} from '@angular/core';

import {KeycloakService} from "keycloak-angular";


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  constructor(
    public readonly keycloak: KeycloakService,
  ) {
  }

  async startJourney() {
    if (!await this.keycloak.isLoggedIn()) {
      await this.keycloak.login();
    }
  }
}
