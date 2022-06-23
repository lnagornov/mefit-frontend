export interface Workout {
  id: number,
  endDate: string,
  isCompleted: boolean,
  name: string,
  type: string,
  numberOfExercises: number,
}

export interface GoalWorkout {
  id: number,
  endDate: string,
  isCompleted: boolean,
  goalId: number,
  workoutId: number,
}
