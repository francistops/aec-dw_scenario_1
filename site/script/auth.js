const BASE_URL = "https://api.amelieroussin.ca/";

export async function sendHeartbeat() {
  const ctrl = new AbortController();
  const timeoutId = setTimeout(() => {
    ctrl.abort()
    console.log('!!! auth.js timer')
  }, 10000);

  try {
    console.log('auth.js => heartbeat sent', new Date().getSeconds())
    console.log(ctrl.signal)
    const response = await fetch(`${BASE_URL}status/heartbeat`, {
      method: "GET", // the default i know
      signal: ctrl.signal,
    });
    console.log('auth.js => heartbeat receive ', response, ctrl) 
    if (!response.ok || response.status >= 500) throw new Error("Server error");
    else if (!response.ok || response.status >= 400) throw new Error("Client error");
    else if (!response.ok) throw new Error("Arcane error");

    const data = await response.json();
    return { status: "online", data };
  } catch (error) {
    return { status: "offline", error };
  } finally { // thsi  code will always execute thus clearing uneeded timer
    clearTimeout(timeoutId);
  }
}
