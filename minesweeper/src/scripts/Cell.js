// Class for the cell on the game field
// Create cells for the game field

import { createElement } from './service-functions.js';

class Cell {
  constructor(value, state = false, mark = false) {
    this.value = value;
    this.state = state;
    this.mark = mark;
    this.textContent = value;
  }

  render(parent, num) {
    this.item = createElement('div', ['cell'], parent);
    const valueNum = createElement('span', ['value'], this.item);
    const cover = createElement('div', ['cover'], this.item);
    cover.textContent = num;
    cover.setAttribute('isopen', this.state);
    cover.setAttribute('isflaged', this.mark);
    return this.item.outerHTML;
  }
}

export default Cell;
