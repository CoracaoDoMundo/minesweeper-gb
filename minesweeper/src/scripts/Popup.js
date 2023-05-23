// Class for create popup

import { createElement } from './service-functions.js';

class Popup {
  constructor(container, theme) {
    this.item = createElement('div', ['popup'], container);
    this.theme = theme;
  }

  render() {
    if (this.theme === 'light') {
      this.closeElement = createElement('div', ['close'], this.item);
    } else if (this.theme === 'dark') {
      this.closeElement = createElement(
        'div',
        ['closeDarkTheme'],
        this.item
      );
    }

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
