import {} from "./auth.js";

function addMultipleEventListener(element, events, handler) {
  events.forEach(e => element.addEventListener(e, handler))
}

['load', 'touchmove'].forEach(function(e) {
  window.addEventListener(e, mouseMoveHandler);
});



const isConnected_tag = document.getElementById("isConnected")


window.addEventListener("load", (e) => {
  displayStatusPage();

   if (isServerUp()) {
    isConnected_tag.innerHTML = `
     details: ${getStatusDetails()}<br>
     connected`;
    isConnected_tag.style = "color: green;"
  } 
});

function displayStatusPage() {
  console.log("in display Status Page ");
  const mainTag = document.querySelector("main");
  const statusPage_WC = document.createElement("status-page");
  mainTag.innerHTML = "";
  mainTag.appendChild(statusPage_WC);
}

function isServerUp() {
  return 'not implemented yet'
}

function getStatusDetails() {
  return 'not implemented yet'
}