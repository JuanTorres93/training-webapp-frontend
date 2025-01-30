import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { selectExercisesError } from '../../features/exercises/exercisesSlice';
import { selectUserError } from '../../features/user/userSlice';
import { selectWeightHasError } from '../../features/weights/weightSlice';
import { selectWorkoutsError } from '../../features/workouts/workoutSlice';
import { selectTemplatesError } from '../../features/workoutsTemplates/workoutTemplatesSlice';

import ExtendSessionOptionOrCancel from '../popupOptionOrCancel/ExtendSessionPopupOptionOrCancel';
import ExpiredSessionOptionOrCancel from '../popupOptionOrCancel/ExpiredSessionPopupOptionOrCancel';
import ErrorFlashMessage from '../flashMessage/ErrorFlashMessage';

const GlobalUserMessagesManager = ({ children }) => {
  const exercisesError = useSelector(selectExercisesError);
  const userError = useSelector(selectUserError);
  const weightError = useSelector(selectWeightHasError);
  const workoutsError = useSelector(selectWorkoutsError);
  const templatesError = useSelector(selectTemplatesError);

  return (
    <React.Fragment>
      <ExtendSessionOptionOrCancel />
      <ExpiredSessionOptionOrCancel />
      <ErrorFlashMessage
        isVisible={true}
        description={'Test error message'}
      />

      {children}
    </React.Fragment>
  );
};

export default GlobalUserMessagesManager;