export interface DetailedProfile {
  id: number,
  addressLine1: string,
  addressLine2: string,
  addressLine3: string,
  postalCode: string,
  city: string,
  country: string,

  weight: number,
  height: number,
  medicalConditions: string[],
  disabilities: string[],

  goalId: number,
  goalEndDate: string,
  isGoalAchieved: boolean,
  programId: number,
}
