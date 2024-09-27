import axios from 'axios';

import { serverBaseURL } from "./serverAPIConfig";

const endPoint = serverBaseURL + '/logout';

export async function logout() {
    const response = await axios.get(endPoint);
    return response;
};
