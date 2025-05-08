import apiClient from "./serverAPIConfig";

import { serverBaseURL } from "./serverAPIConfig";

const loginEndPoint = serverBaseURL + "/login";

export async function login(username, password) {
  const body = {
    username,
    password,
  };

  const response = await apiClient.post(loginEndPoint, body, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return response.data;
}

export async function extendSession() {
  const response = await apiClient.post(
    loginEndPoint + "/extend-session",
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
}

export async function loginGoogle() {
  const endPoint = loginEndPoint + "/google";

  const response = await apiClient.get(endPoint, {
    // TODO comprobar si hay que descomentar
    // withCredentials: true,
  });

  return response.data;
}

export async function authMe() {
  const response = await apiClient.get(loginEndPoint + "/auth/me", {
    withCredentials: true,
  });

  try {
    return response.data;
  } catch (error) {
    return response;
  }
}
