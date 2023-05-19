// Class for control buttons

import { createElement } from './service-functions.js';

class Button {
  constructor(container, name) {
    this.item = createElement('div', ['button'], container);
    this.item.textContent = name;
  }
}

export default Button;
