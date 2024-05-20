import { serverBaseURL } from "./serverAPIConfig";

const registerEndPoint = serverBaseURL + '/register';

export async function register(firstName, lastName, email, password, secondLastName = null) {
    const body = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
    };

    if (secondLastName !== null) {
        body["second_last_name"] = secondLastName;
    };

    const response = await fetch(registerEndPoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    try {
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        return response;
    }
};