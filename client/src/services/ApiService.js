async function send(endpoint, token, method, body) {
  const response = await fetch(`http://localhost:7060/${endpoint}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body),
  });
  return response;
}

export const api = {
  get: (endpoint, token) => send(endpoint, token, "GET"),
  post: (endpoint, token, body) => send(endpoint, token, "POST", body),
  put: (endpoint, token,  body) => send(endpoint, token, "PUT", body),
  delete: (endpoint, token) => send(endpoint, token, "DELETE"),
};