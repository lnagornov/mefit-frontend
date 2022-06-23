import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

import {NgToastService} from "ng-angular-popup";
import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {

  constructor(
    protected readonly keycloakService: KeycloakService,
    protected override router: Router,
    private readonly toast: NgToastService,
  ) {
    super(router, keycloakService);
  }

  public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    if (this.authenticated) {
      return true;
    }

    this.toast.warning({detail:"Can't access",summary:'You must to log in first', duration: 2000});
    await this.router.navigateByUrl("/home");

    return false;
  }
}
