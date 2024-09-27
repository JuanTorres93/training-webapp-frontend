import apiClient from "./serverAPIConfig";

import { serverBaseURL } from "./serverAPIConfig";

const endpoint = serverBaseURL + '/exercises';


export async function createExercise(alias, description) {
    const body = {
        alias,
        description,
    };

    const response = await apiClient.post(endpoint, body, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

    return response.data;
};

export async function getAllExercises() {
    const response = await apiClient.get(endpoint, {
        withCredentials: true,
    });

    return response.data;
};


export async function getAllExercisesFromUser(userId) {
    const response = await apiClient.get(endpoint + `/all/${userId}`, {
        withCredentials: true,
    });

    return response.data;
};

export async function deleteExercise(exerciseId) {
    const response = await apiClient.delete(endpoint + `/${exerciseId}`, {
        withCredentials: true,
    });

    return response.data;
};
