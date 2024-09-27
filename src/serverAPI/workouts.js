import axios from 'axios';

import { serverBaseURL } from "./serverAPIConfig";

const END_POINT = serverBaseURL + '/workouts';


export async function createWorkout({ alias, description }) {
    const body = {
        alias,
        description,
    };

    const response = await axios.post(END_POINT, body, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

    return response.data;
};

export async function getLastWorkoutFromTemplate({ templateId, userId }) {
    const ep = `${END_POINT}/last/${templateId}/user/${userId}`;
    const response = await axios.get(ep, {
        withCredentials: true,
    });

    const jsonResponse = response.data;

    const lastWorkout = {
        ...jsonResponse,
        exercises: jsonResponse.exercises.filter((exercise) => exercise.id !== null),
    };

    return lastWorkout;
};

export async function getLastNWorkoutsFromTemplate({ templateId, userId, numberOfWorkouts }) {
    const ep = `${END_POINT}/last/${templateId}/user/${userId}/${numberOfWorkouts}`;
    const response = await axios.get(ep, {
        withCredentials: true,
    });

    return response.data;
};

export async function addExerciseToWorkout({ workoutId, exerciseId, exerciseSet, reps, weight }) {
    const body = {
        exerciseId,
        exerciseSet,
        reps,
        weight,
    };

    const response = await axios.post(`${END_POINT}/${workoutId}`, body, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

    return response.data;
};

export async function deleteWorkout({ workoutId }) {
    const response = await axios.delete(`${END_POINT}/${workoutId}`, {
        withCredentials: true,
    });

    return response.data;
};

export async function deleteExerciseFromWorkout({ workoutId, exerciseId }) {
    const response = await axios.delete(`${END_POINT}/${workoutId}/exercises/${exerciseId}`, {
        withCredentials: true,
    });

    return response.data;
};

export async function addFinishDateToWorkout({ workoutId }) {
    const ep = `${END_POINT}/addFinishDate/${workoutId}`;
    const response = await axios.get(ep, {
        withCredentials: true,
    });

    return response.data;
};

export async function getWorkoutsIdsAssociatedWithTemplateAndUser({ templateName }) {
    // User is checked in the backend with the login
    const ep = `${END_POINT}/all/${templateName}`;
    const response = await axios.get(ep, {
        withCredentials: true,
    });

    return response.data;
};
