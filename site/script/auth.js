async function apiCall(resource, method, auth, body = {}) {
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

  if (auth) {
    if (isIdentified()) {
      headers["Authorization"] = `Bearer ${getConnectedUser().tokenUuid}`;
    } else throw new Error("Empty token while required...");
  }

  const Response = await fetch(apiUrl, apiReq);

  if (Response.ok) {
    result = await Response.json();
  }

  return result;
}

export function getConnectedUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function isIdentified() {
  return getConnectedUser() !== null;
}

export async function login(user) {
  console.log("in auth.js login");

  let result = false;

  const loginResult = await apiCall("login", "POST", false, user);

  if (loginResult.errorCode == 0) {
    result = true;
    localStorage.setItem("user", JSON.stringify(loginResult.token));

    const event = new CustomEvent("auth-logedin", {});
    document.dispatchEvent(new CustomEvent("auth-logedin", {}));

    if (!window.location.hash || window.location.hash === "") {
      window.location.hash = "#blog";
    }
  }

  return result;
}
