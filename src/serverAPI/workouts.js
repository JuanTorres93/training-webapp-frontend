import { serverBaseURL } from "./serverAPIConfig";

const endpoint = serverBaseURL + '/workouts';


export async function createWorkout({ alias, description }) {
    const body = {
        alias,
        description,
    };

    const response = await fetch(endpoint, {
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
    const ep = `${endpoint}/last/${templateId}/user/${userId}`;
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
    const ep = `${endpoint}/last/${templateId}/user/${userId}/${numberOfWorkouts}`;
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

    const response = await fetch(endpoint + `/${workoutId}`, {
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
