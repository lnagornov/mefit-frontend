import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, map} from 'rxjs';

import {environment} from 'src/environments/environment';
import {Profile} from "../models/profile.model";
import {ProfileService} from "./profile.service";


const {backend_api_url} = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private readonly http: HttpClient,
    private readonly profileService: ProfileService,
  ) {
  }

  public login(userId: string | undefined): Observable<Profile | undefined> {
    return this.http.get<Profile>(`${backend_api_url}/login/${userId}`)
      .pipe(
        map((response: Profile) => {
          return response;
        })
      )
      .pipe();
  }
}
