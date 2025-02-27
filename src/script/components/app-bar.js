class AppBar extends HTMLElement {
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
      background: linear-gradient(145deg, #007bff, #0056b3);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
      position: sticky;
      top: 0;
      z-index: 1000;
      transition: all 0.4s ease;
    }

    :host(:hover) {
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
      transform: translateY(-2px);
    }

    div {
      padding: 24px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    .brand-name {
      margin: 0;
      font-size: 2em;
      font-weight: 700;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      letter-spacing: 2px;
      transition: all 0.3s ease;
    }

    .brand-name:hover {
      transform: scale(1.05);
      text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
    }

    @keyframes slideDown {
      0% {
        opacity: 0;
        transform: translateY(-50px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    :host {
      animation: slideDown 0.6s ease-out;
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
        <h1 class="brand-name">Notes App</h1>
      </div>
    `;
  }
}

customElements.define('app-bar', AppBar);
