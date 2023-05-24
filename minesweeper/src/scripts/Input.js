// Class for crate an input field

import { createElement } from './service-functions.js';
import Popup from './Popup.js';

class Input {
  render(container, labelText, id, field) {
    this.label = createElement('label', ['label'], container);
    this.label.textContent = labelText;
    this.label.setAttribute('for', id);
    this.item = createElement('input', ['input'], container);
    this.item.setAttribute('id', id);
    this.item.setAttribute('type', 'number');
    this.item.setAttribute('min', '10');
    this.item.setAttribute('max', '99');
    this.item.setAttribute('value', '10');
    this.minesQuantity = this.item.value;
    this.field = field;
    this.setMinesQuantity();
  }

  setMinesQuantity() {
    this.item.addEventListener(
      'input',
      () => {
        if (this.item.value > 9 && this.item.value < 100) {
          this.minesQuantity = this.item.value;
        } else if (parseInt(this.item.value) < parseInt(this.item.min)) {
          this.item.value = this.item.min;
          this.minesQuantity = 10;
        } else if (parseInt(this.item.value) > parseInt(this.item.max)) {
          this.item.value = this.item.max;
          this.minesQuantity = 99;
        }
        this.field.restartGame();
      },
      false
    );
  }
}

export default Input;
