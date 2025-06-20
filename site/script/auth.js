const BASE_URL = "https://api.amelieroussin.ca/";

export async function sendHeartbeat() {
  const ctrl = new AbortController();
  const timeoutId = setTimeout(() => ctrl.abort(), 3000);

  try {
    const response = await fetch(`${BASE_URL}status/heartbeat`, {
      method: "GET",
      signal: ctrl.signal,
    });

    if (!response.ok || response.status >= 500) throw new Error("Server error");
    else if (!response.ok || response.status >= 400)
      throw new Error("Client error");
    else if (!response.ok) throw new Error("Arcane error");

    const data = await response.json();
    return { status: "online", data };
  } catch (error) {
    return { status: "offline", error };
  } finally {
    clearTimeout(timeoutId);
  }
}
