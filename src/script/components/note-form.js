class NoteForm extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');

    this._updateStyle();
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
      display: block;
      margin-bottom: 3rem;
      padding: 2rem;
      background: linear-gradient(145deg, #f9f9f9, #e0e0e0);
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      transition: all 0.4s ease;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      max-width: 600px;
      margin: 0 auto;
      padding: 2rem;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      transform: translateZ(0);
      transition: transform 0.4s ease, box-shadow 0.4s ease;
    }

    :host(:hover) form {
      transform: translateZ(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }

    input, textarea {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #f9f9f9;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    input:focus, textarea:focus {
      border-color: #007bff;
      outline: none;
      background: #ffffff;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 8px rgba(0, 123, 255, 0.3);
    }

    textarea {
      resize: vertical;
      min-height: 120px;
    }

    button {
      padding: 1rem 2rem;
      background: linear-gradient(145deg, #007bff, #0056b3);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    button:hover {
      background: linear-gradient(145deg, #0056b3, #003d80);
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    button:active {
      transform: translateY(0);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    form {
      animation: fadeIn 0.6s ease-out;
    }
    `;
  }

  connectedCallback() {
    this._shadowRoot
      .querySelector('form')
      .addEventListener('submit', (e) => this._handleSubmit(e));
  }

  _handleSubmit(e) {
    e.preventDefault();
    const title = this._shadowRoot.getElementById('title').value;
    const body = this._shadowRoot.getElementById('body').value;

    if (!title || !body) return;

    this.dispatchEvent(
      new CustomEvent('note-added', {
        detail: { title, body },
        bubbles: true,
      })
    );

    e.target.reset();
  }

  render() {
    this._shadowRoot.innerHTML = '';
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <form>
        <input type="text" id="title" placeholder="Note title" required>
        <textarea id="body" placeholder="Note content" rows="4" required></textarea>
        <button type="submit">Add Note</button>
      </form>
    `;
  }
}

customElements.define('note-form', NoteForm);
