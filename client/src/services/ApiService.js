import { APP_BACKEND } from "../config/constant";

async function send(endpoint, token, method, headers, body) {

  const response = await fetch(APP_BACKEND + endpoint, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": `${headers}`,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return response;
}

export const api = {
  get: (endpoint, token) => send(endpoint, token, "GET", "application/json"),
  post: (endpoint, token, body) =>
    send(endpoint, token, "POST", "application/json", body),
  put: (endpoint, token, body) =>
    send(endpoint, token, "PUT", "application/json", body),
  delete: (endpoint, token) =>
    send(endpoint, token, "DELETE", "application/json"),
};
