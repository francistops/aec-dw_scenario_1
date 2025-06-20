import { sendHeartbeat } from "../../script/auth.js";

class HeartbeatStatus extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.polling = null;
    this.pending = false;
    this.render("loading");
  }

  connectedCallback() {
    this.polling = setInterval(() => {
      if (!this.pending) {
        this.checkState();
      }
    }, 5000);

    this.checkState();
  }

  disconnectedCallback() {
    clearInterval(this.polling);
  }

  async checkState() {
    this.pending = true;

    const result = await sendHeartbeat();

    if (result.status === "online" && result.data?.errorCode === 0) {
      this.render('online');
    } else {
      this.render('offline');
    }

    this.pending = false;
  }

  render(state) {
    let color = "gray";
    let text = "Chargement...";

    if (state === "online") {
      color = "green";
      text = "En fonction";
    } else if (state === "offline") {
      color = "red";
      text = "Hors ligne";
    }

    this.shadowRoot.innerHTML = `
      <style>
        .status {
          display: flex;
          align-items: center;
          gap: 0.5em;
          font-family: sans-serif;
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: ${color};
        }
      </style>
      <div class="status">
        <span class="dot"></span>
        <span>${text}</span>
      </div>
    `;
  }
}

customElements.define("heartbeat-status", HeartbeatStatus);
