import { serverBaseURL } from "./serverAPIConfig";

const loginEndPoint = serverBaseURL + '/login';

export async function login(username, password) {
    const body = {
        username,
        password,
    };

    const response = await fetch(loginEndPoint, {
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

export async function loginGoogle() {
    const endPoint = loginEndPoint + '/google';

    console.log("Sending login with GOOGLE request");
    const response = await fetch(endPoint, {
        method: 'GET', //'POST',
        // headers: {
            // 'Content-Type': 'application/json',
        // },
        // body: JSON.stringify(body),
    });

    console.log(response);

    return response;
};