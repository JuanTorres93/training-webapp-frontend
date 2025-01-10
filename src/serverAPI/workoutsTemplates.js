import apiClient from "./serverAPIConfig";

import { serverBaseURL } from "./serverAPIConfig";

const endpoint = serverBaseURL + '/workouts/templates';


export async function createTemplate({ userId, name, description }) {
    const body = {
        userId,
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

export async function updateTemplate({ templateId, name, description }) {
    const body = {
        name,
        description,
    };

    const response = await apiClient.put(endpoint + `/${templateId}`, body, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

    return response.data;
};

export async function addExerciseToTemplate({ templateId, exerciseId, exerciseOrder, exerciseSets }) {
    const body = {
        exerciseId,
        exerciseOrder,
        exerciseSets,
    };

    const response = await apiClient.post(endpoint + `/${templateId}`, body, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

    return response.data;
};

export async function updateExerciseFromTemplate({
    templateId,
    exerciseId,
    exerciseOrder,
    exerciseSets,
    newExerciseOrder,
}) {
    const ep = endpoint + `/${templateId}/exercises/${exerciseId}/${exerciseOrder}`;

    const body = {
        newExerciseOrder,
        exerciseSets,
    };

    const response = await apiClient.put(ep, body, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

    return response.data;
};

export async function getAllUserTemplates({ userId }) {
    const response = await apiClient.get(endpoint + `/all/${userId}`, {
        withCredentials: true,
    });

    return response.data;
};

export async function getCommonTemplates() {
    const response = await apiClient.get(endpoint + `/common`, {
        withCredentials: true,
    });

    return response.data;
};

export async function getTemplateInfo({ templateId }) {
    const response = await apiClient.get(endpoint + `/${templateId}`, {
        withCredentials: true,
    });

    return response.data;
};

export async function getRecentWorkouts({ userId, numberOfWorkouts = 20 }) {
    const response = await apiClient.get(endpoint + `/last/user/${userId}/${numberOfWorkouts}`, {
        withCredentials: true,
    });

    return response.data;
};

export async function deleteTemplate({ templateId }) {
    const response = await apiClient.delete(endpoint + `/${templateId}`, {
        withCredentials: true,
    });

    return response.data;
};

export async function removeExerciseFromTemplate({ templateId, exerciseId, exerciseOrder }) {
    const ep = endpoint + `/${templateId}/exercises/${exerciseId}/${exerciseOrder}`;
    const response = await apiClient.delete(ep, {
        withCredentials: true,
    });

    return response.data;
};
