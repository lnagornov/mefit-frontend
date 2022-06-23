import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {NgToastService} from "ng-angular-popup";

import {ProfileService} from "../../services/profile.service";
import {DetailedProfile} from "../../models/detailed-profile.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Address} from "../../models/address.model";


@Component({
  selector: 'app-profile-addresses',
  templateUrl: './profile-addresses.component.html',
  styleUrls: ['./profile-addresses.component.scss']
})
export class ProfileAddressesComponent {

  saving: boolean = false;
  addressesForm!: FormGroup;

  get detailedProfile(): DetailedProfile | undefined {
    return this.profileService.detailedProfile;
  }

  constructor(
    private readonly profileService: ProfileService,
    private readonly formBuilder: FormBuilder,
    private readonly toast: NgToastService,
  ) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addressesForm = this.formBuilder.group({
      addressLine1: [
        this.detailedProfile?.addressLine1,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]
      ],
      addressLine2: [
        this.detailedProfile?.addressLine2,
        [
          Validators.maxLength(50),
        ]
      ],
      addressLine3: [
        this.detailedProfile?.addressLine3,
        [
          Validators.maxLength(50),
        ]
      ],
      postalCode: [
        this.detailedProfile?.postalCode,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ]
      ],
      city: [
        this.detailedProfile?.city,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(58),
        ]
      ],
      country: [
        this.detailedProfile?.country,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]
      ],
    });
  }

  onSubmit() {
    this.saving = true;
    const addressId = this.profileService.profile?.addressId;
    if (addressId === undefined) {
      console.log("Profile-addresses.component.ts onSubmit() - has no addressId");
      return;
    }
    const newAddresses: Address = {
      id: addressId,
      addressLine1: this.addressesForm.value['addressLine1'],
      addressLine2: this.addressesForm.value['addressLine2'],
      addressLine3: this.addressesForm.value['addressLine3'],
      postalCode: this.addressesForm.value['postalCode'],
      city: this.addressesForm.value['city'],
      country: this.addressesForm.value['country'],
    };
    this.profileService.updateAddresses(addressId, newAddresses).subscribe(
      {
        next: () => {
          this.toast.success({detail: "Success", summary: 'Changes have been successfully saved!', duration: 5000});
          const currentUserId = this.profileService.profile?.keycloakId;
          this.profileService.getDetailedProfileByUserId(currentUserId);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
          this.toast.error({detail: "Error", summary: 'Cant save it, try again later...', duration: 5000});
        },
        complete: () => {
          this.saving = false;
        },
      }
    );
  }
}
