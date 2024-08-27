import { serverBaseURL } from "./serverAPIConfig";

const endPoint = serverBaseURL + '/logout';

export async function logout() {
    const response = await fetch(endPoint);

    return response;
};
