import {Component, OnInit} from '@angular/core';

import {ProfileService} from "../../services/profile.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {

  get error(): string {
    return this.profileService.error;
  }

  get loading(): boolean {
    return this.profileService.loading;
  }

  constructor(
    private readonly profileService: ProfileService,
  ) {
  }

  ngOnInit(): void {
    const currentUserId = this.profileService.profile?.keycloakId;
    this.profileService.getDetailedProfileByUserId(currentUserId);
  }
}
