// import react needed for testing
import React from "react";

import ExerciseCompleterV2 from "./ExerciseCompleterV2.js";

import { useTranslation } from "react-i18next";

const TranslatedExerciseCompleterV2 = ({
  previousData,
  ticksCountYAxis,
  exerciseName,
  workoutStartDate,
  rowsInfo = [],
  isLoading = false,
  dispatchGenerator = (setNumber, weight, reps) => {},
  // Empty the exercises of the active workout
  clearExercisesDispatchGenerator = () => {},
  // Used with clearExercisesDispatchGenerator to clear the exercises of the active workout
  isFirstRender = false,
}) => {
  const { t } = useTranslation();
  const repsText = t("tooltip-reps");
  const weightText = t("tooltip-weight");
  const setText = t("template-creator-placeholder-sets");

  return (
    <ExerciseCompleterV2
      previousData={previousData}
      ticksCountYAxis={ticksCountYAxis}
      exerciseName={exerciseName}
      workoutStartDate={workoutStartDate}
      rowsInfo={rowsInfo}
      isLoading={isLoading}
      dispatchGenerator={dispatchGenerator}
      clearExercisesDispatchGenerator={clearExercisesDispatchGenerator}
      isFirstRender={isFirstRender}
      setText={setText}
      weightText={weightText}
      repsText={repsText}
    />
  );
};

export default TranslatedExerciseCompleterV2;
