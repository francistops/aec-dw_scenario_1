async function apiCall(resource, method, body = {}) {
  let result = false;
  const BASE_URL = "https://api.amelieroussin.ca/";
  const apiUrl = `${BASE_URL}${resource}`;

  const headers = {
    "Content-type": "application/json",
    Accept: "application/json",
  };

  const apiReq = {
    method: method,
    headers: headers,
  };

  if (method == "POST") apiReq["body"] = JSON.stringify(body);

  const Response = await fetch(apiUrl, apiReq);

  if (Response.ok) {
    result = await Response.json();
  }

  return result;
}

export async function sendHeartbeat() {
  let result = false;

  const heartbeatResponse = await fetch("https://api.amelieroussin.ca/status/heartbeat");

  if (heartbeatResponse.ok) {
    const heartbeatJson = await heartbeatResponse.json();
    if (heartbeatJson.errorCode == 0) {
      result = true;
    }
  }

  return result;
}
