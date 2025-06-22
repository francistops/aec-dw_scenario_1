window.addEventListener("load", (e) => {
  displayHeartbeat();
});

function displayHeartbeat() {
  const mainTag = document.querySelector("main");
  const heartbeatStatus_WC = document.createElement("heartbeat-status");
  mainTag.innerHTML = "";
  mainTag.appendChild(heartbeatStatus_WC);
}
