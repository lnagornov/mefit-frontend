import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {NgToastService} from "ng-angular-popup";

import {ProfileService} from "../../services/profile.service";
import {DetailedProfile} from "../../models/detailed-profile.model";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-profile-fitness-attributes',
  templateUrl: './profile-fitness-attributes.component.html',
  styleUrls: ['./profile-fitness-attributes.component.scss']
})
export class ProfileFitnessAttributesComponent {

  saving: boolean = false;
  fitnessAttributesForm!: FormGroup;

  get userDetailedProfile(): DetailedProfile | undefined {
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
    const numRegex = /^-?\d*[.,]?\d{0,4}$/;

    this.fitnessAttributesForm = this.formBuilder.group({
      weight: [
        this.userDetailedProfile?.weight,
        [
          Validators.required,
          Validators.pattern(numRegex),
        ]
      ],
      height: [
        this.userDetailedProfile?.height,
        [
          Validators.required,
          Validators.pattern(numRegex),
        ]
      ],
      medicalConditions: [this.userDetailedProfile?.medicalConditions],
      disabilities: [this.userDetailedProfile?.disabilities],
    });
    console.log(this.fitnessAttributesForm.value);
  }

  onSubmit() {
    this.saving = true;
    const fitnessAttributeId = this.profileService.profile?.fitnessAttributesId;
    if (fitnessAttributeId === undefined) {
      console.log("Profile-fitness-attributes.component.ts onSubmit() - has no fitnessAttributeId");
      return;
    }
    const newFitnessAttributes = {
      id: fitnessAttributeId,
      weight: this.fitnessAttributesForm.value["weight"],
      height: this.fitnessAttributesForm.value["height"],
      medicalConditions: [],
      disabilities: [],
    };
    this.profileService.updateFitnessAttributes(fitnessAttributeId, newFitnessAttributes).subscribe(
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
