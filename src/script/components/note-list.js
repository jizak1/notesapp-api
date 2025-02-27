class NoteList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
      display: block;
      padding: 2rem;
      background: linear-gradient(145deg, #f9f9f9, #e0e0e0);
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      transition: all 0.4s ease;
    }

    .list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      padding: 1.5rem;
      transform: translateZ(0);
      transition: transform 0.4s ease;
    }

    :host(:hover) .list {
      transform: translateZ(10px);
    }

    @keyframes slideIn {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .list ::slotted(*) {
      animation: slideIn 0.6s ease-out;
      animation-fill-mode: both;
    }

    .list ::slotted(*:nth-child(1)) {
      animation-delay: 0.1s;
    }

    .list ::slotted(*:nth-child(2)) {
      animation-delay: 0.2s;
    }

    .list ::slotted(*:nth-child(3)) {
      animation-delay: 0.3s;
    }

    .list ::slotted(*:nth-child(4)) {
      animation-delay: 0.4s;
    }

    .list ::slotted(*:nth-child(5)) {
      animation-delay: 0.5s;
    }

    .list ::slotted(*:nth-child(6)) {
      animation-delay: 0.6s;
    }

    .list ::slotted(*:nth-child(7)) {
      animation-delay: 0.7s;
    }

    .list ::slotted(*:nth-child(8)) {
      animation-delay: 0.8s;
    }

    .list ::slotted(*:nth-child(9)) {
      animation-delay: 0.9s;
    }

    .list ::slotted(*:nth-child(10)) {
      animation-delay: 1s;
    }
        `;
  }

  render() {
    this._updateStyle();
    this._shadowRoot.innerHTML = '';
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="list">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('note-list', NoteList);
