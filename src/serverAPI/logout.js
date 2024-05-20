import { serverBaseURL } from "./serverAPIConfig";

const loginEndPoint = serverBaseURL + '/logout';

export async function logout() {
    const response = await fetch(loginEndPoint);

    return response;
};
