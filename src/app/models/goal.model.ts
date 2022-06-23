import {Workout} from "./workout.model";


export interface Goal {
  id: number,
  isAchieved: boolean,
  endDate: string,
  workouts: Workout[],
  programId: number,
}

export interface CreateGoal {
  endDate: string,
  programId: number,
  profileId: number,
}
