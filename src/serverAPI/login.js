import axios from 'axios';

import { serverBaseURL } from "./serverAPIConfig";

const loginEndPoint = serverBaseURL + '/login';

export async function login(username, password) {
    const body = {
        username,
        password,
    };

    const response = await axios.post(loginEndPoint, body, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

    return response.data;
};

export async function extendSession() {
    const response = await axios.post(loginEndPoint + '/extend-session', {}, {
        withCredentials: true,
    });

    return response.data;
};

export async function loginGoogle() {
    const endPoint = loginEndPoint + '/google';

    console.log("Sending login with GOOGLE request");
    const response = await axios.get(endPoint, {
        // withCredentials: true,
    });

    // TODO remove this log
    console.log(response);

    return response.data;
};