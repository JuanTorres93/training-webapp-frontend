import apiClient from "./serverAPIConfig";

import { serverBaseURL } from "./serverAPIConfig";

const baseEndpoint = serverBaseURL + "/subscriptions";

export async function getAllSubscriptions() {
  const response = await apiClient.get(baseEndpoint + `/`, {
    withCredentials: true,
  });

  try {
    return response.data;
  } catch (error) {
    return response;
  }
}

export async function getCurrentSubscription(userId) {
  const response = await apiClient.get(baseEndpoint + `/user/${userId}`, {
    withCredentials: true,
  });

  try {
    return response.data;
  } catch (error) {
    return response;
  }
}
