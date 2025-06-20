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

  const heatbeatResponse = await apiCall("/status/heartbeat", "GET");

  if (heatbeatResponse.errorCode == 0) {
    result = true;
    }

  return result;
}
