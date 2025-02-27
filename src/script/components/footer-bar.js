class FooterBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
     :host {
      display: block;
      width: 100%;
      color: white;
      background: linear-gradient(145deg, #2c3e50, #34495e);
      box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.2);
      position: relative;
      z-index: 1000;
      transition: all 0.4s ease;
    }

    :host(:hover) {
      box-shadow: 0 -8px 16px rgba(0, 0, 0, 0.3);
      transform: translateY(-2px);
    }

    div {
      padding: 24px 20px;
      text-align: center;
      font-size: 1.1em;
      font-weight: 500;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
    }

    div:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: scale(1.02);
    }

    @keyframes slideUp {
      0% {
        opacity: 0;
        transform: translateY(50px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    :host {
      animation: slideUp 0.6s ease-out;
    }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `      
      <div>
        Notes App, 2025
      </div>
    `;
  }
}

customElements.define('footer-bar', FooterBar);
