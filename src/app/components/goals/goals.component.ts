import {Component, Input} from '@angular/core';

import {ProgramService} from "../../services/program.service";
import {GoalService} from "../../services/goal.service";


@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent {

  // @Input() goal?: Goal;
  @Input() styles?: string;
  // public styles?: string = `width: ${this.goalService.calculateProgressStyle()}%;`;

  constructor(
    public readonly goalService: GoalService,
    public readonly programService: ProgramService,
  ) {
  }

  getDaysLeft(endDate: string | undefined): number {
    if (!endDate) {
      return 0;
    }
    let startingDate: Date = new Date();
    let endingDate: Date = new Date(endDate);
    let timeInMilliSec: number = endingDate.getTime() - startingDate.getTime();

    return Math.ceil(timeInMilliSec / (1000 * 60 * 60 * 24));
  }


}
