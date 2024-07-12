import { serverBaseURL } from "./serverAPIConfig";

const endpoint = serverBaseURL + '/exercises';


export async function createExercise(alias, description) {
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

export async function getAllExercises() {
    const response = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
    });

    const jsonResponse = await response.json();

    return jsonResponse;
};


export async function getAllExercisesFromUser(userId) {
    const response = await fetch(endpoint + `/all/${userId}`, {
        method: 'GET',
        credentials: 'include',
    });

    const jsonResponse = await response.json();

    return jsonResponse;
};

