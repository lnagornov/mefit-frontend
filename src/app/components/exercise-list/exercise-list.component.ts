import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {Exercise} from "../../models/exercise.model";
import {GoalService} from "../../services/goal.service";
import {ProgramService} from "../../services/program.service";


@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {

  @Input() exercises: Exercise[] = [];
  @Input() workoutId?: number | undefined | null;
  @Input() loading: boolean = false;
  workoutName?: string | undefined;
  programName?: string | undefined;

  constructor(
    private readonly goalService: GoalService,
    private readonly programService: ProgramService,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.programName = this.programService.currentProgram?.name;
    if (this.workoutId === undefined || this.workoutId === null) {
      return;
    }
    this.workoutName = this.goalService.currentGoal?.workouts
      .filter(w => w.id === this.workoutId)
      .pop()?.name;
  }

  completeWorkout(workoutId: number | undefined | null) {
    if (workoutId === undefined || workoutId === null) {
      return;
    }

    this.router.navigateByUrl("/dashboard").then(() => {
      this.goalService.completeWorkout(workoutId);
    })
  }
}
