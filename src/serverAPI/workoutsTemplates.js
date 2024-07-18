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

// export async function getAllExercises() {
    // const response = await fetch(endpoint, {
        // method: 'GET',
        // credentials: 'include',
    // });
// 
    // const jsonResponse = await response.json();
// 
    // return jsonResponse;
// };
// 
// 
// export async function getAllExercisesFromUser(userId) {
    // const response = await fetch(endpoint + `/all/${userId}`, {
        // method: 'GET',
        // credentials: 'include',
    // });
// 
    // const jsonResponse = await response.json();
// 
    // return jsonResponse;
// };

