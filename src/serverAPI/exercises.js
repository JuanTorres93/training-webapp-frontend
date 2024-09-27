import axios from 'axios';

import { serverBaseURL } from "./serverAPIConfig";

const endpoint = serverBaseURL + '/exercises';


export async function createExercise(alias, description) {
    const body = {
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

export async function getAllExercises() {
    const response = await axios.get(endpoint, {
        withCredentials: true,
    });

    return response.data;
};


export async function getAllExercisesFromUser(userId) {
    const response = await axios.get(endpoint + `/all/${userId}`, {
        withCredentials: true,
    });

    return response.data;
};

export async function deleteExercise(exerciseId) {
    const response = await axios.delete(endpoint + `/${exerciseId}`, {
        withCredentials: true,
    });

    return response.data;
};
