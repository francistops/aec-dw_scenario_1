import { sendHeartbeat } from "../../script/auth.js";

class HeartbeatStatus extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.polling = null;
    this.pending = false;
    this.totalPings = 0;
    this.successfulPings = 0;
    this.render("loading", 0);
    this.render();
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
    this.totalPings++;

    const result = await sendHeartbeat();
    console

    if (result.status === "online" && result.data.errorCode === 0) {
      this.successfulPings++;
      this.render('online', this.getUptime());
    } else {
      this.render('offline', this.getUptime());
    }

    this.pending = false;
  }

  // on parlais que les jeune ne savent plus faire de moyenne...
  getUptime() {
    if (this.totalPings === 0) return 0;
    return Math.round((this.successfulPings / this.totalPings) * 100);
  }

  render(state, uptime) {
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
          flex-direction: column;
          gap: 0.5em;
          font-family: sans-serif;
        }
        .state {
          display: flex;
          align-items: center;
          gap: 0.5em;
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: ${color};
        }
        .uptime {
          font-size: 0.9em;
          color: #555;
        }
      </style>
      <div class="status">
        <div class="state">
          <span class="dot"></span>
          <span>${text}</span>
        </div>
        <div class="uptime">Uptime : ${uptime}%</div>
      </div>
    `;
  }
}

customElements.define("heartbeat-status", HeartbeatStatus);
