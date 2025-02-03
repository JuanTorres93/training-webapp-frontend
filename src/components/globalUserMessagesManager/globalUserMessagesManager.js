import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { selectExercisesError } from '../../features/exercises/exercisesSlice';
import { selectUserError } from '../../features/user/userSlice';
import { selectWeightError } from '../../features/weights/weightSlice';
import { selectWorkoutsError } from '../../features/workouts/workoutSlice';
import { selectTemplatesError } from '../../features/workoutsTemplates/workoutTemplatesSlice';

import ExtendSessionOptionOrCancel from '../popupOptionOrCancel/ExtendSessionPopupOptionOrCancel';
import ExpiredSessionOptionOrCancel from '../popupOptionOrCancel/ExpiredSessionPopupOptionOrCancel';
import ErrorFlashMessage from '../flashMessage/ErrorFlashMessage';

const GlobalUserMessagesManager = ({ children }) => {
  const exercisesError = useSelector(selectExercisesError);
  const userError = useSelector(selectUserError);
  const weightError = useSelector(selectWeightError);
  const workoutsError = useSelector(selectWorkoutsError);
  const templatesError = useSelector(selectTemplatesError);

  const [errorMessages, setErrorMessages] = useState([]);

  const createError = (error) => {
    // Random id to make a key for React
    const id = Math.random().toString(36).substr(2, 9);

    // Timer for the error message to disappear
    setTimeout(() => {
      setErrorMessages(errorMessages.filter(error => error.id !== id));
    }, 5000);

    return {
      ...error,
      id
    };
  };

  useEffect(() => {
    if (exercisesError.hasError) {
      setErrorMessages([...errorMessages, createError(exercisesError)]);
    }
    if (userError.hasError) {
      setErrorMessages([...errorMessages, createError(userError)]);
    }
    if (weightError.hasError) {
      setErrorMessages([...errorMessages, createError(weightError)]);
    }
    if (workoutsError.hasError) {
      setErrorMessages([...errorMessages, createError(workoutsError)]);
    }
    if (templatesError.hasError) {
      setErrorMessages([...errorMessages, createError(templatesError)]);
    }

  }, [exercisesError, userError, weightError, workoutsError, templatesError]);

  const onClose = errorObj => (e) => {
    // Find the error object in the array and set hasError to false
    const updatedErrorMessages = errorMessages.map(error => {
      if (error === errorObj) {
        return {
          ...error,
          hasError: false
        };
      }
      return error;
    });

    setErrorMessages(updatedErrorMessages);

    // Remove it after .3 seconds (Time of the animation in sass)
    setTimeout(() => {
      setErrorMessages(errorMessages.filter(error => error !== errorObj));
    }, 300);
  };

  return (
    <React.Fragment>
      <ExtendSessionOptionOrCancel />
      <ExpiredSessionOptionOrCancel />

      <div className="global-user-msg-manager__flash-msg-box">
        {
          errorMessages.map((error, index) => {
            return (
              <ErrorFlashMessage
                key={error.id}
                isVisible={error.hasError}
                description={error.message}
                onClose={onClose(error)}
              />
            );
          })
        }
      </div>


      {children}
    </React.Fragment>
  );
};

export default GlobalUserMessagesManager;