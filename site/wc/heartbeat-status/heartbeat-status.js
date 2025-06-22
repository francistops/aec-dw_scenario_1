// used AI to get another way to do a WC, end up keeping it due to simplicy and readability.
// it's remind me that I can create and use property.
// got recommended setInterval by the AI and it made sense and operate similarly to a timeout.
// a;so incorporate all the html in one method which is how I would think is the less tedious and more readeable based on our chat in class.



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
  }

  connectedCallback() {
    
    this.polling = setInterval(() => {
      console.log(this.polling + ' ' + this.pending)
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

    // pour le ?. it's kinda neat soo i had to include it https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    const result = await sendHeartbeat();
    if (result.status === "online" && result.data?.errorCode === 0) {
      this.successfulPings++;
      this.render('online', this.getUptime?.());
    } else {
      this.render('offline', this.getUptime?.());
    }

    this.pending = false;
    console.log('statechecked ', result.status)
  }

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
