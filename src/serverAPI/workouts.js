import { serverBaseURL } from "./serverAPIConfig";

const endpoint = serverBaseURL + '/workouts';


export async function createWorkout({ alias, description }) {
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
