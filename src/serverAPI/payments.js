import apiClient from "./serverAPIConfig";

import { serverBaseURL } from "./serverAPIConfig";

const baseEndpoint = serverBaseURL + "/payments";

export async function getCheckoutSession() {
  const response = await apiClient.get(baseEndpoint + `/checkout-session`, {
    withCredentials: true,
  });

  try {
    return response.data;
  } catch (error) {
    return response;
  }
}
