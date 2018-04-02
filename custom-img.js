class BiggerImg extends HTMLImageElement {
  constructor() {
    super()

    this.width = this.width * 10
    this.height = this.height * 10
  }
}

customElements.define('bigger-img', BiggerImg, { extends: 'img' })
