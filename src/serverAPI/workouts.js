import apiClient from "./serverAPIConfig";

import { serverBaseURL } from "./serverAPIConfig";

const END_POINT = serverBaseURL + '/workouts';


export async function createWorkout({ templateId, description }) {
    const body = {
        template_id: templateId,
        description,
    };

    const response = await apiClient.post(END_POINT, body, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

    return response.data;
};

export async function getLastWorkoutFromTemplate({ templateId, userId }) {
    const ep = `${END_POINT}/last/${templateId}/user/${userId}`;

    const response = await apiClient.get(ep, {
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
    const response = await apiClient.get(ep, {
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

    const response = await apiClient.post(`${END_POINT}/${workoutId}`, body, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

    return response.data;
};

export async function deleteWorkout({ workoutId }) {
    const response = await apiClient.delete(`${END_POINT}/${workoutId}`, {
        withCredentials: true,
    });

    return response.data;
};

export async function deleteExerciseFromWorkout({ workoutId, exerciseId }) {
    const response = await apiClient.delete(`${END_POINT}/${workoutId}/exercises/${exerciseId}`, {
        withCredentials: true,
    });

    return response.data;
};

export async function addFinishDateToWorkout({ workoutId }) {
    const ep = `${END_POINT}/addFinishDate/${workoutId}`;
    const response = await apiClient.get(ep, {
        withCredentials: true,
    });

    return response.data;
};

export async function getWorkoutsIdsAssociatedWithTemplateAndUser({ templateId }) {
    // User is checked in the backend with the login
    const ep = `${END_POINT}/all/${templateId}`;
    const response = await apiClient.get(ep, {
        withCredentials: true,
    });

    return response.data;
};
