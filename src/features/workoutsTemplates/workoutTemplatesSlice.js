import { createSelector } from "reselect";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTemplateInfo } from "../../serverAPI/workoutsTemplates";
import {
    createTemplate,
    getAllUserTemplates,
    getRecentWorkouts,
    deleteTemplate,
    removeExerciseFromTemplate,
    updateExerciseFromTemplate as updateExerciseFromTemplateInDB,
} from "../../serverAPI/workoutsTemplates";
import { getWorkoutsIdsAssociatedWithTemplateAndUser } from "../../serverAPI/workouts";
import { deleteWorkout, deleteExerciseFromWorkout } from "../workouts/workoutSlice";

export const sliceName = 'workoutTemplates';

export const createWorkoutTemplate = createAsyncThunk(
    `${sliceName}/createWorkoutTemplate`,
    async (arg, thunkAPI) => {
        // arg is an object with the properties userId, alias and description
        // Error is handled from redux state when promise is rejected
        const response = await createTemplate(arg);

        response['description'] = response['description'] ? response['description'] : '';

        return response;
    }
);

export const updateExerciseFromTemplate = createAsyncThunk(
    `${sliceName}/updateExerciseFromTemplate`,
    async (arg, thunkAPI) => {
        // arg is an object with the properties templateId, exerciseId,
        // exerciseOrder, exerciseSets and newExerciseOrder

        const response = await updateExerciseFromTemplateInDB(arg);

        const info = {
            body: {
                templateId: arg.templateId,
                exerciseId: arg.exerciseId,
                exerciseOrder: arg.exerciseOrder,
            },
            response,
        };

        return info;
    }
);

export const getAllUserCreatedTemplates = createAsyncThunk(
    `${sliceName}/getAllUserCreatedTemplates`,
    async (arg, thunkAPI) => {
        // arg is an object with the property userId

        // Error is handled from redux state when promise is rejected
        const response = await getAllUserTemplates(arg);

        return response;
    }
);

export const getUserRecentWorkouts = createAsyncThunk(
    `${sliceName}/getUserRecentWorkouts`,
    async (arg, thunkAPI) => {
        // arg is an object with the property userId

        // Error is handled from redux state when promise is rejected
        const response = await getRecentWorkouts(arg);

        return response;
    }
);

export const deleteTemplateFromUser = createAsyncThunk(
    `${sliceName}/deleteTemplateFromUser`,
    async (arg, thunkAPI) => {
        // arg is an object with the property templateId

        const templateInfo = await getTemplateInfo(arg);

        const templateName = templateInfo['alias'];
        const workoutIdsresponse = await getWorkoutsIdsAssociatedWithTemplateAndUser({
            templateName
        });

        const workoutIds = workoutIdsresponse.map(workout => workout.workout_id);

        const response = await deleteTemplate(arg);

        // Delete all workouts associated with the template
        workoutIds.map(workoutId => {
            thunkAPI.dispatch(deleteWorkout({ workoutId }));
        });

        return response;
    }
);

export const deleteExerciseFromTemplate = createAsyncThunk(
    `${sliceName}/deleteExerciseFromTemplate`,
    async (arg, thunkAPI) => {
        // arg is an object with the properties templateId, exerciseId and exerciseOrder

        // Remove exercise from template
        const deletedExerciseInfo = await removeExerciseFromTemplate(arg);

        const templateInfo = await getTemplateInfo({
            templateId: arg.templateId,
        });
        const templateExercises = templateInfo['exercises'];
        const templateName = templateInfo['alias'];
        const workoutIdsresponse = await getWorkoutsIdsAssociatedWithTemplateAndUser({
            templateName
        });

        // Reorder exercises in template
        // order templateExercises by exerciseOrder
        templateExercises.sort((a, b) => a.order - b.order);
        // Reassign order to each exercise starting from 1
        const promises = [];
        templateExercises.map((exercise, index) => {
            const newExerciseOrder = index + 1;

            // TODO handle and/or fix error if primary key is violated
            const infoForUpdate = {
                templateId: arg.templateId,
                exerciseId: exercise.id,
                exerciseOrder: exercise.order,
                newExerciseOrder,
            };

            promises.push(
                thunkAPI.dispatch(updateExerciseFromTemplate(infoForUpdate))
            );

            return exercise.order = newExerciseOrder;
        });

        await Promise.all(promises);

        const workoutIds = workoutIdsresponse.map(workout => workout.workout_id);

        // Delete all exercises from workouts associated with the template
        workoutIds.map(workoutId => {
            thunkAPI.dispatch(deleteExerciseFromWorkout({
                workoutId,
                exerciseId: arg.exerciseId
            }));
        });

        return deletedExerciseInfo;
    }
);

