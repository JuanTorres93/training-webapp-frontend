import axios from 'axios';

import { serverBaseURL } from "./serverAPIConfig";

const endpoint = serverBaseURL + '/workouts/templates';


export async function createTemplate({ userId, alias, description }) {
    const body = {
        userId,
        alias,
        description,
    };

    const response = await axios.post(endpoint, body, {
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

    const response = await axios.post(endpoint + `/${templateId}`, body, {
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

    const response = await axios.put(ep, body, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

    return response.data;
};

export async function getAllUserTemplates({ userId }) {
    const response = await axios.get(endpoint + `/all/${userId}`, {
        withCredentials: true,
    });

    return response.data;
};

export async function getTemplateInfo({ templateId }) {
    const response = await axios.get(endpoint + `/${templateId}`, {
        withCredentials: true,
    });

    return response.data;
};

export async function getRecentWorkouts({ userId, numberOfWorkouts = 6 }) {
    const response = await axios.get(endpoint + `/last/user/${userId}/${numberOfWorkouts}`, {
        withCredentials: true,
    });

    return response.data;
};

export async function deleteTemplate({ templateId }) {
    const response = await axios.delete(endpoint + `/${templateId}`, {
        withCredentials: true,
    });

    return response.data;
};

export async function removeExerciseFromTemplate({ templateId, exerciseId, exerciseOrder }) {
    const ep = endpoint + `/${templateId}/exercises/${exerciseId}/${exerciseOrder}`;
    const response = await axios.delete(ep, {
        withCredentials: true,
    });

    return response.data;
};
