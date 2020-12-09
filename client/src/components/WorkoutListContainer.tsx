import React from 'react';
import { useWorkoutData } from '../hooks/useWorkoutData';
import { TextButton } from './TextButton';
import { NewWorkoutDialog } from './NewWorkoutDialog';
import { Reminder } from './Reminder';
import { WorkoutList } from './WorkoutList';
import axios from 'axios';
import { Title } from './Title'
import '../styles/workouts.scss'

export const WorkoutListContainer = ():React.ReactElement => {
  
  const { state, dispatch } = useWorkoutData();
  const [open, setOpen] = React.useState(false);

  const hasWorkouts = state.workouts.length !== 0;
  
  const openDialog = () => {
    setOpen(!open);
  }
    
  const changeState = (value:string) => {

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const workout_date = yyyy + '-' + mm + '-' + dd;

    const workout = {
      user_id: state.user_id,
      workout_name: value,
      workout_date,
    }
    
    axios.post('/api/workouts', workout).then((res) => {

      const workout = {
        id: res.data.workout.id,
        name: res.data.workout.workout_name,
        exercises: []
      }
      dispatch({type:"ADD_WORKOUT", workout});
      }).catch(err => console.log(err))
    }
    
  return(
    <>
    <Title text={'WORKOUTS'} />
    {/* reminder is just a notification you have no workouts */}
    { hasWorkouts ? <WorkoutList workouts={state.workouts} dispatch={dispatch} /> : <Reminder/> }
    <div className='add-new-workout-btn'>
      <TextButton 
        text='Add New Workout' 
        onClick={openDialog}
      />
    </div>
    {/* the popup for new workout */}
    <NewWorkoutDialog 
      open={open}
      onClick={openDialog}
      changeState={changeState}
      userId={state.user_id}
    />
    </>
  )
}