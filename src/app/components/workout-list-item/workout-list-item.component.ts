import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {Workout} from "../../models/workout.model";
import {GoalService} from "../../services/goal.service";


@Component({
  selector: 'app-workout-list-item',
  templateUrl: './workout-list-item.component.html',
  styleUrls: ['./workout-list-item.component.scss']
})
export class WorkoutListItemComponent implements OnInit {

  @Input() workout?: Workout;
  @Input() workoutIndex: number | undefined;
  @Input() programName?: string;
  numberOfExercises: number = 0;

  constructor(
    public readonly goalService: GoalService,
    public readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.numberOfExercises = this.workout ? this.workout.numberOfExercises : 0;
  }

  async showWorkoutById(workoutId: number | undefined) {
    if (workoutId === undefined) {
      return;
    }
    await this.router.navigateByUrl("/workouts/" + workoutId);
  }
}
