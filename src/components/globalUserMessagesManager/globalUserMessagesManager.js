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

  // TODO poner algún timer al tiempo de visualización del error,
  // tal vez modificar su visibility a hidden en vez de eliminarlo directamente
  // Y cuando estén todos ocultos, entonces eliminarlos del array.
  // Esto quizá prevenga el parpadear de los mensajes de error cuando se 
  // elimina uno

  useEffect(() => {
    if (exercisesError.hasError) {
      setErrorMessages([...errorMessages, exercisesError]);
    }
    if (userError.hasError) {
      setErrorMessages([...errorMessages, userError]);
    }
    if (weightError.hasError) {
      setErrorMessages([...errorMessages, weightError]);
    }
    if (workoutsError.hasError) {
      setErrorMessages([...errorMessages, workoutsError]);
    }
    if (templatesError.hasError) {
      setErrorMessages([...errorMessages, templatesError]);
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
                key={index}
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