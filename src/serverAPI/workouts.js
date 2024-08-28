import { serverBaseURL } from "./serverAPIConfig";

const END_POINT = serverBaseURL + '/workouts';


export async function createWorkout({ alias, description }) {
    const body = {
        alias,
        description,
    };

    const response = await fetch(END_POINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
    });

    const jsonResponse = await response.json();

    return jsonResponse;
};

export async function getLastWorkoutFromTemplate({ templateId, userId }) {
    const ep = `${END_POINT}/last/${templateId}/user/${userId}`;
    const response = await fetch(ep, {
        method: 'GET',
        credentials: 'include',
    });

    const jsonResponse = await response.json();

    const lastWorkout = {
        ...jsonResponse,
        exercises: jsonResponse.exercises.filter((exercise) => exercise.id !== null),
    };

    return lastWorkout;
};

export async function getLastNWorkoutsFromTemplate({ templateId, userId, numberOfWorkouts }) {
    const ep = `${END_POINT}/last/${templateId}/user/${userId}/${numberOfWorkouts}`;
    const response = await fetch(ep, {
        method: 'GET',
        credentials: 'include',
    });

    const jsonResponse = await response.json();

    return jsonResponse;
};

export async function addExerciseToWorkout({ workoutId, exerciseId, exerciseSet, reps, weight }) {
    const body = {
        exerciseId,
        exerciseSet,
        reps,
        weight,
    };

    const response = await fetch(END_POINT + `/${workoutId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
    });

    const jsonResponse = await response.json();

    return jsonResponse;
};

export async function deleteWorkout({ workoutId }) {
    const response = await fetch(END_POINT + `/${workoutId}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    const jsonResponse = await response.json();

    return jsonResponse;
};

export async function addFinishDateToWorkout({ workoutId }) {
    const ep = `${END_POINT}/addFinishDate/${workoutId}`;
    const response = await fetch(ep, {
        method: 'GET',
        credentials: 'include',
    });

    const jsonResponse = await response.json();

    return jsonResponse;
};

export async function getWorkoutsIdsAssociatedWithTemplateAndUser({ templateName }) {
    // User is checked in the backend with the login
    const ep = `${END_POINT}/all/${templateName}`;
    const response = await fetch(ep, {
        method: 'GET',
        credentials: 'include',
    });

    const jsonResponse = await response.json();

    return jsonResponse;
};
