import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTemplateInfo } from "../../serverAPI/workoutsTemplates";
import {
    createTemplate,
    updateTemplate,
    getAllUserTemplates,
    getCommonTemplates,
    getRecentWorkouts,
    deleteTemplate,
    removeExerciseFromTemplate,
    updateExerciseFromTemplate as updateExerciseFromTemplateInDB,
} from "../../serverAPI/workoutsTemplates";
import {
    getWorkoutsIdsAssociatedWithTemplateAndUser,
    getLastNWorkoutsFromTemplate,
} from "../../serverAPI/workouts";
import { deleteWorkout, deleteExerciseFromWorkout } from "../workouts/workoutSlice";

export const sliceName = 'workoutTemplates';
const LOADING_FLAG = true;

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

export const updateWorkoutTemplate = createAsyncThunk(
    `${sliceName}/updateWorkoutTemplate`,
    async (arg, thunkAPI) => {
        // arg is an object with the properties templateId, alias and description
        // Error is handled from redux state when promise is rejected

        // TODO DRY these ifs
        if (!arg.description || arg.description.trim() === '') {
            // Access the state from thunkAPI
            const state = thunkAPI.getState();

            const template = state[sliceName][sliceName].userCreatedTemplates.find(t => t.id === arg.templateId);
            arg.description = template.description ? template.description : '';
        }

        if (!arg.name || arg.name.trim() === '') {
            // Access the state from thunkAPI
            const state = thunkAPI.getState();

            const template = state[sliceName][sliceName].userCreatedTemplates.find(t => t.id === arg.templateId);
            arg.name = template.name ? template.name : '';
        }

        const response = await updateTemplate(arg);

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

export const getCommonTemplatesForUser = createAsyncThunk(
    `${sliceName}/getCommonTemplatesForUser`,
    async (arg, thunkAPI) => {
        // Error is handled from redux state when promise is rejected
        const response = await getCommonTemplates(arg);

        return response;
    }
);

export const getUserRecentWorkouts = createAsyncThunk(
    `${sliceName}/getUserRecentWorkouts`,
    async (arg, thunkAPI) => {
        // arg is an object with the property userId

        // Error is handled from redux state when promise is rejected
        const response = await getRecentWorkouts(arg);

        // check if template has exercises, if not, remove it from the templates and workouts in db
        const promises = [];
        const templatesIds = response.map(template => template.template_id);

        templatesIds.forEach(templateId => {
            promises.push(getTemplateInfo({ templateId }));
        })

        const resolvedPromises = await Promise.all(promises);

        // map values
        const templates = resolvedPromises.map(template => { return template });

        // filter templates to not repeat ids
        const uniqueTemplates = templates.filter((template, index, self) =>
            index === self.findIndex((t) => (
                t.id === template.id
            ))
        );

        uniqueTemplates.forEach(template => {
            if (template.exercises.length === 0) {
                thunkAPI.dispatch(deleteTemplateFromUser({ templateId: template.id }));
            }
        });

        // Keep only the last 5 unique templates at most
        if (uniqueTemplates.length > 5) {
            uniqueTemplates.splice(0, uniqueTemplates.length - 5);
        }

        // Get last N workouts for each template
        const lastNWorkoutsPromises = [];

        uniqueTemplates.forEach(template => {
            lastNWorkoutsPromises.push(
                getLastNWorkoutsFromTemplate({
                    templateId: template.id,
                    userId: arg.userId,
                    numberOfWorkouts: 10
                })
            );
        });

        const lastNWorkouts = await Promise.all(lastNWorkoutsPromises);

        // lastNWorkouts is an array of arrays of objects . Order by object.startDate, most recent last
        const sortedLastNWorkouts = lastNWorkouts.map(workouts => {
            return workouts.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        });

        return sortedLastNWorkouts;
    }
);

export const deleteTemplateFromUser = createAsyncThunk(
    `${sliceName}/deleteTemplateFromUser`,
    async (arg, thunkAPI) => {
        // arg is an object with the property templateId

        const { templateId } = arg;

        const workoutIdsresponse = await getWorkoutsIdsAssociatedWithTemplateAndUser({
            templateId
        });

        const response = await deleteTemplate(arg);

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
        workoutIds.forEach(workoutId => {
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
            commonTemplates: [],
            recentWorkouts: [], // Stored here instead of in workoutsSlice
            // Because the id of the template is stored
            // and it can be used to fetch the template
            activeTemplate: {},
        },
        isLoading: [],
        hasError: false,
    },
    reducers: {
        setActiveTemplate: (state, action) => {
            // Action payload is the template id
            const template = state[sliceName].userCreatedTemplates.find(
                template => template.id === action.payload
            ) || state[sliceName].commonTemplates.find(
                template => template.id === action.payload
            );

            if (!template) {
                state[sliceName].activeTemplate = {};
            } else {
                state[sliceName].activeTemplate = template;
            }
        }
    },
    extraReducers: builder => {
        // Create workout template
        builder.addCase(createWorkoutTemplate.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
            state.hasError = false;
        })
        builder.addCase(createWorkoutTemplate.fulfilled, (state, action) => {
            state.isLoading.pop();
            state.hasError = false;
        })
        builder.addCase(createWorkoutTemplate.rejected, (state, action) => {
            state.isLoading.pop();
            state.hasError = true;
        })

        // Get all user created templates
        builder.addCase(getAllUserCreatedTemplates.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
            state.hasError = false;
        })
        builder.addCase(getAllUserCreatedTemplates.fulfilled, (state, action) => {
            let templates = action.payload;
            state[sliceName].userCreatedTemplates = templates;
            state.isLoading.pop();
            state.hasError = false;
        })
        builder.addCase(getAllUserCreatedTemplates.rejected, (state, action) => {
            state.isLoading.pop();
            state.hasError = true;
        })

        // Get common templates
        builder.addCase(getCommonTemplatesForUser.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
            state.hasError = false;
        })
        builder.addCase(getCommonTemplatesForUser.fulfilled, (state, action) => {
            const templates = action.payload.map(template => {
                return {
                    ...template,
                    isCommon: true,
                }
            });
            state[sliceName].commonTemplates = templates;
            state.isLoading.pop();
            state.hasError = false;
        })
        builder.addCase(getCommonTemplatesForUser.rejected, (state, action) => {
            state.isLoading.pop();
            state.hasError = true;
        })

        // Get user recent workouts
        builder.addCase(getUserRecentWorkouts.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
            state.hasError = false;
        })
        builder.addCase(getUserRecentWorkouts.fulfilled, (state, action) => {
            state[sliceName].recentWorkouts = action.payload;
            state.isLoading.pop();
            state.hasError = false;
        })
        builder.addCase(getUserRecentWorkouts.rejected, (state, action) => {
            state.isLoading.pop();
            state.hasError = true;
        })

        // Update workout template
        builder.addCase(updateWorkoutTemplate.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
            state.hasError = false;
        })
        builder.addCase(updateWorkoutTemplate.fulfilled, (state, action) => {
            const updatedTemplate = action.payload;
            const updatedTemplateId = updatedTemplate.id;

            // Update template in user created templates
            const index = state[sliceName].userCreatedTemplates.findIndex(
                template => template.id === updatedTemplateId
            );

            state[sliceName].userCreatedTemplates[index] = updatedTemplate;

            state.isLoading.pop();
            state.hasError = false;
        })
        builder.addCase(updateWorkoutTemplate.rejected, (state, action) => {
            state.isLoading.pop();
            state.hasError = true;
        })

        // Delete template
        builder.addCase(deleteTemplateFromUser.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
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
            state[sliceName].recentWorkouts = state[sliceName].recentWorkouts.filter(template => {
                return template[0].template_id !== templateId;
            });

            state.isLoading.pop();
            state.hasError = false;
        })
        builder.addCase(deleteTemplateFromUser.rejected, (state, action) => {
            state.isLoading.pop();
            state.hasError = true;
        })

        // Delete exercise from template
        builder.addCase(deleteExerciseFromTemplate.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
            state.hasError = false;
        })
        builder.addCase(deleteExerciseFromTemplate.fulfilled, (state, action) => {
            // action payload is an object with the properties workoutTemplateId, exerciseId, exerciseOrder, exerciseSets
            const deletedExercise = action.payload;

            // Remove exercise from corresponding template
            state[sliceName].userCreatedTemplates.forEach(template => {
                if (template.id === deletedExercise.workoutTemplateId) {
                    template.exercises = template.exercises.filter(
                        exercise => exercise.id !== deletedExercise.exerciseId
                    );
                }
            });

            // Remove exercise from active template if it is the same as the deleted one
            if (state[sliceName].activeTemplate && state[sliceName].activeTemplate.id && state[sliceName].activeTemplate.id === deletedExercise.workoutTemplateId) {
                state[sliceName].activeTemplate.exercises = state[sliceName].activeTemplate.exercises.filter(
                    exercise => exercise.id !== deletedExercise.exerciseId
                );
            }

            state.isLoading.pop();
            state.hasError = false;
        })
        builder.addCase(deleteExerciseFromTemplate.rejected, (state, action) => {
            state.isLoading.pop();
            state.hasError = true;
        })

        // Update exercise from template
        builder.addCase(updateExerciseFromTemplate.pending, (state, action) => {
            state.isLoading.push(LOADING_FLAG);
            state.hasError = false;
        })
        builder.addCase(updateExerciseFromTemplate.fulfilled, (state, action) => {
            const { body, response } = action.payload;
            const { templateId, exerciseId, exerciseOrder } = body;

            // Update exercise in corresponding template
            state[sliceName].userCreatedTemplates.forEach(template => {
                if (template.id === templateId) {
                    template.exercises.forEach(exercise => {
                        if (exercise.id === exerciseId && exercise.order === exerciseOrder) {
                            exercise.order = response.exerciseOrder;
                            exercise.sets = response.exerciseSets;
                        }
                    });
                }
            });

            // Update exercise in active template if it is the same as the updated one
            if (state[sliceName].activeTemplate && state[sliceName].activeTemplate.id === templateId) {
                state[sliceName].activeTemplate.exercises.forEach(exercise => {
                    if (exercise.id === exerciseId && exercise.order === exerciseOrder) {
                        exercise.order = response.exerciseOrder;
                        exercise.sets = response.exerciseSets;
                    }
                });
            }

            state.isLoading.pop();
            state.hasError = false;
        })
        builder.addCase(updateExerciseFromTemplate.rejected, (state, action) => {
            state.isLoading.pop();
            state.hasError = true;
        })
    },
});

// Export selectors
export const selectUserTemplates = state => state[sliceName][sliceName].userCreatedTemplates;
export const selectCommonTemplates = state => state[sliceName][sliceName].commonTemplates;
export const selectActiveTemplate = state => state[sliceName][sliceName].activeTemplate;
export const selectTemplatesLoading = state => state[sliceName].isLoading.length > 0;
export const selectTemplatesError = state => state[sliceName].hasError;
export const selectRecentWorkouts = state => state[sliceName][sliceName].recentWorkouts;

// Export actions
export const { setActiveTemplate } = slice.actions;

// Export reducer
export default slice.reducer;
