import { serverBaseURL } from "./serverAPIConfig";

const registerEndPoint = serverBaseURL + '/users';

export async function register(alias, email, password) {
    const body = {
        alias,
        email,
        password,
    };

    const response = await fetch(registerEndPoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    try {
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        return response;
    }
};