import { sendHeartbeat } from "../../script/auth.js";

class HeartBeatWC extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    async loadContent() {
        /**
         * Renommez vos fichiers selon votre composant à vous
         */
      const [html, css] = await Promise.all([
        fetch('/wc/heart-beat/heart-beat.html').then(res => res.text()),
        fetch('/wc/heart-beat/heart-beat.css').then(res => res.text())
      ]);
  
      const style = document.createElement('style');
      style.textContent = css;
  
      const template = document.createElement('template');
      template.innerHTML = html;
  
      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  
    async connectedCallback() {
      await this.loadContent();

      const sendHeartbeat_btn = this.shadowRoot.getElementById('sendHeartbeatBtn')

      sendHeartbeat_btn.addEventListener('click', async (e) => {
        const result = await sendHeartbeat()
        console.log(result)
      })
    }
  }
  
  customElements.define('heart-beat', HeartBeatWC);
  