import apiClient from "./serverAPIConfig";

import { serverBaseURL } from "./serverAPIConfig";

const baseEndpoint = serverBaseURL + "/payments";

export async function getCheckoutSession(subscriptionId, language) {
  const response = await apiClient.get(
    baseEndpoint + `/checkout-session/${subscriptionId}/${language}`,
    {
      withCredentials: true,
    }
  );

  try {
    return response.data;
  } catch (error) {
    return response;
  }
}

export async function getLastPayment() {
  const response = await apiClient.get(baseEndpoint + "/my-last-payment", {
    withCredentials: true,
  });

  try {
    return response.data;
  } catch (error) {
    return response;
  }
}

export async function cancelSubscription() {
  const response = await apiClient.get(baseEndpoint + "/cancel-subscription", {
    withCredentials: true,
  });

  try {
    return response.data;
  } catch (error) {
    return response;
  }
}
