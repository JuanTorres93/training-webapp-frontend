import { setActiveTemplate } from "../features/workoutsTemplates/workoutTemplatesSlice";

// Handle start workout
export const handleStartWorkout = user => templateId => allTemplates => dispatchFn =>
    createWorkoutAction => setLastWorkoutAction => setLastNWorkoutsAction =>
        navigateFn => (e) => {
            // check templateId is UUID
            const uuidRegex = new RegExp(
                "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"
            );
            if (!uuidRegex.test(templateId)) {
                // TODO warn user about invalid template
                return
            } else {
                const template = allTemplates.find(t => t.id === templateId);

                if (template) {
                    // This is done here for loading states, but it is later
                    // also done in the workoutTemplatesSlice
                    dispatchFn(setActiveTemplate(template.id));
                }

                // Create workout and then redirect to run workout page
                dispatchFn(createWorkoutAction({
                    templateId: template.id,
                    // description: template.description ? template.description : '',
                    // TODO modify in some time in the future?
                    description: '',
                })).then((response) => {
                    const workout = response.payload;

                    dispatchFn(setLastWorkoutAction({
                        templateId: template.id,
                        userId: user.id,
                    })).then(() => {
                        dispatchFn(setLastNWorkoutsAction({
                            templateId: template.id,
                            userId: user.id,
                            numberOfWorkouts: 7,
                        })).then((res) => {
                            navigateFn(`/app/runWorkout/${templateId}/${workout.id}`);
                        })
                    });
                });

            }
        };