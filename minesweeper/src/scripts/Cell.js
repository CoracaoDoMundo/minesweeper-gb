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
    const item = createElement('div', ['cell'], parent);
    item.style.width = width;
    item.style.height = width;
    return item.outerHTML;
  }
}

export default Cell;
