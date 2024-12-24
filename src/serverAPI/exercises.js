import apiClient from "./serverAPIConfig";

import { serverBaseURL } from "./serverAPIConfig";

const endpoint = serverBaseURL + '/exercises';


export async function createExercise(name, description) {
    const body = {
        name,
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

export async function updateExercise(exerciseId, name, description) {
    const body = {
        name,
        description,
    };

    const response = await apiClient.put(endpoint + `/${exerciseId}`, body, {
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

export async function getCommonExercises() {
    const response = await apiClient.get(endpoint + `/common`, {
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
