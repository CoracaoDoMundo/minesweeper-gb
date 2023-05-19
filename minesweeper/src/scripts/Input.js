// Class for input field

import { createElement } from './service-functions.js';

class Input {
  constructor(container, labelText, id) {
    const label = createElement('label', ['label'], container);
    label.textContent = labelText;
    label.setAttribute('for', id);
    this.item = createElement('input', ['input'], container);
    this.item.setAttribute('id', id);
    this.item.setAttribute('type', 'number');
    this.item.setAttribute('min', '10');
    this.item.setAttribute('max', '99');
    this.item.setAttribute('value', '10');
  }
}

export default Input;
