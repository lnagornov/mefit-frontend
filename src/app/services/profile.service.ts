import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import {NgToastService} from "ng-angular-popup";

import {environment} from "../../environments/environment";
import {StorageUtil} from "../utils/storage.util";
import {Profile} from "../models/profile.model";
import {DetailedProfile} from "../models/detailed-profile.model";
import {StorageKeys} from "../utils/storage-key.util";
import {FitnessAttribute} from "../models/fitness-attribute.model";
import {Observable} from "rxjs";
import {Address} from "../models/address.model";



@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _detailedProfile?: DetailedProfile;
  private _error: string = "";
  private _loading: boolean = false
  private _profile?: Profile;

  get profile(): Profile | undefined {
    return this._profile;
  }
  set profile(profile: Profile | undefined) {
    StorageUtil.storageSave<Profile>(StorageKeys.User, profile!);
    this._profile = profile;
  }

  get detailedProfile(): DetailedProfile | undefined {
    return this._detailedProfile;
  }

  set detailedProfile(detailedProfile: DetailedProfile | undefined) {
    this._detailedProfile = detailedProfile;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private readonly http: HttpClient,
    private toast: NgToastService,
  ) {
    this._profile = StorageUtil.storageRead<Profile>(StorageKeys.User);
  }

  getDetailedProfileByUserId(userId: string | undefined) {
    if (this._loading) {
      return;
    }

    if (userId === undefined) {
      return;
    }

    this._loading = true;

    this.http.get<DetailedProfile>(environment.backend_api_url_profiles + userId).subscribe({
      next: (detailedProfile: DetailedProfile) => {
        this._detailedProfile = { ...detailedProfile };
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this._error = error.message;
      },
      complete: () => {
        this._loading = false;
      },
    });
  }

  updateFitnessAttributes(fitnessAttributeId: number, newFitnessAttributes: FitnessAttribute): Observable<any> {
    return this.http.put<FitnessAttribute>(
      environment.backend_api_url_fitness_attributes + fitnessAttributeId,
      newFitnessAttributes);
  }

  updateAddresses(addressId: number, newAddresses: Address): Observable<any> {
    return this.http.put<Address>(
      environment.backend_api_url_addresses + addressId,
      newAddresses);
  }
}
