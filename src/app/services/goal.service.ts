import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import {NgToastService} from "ng-angular-popup";

import {CreateGoal, Goal} from "../models/goal.model";
import {environment} from "../../environments/environment";
import {ProgramService} from "./program.service";
import {Profile} from "../models/profile.model";
import {ProfileService} from "./profile.service";
import {GoalWorkout} from "../models/workout.model";
import {Exercise} from "../models/exercise.model";
import {Observable} from "rxjs";


const {backend_api_url_goals} = environment;

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private _goals: Goal[] = [];
  private _currentGoal?: Goal;
  private _error: string = "";
  private _loading: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly toast: NgToastService,
    private readonly programService: ProgramService,
    private readonly profileService: ProfileService,
  ) {
  }

  get goals(): Goal[] {
    return this._goals;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  get currentGoal(): Goal | undefined {
    return this._currentGoal;
  }

  set currentGoal(goal: Goal | undefined) {
    this._currentGoal = goal;
  }

  setUserGoalByProgramId(programId: number | undefined, profileId: number | undefined) {
    if (this._loading) {
      return;
    }

    if (programId === undefined || profileId === undefined) {
      return;
    }

    this._loading = true;

    // EndDate is a current day + 7 days
    const newEndDate = new Date();
    newEndDate.setDate(newEndDate.getDate() + 7);

    const newGoalBody: CreateGoal = {
      endDate: newEndDate.toISOString().slice(0, 10),
      programId: programId,
      profileId: profileId,
    }

    this.http.post<Goal>(
      environment.backend_api_url_goals,
      newGoalBody,
    ).subscribe({
      next: (goal: Goal) => {
        console.log("response from backend - new goal: ", goal);
        this._currentGoal = goal;
        this.profileService.profile!.goalId = goal.id;
        console.log("new current goal: ", this._currentGoal);
        this.router.navigateByUrl('/dashboard').then(() => {
          this.toast.info({summary: 'New goal is set', detail: 'Succeed', duration: 5000});
          window.scroll({top: 0, left: 0, behavior: 'smooth'});
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
      complete: () => {
        this._loading = false;
      },
    });
  }

  getGoalById(goalId: number) {
    if (this._loading) {
      return;
    }

    this._loading = true;

    return this.http.get<Goal>(environment.backend_api_url_goals + goalId).subscribe({
      next: (goal: Goal) => {
        this.currentGoal = goal;
        const programId = this.currentGoal.programId;

        if (programId === undefined || programId === null) {
          return;
        }
        this.programService.getProgramById(programId);
      },
      error: (error: HttpErrorResponse) => {
        console.log("dashboardPage getCurrentGoal() " + error.message);
        this._loading = false;
      },
      complete: () => {
        this._loading = false;
      },
    });
  }

  countFinishedWorkouts(): number {
    const goal = this._currentGoal;
    if (goal === undefined || goal.workouts === null) {
      return 0;
    }
    return goal.workouts.filter((workout) => workout.isCompleted).length;
  }

  getProgressPercentage(): number {
    const goal = this._currentGoal;
    if (goal === undefined || goal.workouts === null) {
      return 0;
    }
    if (goal.workouts.length < 1) {
      return 0;
    }
    return this.countFinishedWorkouts() / goal.workouts.length;
  }

  calculateProgressStyle(): number {
    let currentPercentage = this.getProgressPercentage();
    if (currentPercentage < 0.1) {
      return 10;
    }
    return currentPercentage * 100;
  }

  initializeCurrentGoal(profile: Profile): void {
    // Fetch goal by goal ID
    if (profile?.goalId === undefined || profile?.goalId === null) {
      this.toast.info({detail: "Welcome to Mefit", summary: "Please set your goal.", duration: 5000});
      this.router.navigateByUrl("/set-goal").then(
        () => window.scroll({top: 0, left: 0, behavior: 'smooth'})
      );
      return;
    }
    this.getGoalById(profile.goalId);
    console.log("User have addressId and fitnessAttributesId", profile);
    this.router.navigateByUrl("/dashboard").then(
      () => window.scroll({top: 0, left: 0, behavior: 'smooth'})
    );
  }

  completeWorkout(workoutId: number | undefined): void {
    if (this._loading) {
      return;
    }

    if (workoutId === undefined) {
      console.log("Workout ID is undefined.")
      return;
    }

    const goalId = this._currentGoal?.id;
    const endDate = this._currentGoal?.endDate;
    if (goalId === undefined || endDate === undefined) {
      return;
    }

    this._loading = true
    const newGoalWorkout: GoalWorkout = {
      id: 0,  // fake id, id is setting on the backend
      endDate: endDate,
      isCompleted: true,
      goalId: goalId,
      workoutId: workoutId,
    }
    this.http.put<GoalWorkout>(
      environment.backend_api_url_goals + goalId + "/workouts/" + workoutId,
      newGoalWorkout).subscribe({
      next: () => {
        this._currentGoal?.workouts.forEach(w => w.id == workoutId ? w.isCompleted = true : "");
        this.congratulateOnComplete(this.getProgressPercentage());
      },
      error: (error: HttpErrorResponse) => {
        console.log("dashboardPage getCurrentGoal() " + error.message);
      },
      complete: () => {
        this._loading = false;
      },
    });
  }

  getMotivationMessage(completedRatio: number): string {
    if (completedRatio == 0) {
      return "Let's start the challenge!";
    } else if (completedRatio < 0.5) {
      return "Great start! You can do it!";
    } else if (completedRatio > 0.5 && completedRatio < 1) {
      return "You are almost there, keep it going!";
    } else {
      return "Congratulation! You've finished the goal!";
    }
  }

  congratulateOnComplete(completedRatio: number) {
    if (completedRatio >= 1) {
      this.toast.success({detail: "Hooray!", summary: "You have reached the goal!", duration: 5000});
    }
  }

  getExercisesByWorkoutId(workoutId: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(environment.backend_api_url_exercises + workoutId);
  }
}
