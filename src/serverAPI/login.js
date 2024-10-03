import apiClient from "./serverAPIConfig";

import { serverBaseURL } from "./serverAPIConfig";

const loginEndPoint = serverBaseURL + '/login';

export async function login(username, password) {
    const body = {
        username,
        password,
    };

    const response = await apiClient.post(loginEndPoint, body, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

    return response.data;
};

export async function extendSession() {
    const response = await apiClient.post(loginEndPoint + '/extend-session', {}, {
        withCredentials: true,
    });

    return response.data;
};

export async function loginGoogle() {
    const endPoint = loginEndPoint + '/google';

    const response = await apiClient.get(endPoint, {
        // withCredentials: true,
    });

    return response.data;
};