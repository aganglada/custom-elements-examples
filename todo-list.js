class TodoList extends HTMLElement {
  constructor() {
    super()

    this._addItem = this._addItem.bind(this)
    this._toggleDisabled = this._toggleDisabled.bind(this)

    this.shadowDOM = this.attachShadow({ mode: 'open' })
    this.shadowDOM.innerHTML = `
      <style>
        form {
          display: inline-block;
          background: grey;
          padding: 10px;
          font-family: Arial;
          color: white;
        }

        input {
          border: 1px solid;
        }

        button {
          border-radius: 0;
          height: 20px;
        }
      </style>
      <form id="form">
        <input id="todo" type="text" placeholder="Add todo" required />
        <button type="submit">Add</button>
        <input type="checkbox" id="disabled" />
        <label for="disabled">Disabled?</label> 
      </form>
      <ul id="list"></ul>
    `

    this.shadowDOM
      .getElementById('form')
      .addEventListener('submit', this._addItem)

    this.shadowDOM
      .getElementById('disabled')
      .addEventListener('click', this._toggleDisabled)
  }

  static get observedAttributes() {
    return ['disabled']
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(val) {
    if (val) {
      this.setAttribute('disabled', '')
    } else {
      this.removeAttribute('disabled')
    }
  }

  connectedCallback() {
    console.log('<todo-list> is on the page')
    const disabled = this.shadowDOM.getElementById('disabled')
    disabled.checked = this.disabled
  }

  attributeChangedCallback(attrName, oldval, newVal) {
    console.log(`Attr: ${attrName} changed from "${oldval}" to "${newVal}"`)
  }

  _addItem(event) {
    event.preventDefault()

    if (this.disabled) return false

    const input = this.shadowDOM.getElementById('todo')
    const item = document.createElement('li')
    item.innerText = input.value
    this.shadowDOM.getElementById('list').appendChild(item)
    input.value = ''
  }

  _toggleDisabled(event) {
    this.disabled = this.shadowDOM.getElementById('disabled').checked
  }
}

window.customElements.define('todo-list', TodoList)
