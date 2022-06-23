import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

import {NgToastService} from "ng-angular-popup";

import {Exercise} from "../../models/exercise.model";
import {GoalService} from "../../services/goal.service";


@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss']
})
export class WorkoutsPage implements OnInit {

  exercises: Exercise[] = [];
  loading: boolean = false;
  workoutId?: number | undefined | null;

  constructor(
    private readonly router: ActivatedRoute,
    private readonly goalService: GoalService,
    private readonly toast: NgToastService,
  ) {
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.workoutId = Number(params.get('workoutId'));
      if (this.workoutId === null) {
        this.toast.error({detail: "Error", summary: "Workout doesn't exist", duration: 5000});
        return;
      }
      this.loading = true;
      this.goalService.getExercisesByWorkoutId(this.workoutId).subscribe({
        next: (exercises: Exercise[]) => {
          this.exercises = exercises;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
          this.toast.error({detail: "Error", summary: "Can't load workout", duration: 5000});
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    });
    // this.loading = false;
  }
}
