import {Component, OnInit} from '@angular/core';

import {ProgramService} from "../../services/program.service";
import {Program} from "../../models/program.model";
import {ProfileService} from "../../services/profile.service";


@Component({
  selector: 'app-set-goal',
  templateUrl: './set-goal.page.html',
  styleUrls: ['./set-goal.page.scss']
})
export class SetGoalPage implements OnInit {

  constructor(
    private readonly programService: ProgramService,
    private readonly profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.programService.getAllPrograms();
  }

  get profileId(): number | undefined {
    return this.profileService.profile?.id;
  }

  get programs(): Program[] {
    return this.programService.programs;
  }
  get error(): string {
    return this.programService.error;
  }
  get loading(): boolean {
    return this.programService.loading;
  }
}
