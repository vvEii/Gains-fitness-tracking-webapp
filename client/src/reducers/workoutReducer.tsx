import { State, IWorkout } from '../types/workoutType';
import { IExercise } from '../types/exercisesType';

const ADD_WORKOUT = "ADD_WORKOUT";
const SET_EXERCISES = "SET_EXERCISES";
const SET_WORKOUTS = "SET_WORKOUTS";
const DELETE_EXERCISE = "DELETE_EXERCISE"
// specifies child subtypes based on parent type ie:set exercises will have exercises of type IExercise...
type Action = 
  | { type: "SET_EXERCISES", exercises: IExercise[], workout_id: number }
  | { type: "SET_WORKOUTS", workouts: IWorkout[] }
  | { type: "ADD_WORKOUT", workout: IWorkout}
  | { type: "DELETE_EXERCISE", workoutID:number, exerciseID:number}
// how reducer is defined
export const workoutReducer = (state: State, action: Action):State => {
  let workouts = [];
  switch(action.type){
    case SET_EXERCISES:
      workouts = state.workouts.map(workout => {
        if(workout.id !== action.workout_id){
          return workout
        }
        return {
          ...workout,
          ...action.exercises
        }
      })
      return {
        ...state,
        workouts
      }
    case ADD_WORKOUT:
      workouts = [...state.workouts];
      workouts.push(action.workout);
      return {
        ...state,
        workouts
      }
    case SET_WORKOUTS:
      return {
        ...state,
        workouts: action.workouts
      }

    case DELETE_EXERCISE:
      workouts = state.workouts.map(workout => {
        if (workout.id === action.workoutID){
          const exercises = workout.exercises.filter(exercise => 
            exercise.id !== action.exerciseID)
          const changedWorkout = {
            ...workout,
            exercises
          }
          return changedWorkout
        } 
        return workout
      })
      
      return {
        ...state,
        workouts
      }
      
    default:
      // this will give you a type error 
      // throw new Error(`Tried to reduce with unsupported action type:  ${action.type}`);
      throw new Error('Tried to reduce with unsupported action type');
  }
}

export { SET_WORKOUTS };