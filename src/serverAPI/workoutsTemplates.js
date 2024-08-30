import { serverBaseURL } from "./serverAPIConfig";

const endpoint = serverBaseURL + '/workouts/templates';


export async function createTemplate({ userId, alias, description }) {
    const body = {
        userId,
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

export async function addExerciseToTemplate({ templateId, exerciseId, exerciseOrder, exerciseSets }) {
    const body = {
        exerciseId,
        exerciseOrder,
        exerciseSets,
    };

    const response = await fetch(endpoint + `/${templateId}`, {
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

    const response = await fetch(ep, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
    });

    const jsonResponse = await response.json();

    return jsonResponse;
};

export async function getAllUserTemplates({ userId }) {
    const response = await fetch(endpoint + `/all/${userId}`, {
        method: 'GET',
        credentials: 'include',
    });

    const jsonResponse = await response.json();

    return jsonResponse;
};

export async function getTemplateInfo({ templateId }) {
    const response = await fetch(endpoint + `/${templateId}`, {
        method: 'GET',
        credentials: 'include',
    });

    const jsonResponse = await response.json();

    return jsonResponse;
};

export async function getRecentWorkouts({ userId, numberOfWorkouts = 6 }) {
    const response = await fetch(endpoint + `/last/user/${userId}/${numberOfWorkouts}`, {
        method: 'GET',
        credentials: 'include',
    });

    const jsonResponse = await response.json();

    return jsonResponse;
};

export async function deleteTemplate({ templateId }) {
    const response = await fetch(endpoint + `/${templateId}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    const jsonResponse = await response.json();

    return jsonResponse;
};

export async function removeExerciseFromTemplate({ templateId, exerciseId, exerciseOrder }) {
    const ep = endpoint + `/${templateId}/exercises/${exerciseId}/${exerciseOrder}`;
    const response = await fetch(ep, {
        method: 'DELETE',
        credentials: 'include',
    });

    const jsonResponse = await response.json();

    return jsonResponse;
};