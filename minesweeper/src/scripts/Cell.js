// Class for the cell on the game field
// Create cell constructor
// Set up value after first click of the user method

import { createElement } from './service-functions.js';

class Cell {
  constructor(value, state = true, mark = false) {
    this.value = value;
    this.state = state;
    this.mark = mark;
  }

  setValue(value) {
    this.value = value;
  }

  render(width, parent) {
    this.item = createElement('div', ['cell'], parent);
    this.item.style.width = width;
    this.item.style.height = width;
    return this.item.outerHTML;
  }

  // addEventListeners() {
  //   this.item.addEventListener('click', (event) => { console.log(event.target); });
  // }
}

export default Cell;
