// Class for create popup

import { createElement } from './service-functions.js';

class Popup {
  constructor(container) {
    this.item = createElement('div', ['popup'], container);
  }

  render() {
    this.closeElement = createElement('div', ['close'], this.item);
    this.header = createElement('h1', ['popupHeader'], this.item);
    this.text = createElement('p', ['popupText'], this.item);
    this.closePopup();
  }

  closePopup() {
    this.closeElement.addEventListener('click', () => {
      this.item.remove();
    });
  }
}

export default Popup;
