import { APP_BACKEND } from "../config/constant";

async function send(endpoint, token, method, headers, body) {
  let requestBody;

  if (headers.includes("multipart/form-data")) {
    // If headers are multipart/form-data, set the body as is (FormData)
    requestBody = body;
  } else if (headers === "application/json") {
    // If headers are application/json, stringify the body
    requestBody = JSON.stringify(body);
  }

  const response = await fetch(APP_BACKEND + endpoint, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": `${headers}`,
      Authorization: `Bearer ${token}`,
    },
    body: requestBody,
  });
  return response;
}

export const api = {
  get: (endpoint, token) => send(endpoint, token, "GET", "application/json"),
  upload: (endpoint, token, body) =>
    send(endpoint, token, "POST", "multipart/form-data; boundary=<boundary-string>", body),
  post: (endpoint, token, body) =>
    send(endpoint, token, "POST", "application/json", body),
  put: (endpoint, token, body) =>
    send(endpoint, token, "PUT", "application/json", body),
  delete: (endpoint, token) =>
    send(endpoint, token, "DELETE", "application/json"),
};
