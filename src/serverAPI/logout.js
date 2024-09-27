import apiClient from "./serverAPIConfig";

import { serverBaseURL } from "./serverAPIConfig";

const endPoint = serverBaseURL + '/logout';

export async function logout() {
    const response = await apiClient.get(endPoint);
    return response;
};
