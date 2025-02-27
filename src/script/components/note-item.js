class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = { id: '', title: '', body: '', archived: false };

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  set note(value) {
    this._note = { ...value };
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
      display: block;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      margin: 1.5rem 0;
      transition: all 0.4s ease;
      transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
      overflow: hidden;
    }

    :host(:hover) {
      transform: perspective(1000px) rotateX(5deg) rotateY(5deg) translateY(-10px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }

    .note-content {
      padding: 2rem;
      background: linear-gradient(145deg, #ffffff, #f9f9f9);
      border-radius: 12px;
      transform: translateZ(0);
      transition: transform 0.4s ease, background 0.4s ease;
    }

    :host(:hover) .note-content {
      transform: translateZ(20px);
      background: linear-gradient(145deg, #ffffff, #f0f0f0);
    }

    h3 {
      margin: 0 0 1rem 0;
      color: #2d3436;
      font-size: 1.5rem;
      font-weight: 700;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    p {
      color: #636e72;
      line-height: 1.6;
      margin: 0 0 2rem 0;
      font-size: 1rem;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    .actions {
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
    }

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
      transform: translateZ(0);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    button:hover {
      transform: translateZ(10px) scale(1.05);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
      opacity: 0.95;
    }

    .delete-btn {
      background: linear-gradient(145deg, #ff7675, #ff5252);
      color: white;
    }

    .archive-btn {
      background: ${this._note.archived ? 'linear-gradient(145deg, #fdcb6e, #f9ca24)' : 'linear-gradient(145deg, #00b894, #00cec9)'};
      color: white;
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    :host(:hover) .note-content {
      animation: float 3s ease-in-out infinite;
    }
    `;
  }

  render() {
    this._updateStyle();
    this._shadowRoot.innerHTML = '';
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="note-content">
        <h3>${this._note.title}</h3>
        <p>${this._note.body}</p>
        <div class="actions">
          <button class="archive-btn">
            ${this._note.archived ? '⤴ Unarchive' : '📦 Archive'}
          </button>
          <button class="delete-btn">🗑 Delete</button>
        </div>
      </div>
    `;

    this._shadowRoot
      .querySelector('.delete-btn')
      .addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('delete-note', {
            detail: { id: this._note.id },
            bubbles: true,
            composed: true,
          })
        );
      });

    this._shadowRoot
      .querySelector('.archive-btn')
      .addEventListener('click', () => {
        const eventType = this._note.archived
          ? 'unarchive-note'
          : 'archive-note';
        this.dispatchEvent(
          new CustomEvent(eventType, {
            detail: { id: this._note.id },
            bubbles: true,
            composed: true,
          })
        );
      });
  }
}

customElements.define('note-item', NoteItem);
