class NoteError extends HTMLElement {
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
        color: #dc3545;
        padding: 1rem;
        text-align: center;
      }
    `;
  }

  render() {
    this._updateStyle();
    this._shadowRoot.innerHTML = '';
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="error-message">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('note-error', NoteError);
