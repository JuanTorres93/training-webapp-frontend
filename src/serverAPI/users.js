import apiClient from "./serverAPIConfig";

import { serverBaseURL } from "./serverAPIConfig";

const usersEndPoint = serverBaseURL + '/users';

export async function register(alias, email, password, registeredViaOAuth) {
    const body = {
        alias,
        email,
        password,
        registeredViaOAuth,
    };

    const response = await apiClient.post(usersEndPoint, body, {
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

export async function selectUserById(userId) {
    const response = await apiClient.get(usersEndPoint + `/${userId}`, {
        withCredentials: true,
    });
    try {
        return response.data;
    } catch (error) {
        return response;
    }
};