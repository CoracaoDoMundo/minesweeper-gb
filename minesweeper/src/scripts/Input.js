// Class for input field

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
    this.item.addEventListener('focusin', () => {
      this.popup = new Popup(document.body);
      this.popup.render();
      this.popup.header.textContent = 'Attention!';
      this.popup.text.textContent = 'This will restart the game!';
      this.popup.item.insertAdjacentHTML(
        'beforeend',
        '<p class="popupText"> Are you sure you want to do this? </p>'
      );
    });

    this.item.addEventListener(
      'input',
      () => {
        this.minesQuantity = this.item.value;
        this.field.restartGame();
      },
      false
    );
  }
}

export default Input;
