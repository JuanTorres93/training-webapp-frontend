import apiClient from "./serverAPIConfig";

import { serverBaseURL } from "./serverAPIConfig";

const registerEndPoint = serverBaseURL + '/users';

export async function register(alias, email, password, registeredViaOAuth) {
    const body = {
        alias,
        email,
        password,
        registeredViaOAuth,
    };

    const response = await apiClient.post(registerEndPoint, body, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });
    try {
        return response.data;
    } catch (error) {
        return response;
    }
};