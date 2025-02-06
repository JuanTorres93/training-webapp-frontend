import apiClient from "./serverAPIConfig";

import { serverBaseURL } from "./serverAPIConfig";

const usersEndPoint = serverBaseURL + '/users';

export async function register(username, email, password, oauth_registration, is_premium, is_early_adopter) {
    const created_at = new Date().toISOString();
    const body = {
        username,
        email,
        password,
        is_premium,
        is_early_adopter,
        created_at,
    };

    if (oauth_registration) {
        body.oauth_registration = oauth_registration;
    }

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