const slice = createSlice({
    name: sliceName,
    initialState: {
        [sliceName]: {
            userCreatedTemplates: [],
            recentWorkouts: [], // Stored here instead of in workoutsSlice
            // Because the id of the template is stored
            // and it can be used to fetch the template
            activeTemplate: null,
        },
        isLoading: false,
        hasError: false,
    },
    reducers: {
        setActiveTemplate: (state, action) => {
            // Action payload is the template id, it should be 
            // contained in the userCreatedTemplates array
            const template = state[sliceName].userCreatedTemplates.find(
                template => template.id === action.payload
            );

            if (!template) {
                state[sliceName].activeTemplate = null;
            } else {
                state[sliceName].activeTemplate = template;
            }
        }
    },
    extraReducers: builder => {
        // Create workout template
        builder.addCase(createWorkoutTemplate.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(createWorkoutTemplate.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(createWorkoutTemplate.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })

        // Get all user created templates
        builder.addCase(getAllUserCreatedTemplates.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(getAllUserCreatedTemplates.fulfilled, (state, action) => {
            let templates = action.payload;
            state[sliceName].userCreatedTemplates = templates;
            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(getAllUserCreatedTemplates.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })

        // Get user recent workouts
        builder.addCase(getUserRecentWorkouts.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(getUserRecentWorkouts.fulfilled, (state, action) => {
            const templates = action.payload;
            const recentWorkouts = templates.map(template => {
                return {
                    id: template.template_id,
                    date: template.workout_date,
                    name: template.workout_name,
                }
            });
            state[sliceName].recentWorkouts = recentWorkouts;
            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(getUserRecentWorkouts.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })

        // Delete template
        builder.addCase(deleteTemplateFromUser.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(deleteTemplateFromUser.fulfilled, (state, action) => {
            // action payload is an object. Remove it from the userCreatedTemplates array
            const templateId = action.payload.id;

            // Remove template from user created templates
            state[sliceName].userCreatedTemplates = state[sliceName].userCreatedTemplates.filter(
                template => template.id !== templateId
            );

            // Remove it from recent workouts
            state[sliceName].recentWorkouts = state[sliceName].recentWorkouts.filter(
                workout => workout.id !== templateId
            );

            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(deleteTemplateFromUser.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })

        // Delete exercise from template
        builder.addCase(deleteExerciseFromTemplate.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(deleteExerciseFromTemplate.fulfilled, (state, action) => {
            // action payload is an object with the properties workoutTemplateId, exerciseId, exerciseOrder, exerciseSets
            const deletedExercise = action.payload;

            // Remove exercise from corresponding template
            state[sliceName].userCreatedTemplates.map(template => {
                if (template.id === deletedExercise.workoutTemplateId) {
                    template.exercises = template.exercises.filter(
                        exercise => exercise.id !== deletedExercise.exerciseId
                    );
                }
            });

            // Remove exercise from active template if it is the same as the deleted one
            if (state[sliceName].activeTemplate.id === deletedExercise.workoutTemplateId) {
                state[sliceName].activeTemplate.exercises = state[sliceName].activeTemplate.exercises.filter(
                    exercise => exercise.id !== deletedExercise.exerciseId
                );
            }

            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(deleteExerciseFromTemplate.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })

        // Update exercise from template
        builder.addCase(updateExerciseFromTemplate.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(updateExerciseFromTemplate.fulfilled, (state, action) => {
            const { body, response } = action.payload;
            const { templateId, exerciseId, exerciseOrder } = body;

            // Update exercise in corresponding template
            state[sliceName].userCreatedTemplates.map(template => {
                if (template.id === templateId) {
                    template.exercises.map(exercise => {
                        if (exercise.id === exerciseId && exercise.order === exerciseOrder) {
                            exercise.order = response.exerciseOrder;
                            exercise.sets = response.exerciseSets;
                        }
                    });
                }
            });

            // Update exercise in active template if it is the same as the updated one
            if (state[sliceName].activeTemplate.id === templateId) {
                state[sliceName].activeTemplate.exercises.map(exercise => {
                    if (exercise.id === exerciseId && exercise.order === exerciseOrder) {
                        exercise.order = response.exerciseOrder;
                        exercise.sets = response.exerciseSets;
                    }
                });
            }

            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(updateExerciseFromTemplate.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })
    },
});

// Export selectors
export const selectUserTemplates = createSelector(
    (state) => state[sliceName][sliceName].userCreatedTemplates,
    (userCreatedTemplates) => userCreatedTemplates.map(template => ({
        ...template,
        name: template.alias
    }))
);
export const selectActiveTemplate = state => state[sliceName][sliceName].activeTemplate;
export const selectTemplatesLoading = state => state[sliceName].isLoading;
export const selectTemplatesError = state => state[sliceName].hasError;
export const selectRecentWorkouts = state => state[sliceName][sliceName].recentWorkouts;

// Export actions
export const { setActiveTemplate } = slice.actions;

// Export reducer
export default slice.reducer;
