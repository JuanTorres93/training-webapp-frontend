import apiClient from "./serverAPIConfig";

import { serverBaseURL } from "./serverAPIConfig";

const baseEndpoint = serverBaseURL + '/weights';

export async function addNewWeight({ userId, date, weight }) {
    // format date in YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];

    const body = {
        date: formattedDate,
        value: weight,
    };

    const response = await apiClient.post(baseEndpoint + `/${userId}`, body, {
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

export async function getAllWeightsFromUser(userId) {
    const response = await apiClient.get(baseEndpoint + `/${userId}`, {
        withCredentials: true,
    });
    try {
        return response.data;
    } catch (error) {
        return response;
    }
};