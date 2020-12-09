import React, {useState} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { IWorkout } from '../types/workoutType';
import Collapse from '@material-ui/core/Collapse';
import { WorkoutListItem } from './WorkoutListItem';
import { Redirect } from 'react-router-dom';
import { TextButton } from './TextButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100vw',
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    resize: {
      fontSize: '1.2rem',
    }
  }),
);

export const WorkoutList = (
  props:{workouts:IWorkout[], 
    dispatch:(action:any)=>void}):React.ReactElement => {
  
  const classes = useStyles();
  const [selectedWorkoutID, setSelectedWorkoutID] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const [workoutID, setWorkoutID] = useState(0);

  const handleClick = (workoutID:number) => {
    if(workoutID === selectedWorkoutID){
      setSelectedWorkoutID(0)
    } else{
      setSelectedWorkoutID(workoutID)
    }
  };

  const onChange = (selectedWorkoutID:number) => {
    setWorkoutID(selectedWorkoutID);
    setRedirect(true);
  }

  return (
    <>
    {
      redirect ? <Redirect to={{pathname: '/exercise', state: {workoutID}}} /> :
      props.workouts.map(workout => (
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          // subheader={
          //   <ListSubheader component="div" id="nested-list-subheader">
          //     {workout.name}
          //   </ListSubheader>
          // }
          className={classes.root}
          key={workout.id}
        > 
          <ListItem button onClick={() => handleClick(workout.id)}>
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText classes={{primary:classes.resize}} primary={workout.name} />
            {workout.id === selectedWorkoutID ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          {workout.exercises.length ? <List component="div" disablePadding>
              {
                workout.exercises.map((exercise, index) => {
                  return (
                    <Collapse 
                      in={workout.id === selectedWorkoutID} 
                      timeout="auto" 
                      unmountOnExit
                      key={index}
                    >
                    <WorkoutListItem 
                      name={exercise.exercise_name}
                      id={exercise.id}
                      index={index}
                      key={exercise.id}
                      deletable={true}
                      workoutID={workout.id}
                      dispatch={props.dispatch}
                    />
                   </Collapse>
                  )})
              }
            </List> : <ListItemText primary={`Haven't add any exercises yet.`} />}
            
          <TextButton  
            onClick={() => onChange(workout.id)}
            text='ADD EXERCISE' 
          />
        </List>
      ))
    }
    </>
  );
}