import {Component, Input} from '@angular/core';

import {Workout} from "../../models/workout.model";
import {ProgramService} from "../../services/program.service";


@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListComponent {
  @Input() workouts: Workout[] = [];

  constructor(
    public readonly programService: ProgramService,
  ) {
  }
}
