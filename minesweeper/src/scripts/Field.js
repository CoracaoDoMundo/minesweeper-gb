// Class for game field
// Create field constructor
// Set up size of the board

import Cell from './Cell.js';
import { createElement } from './service-functions.js';

class Field {
  constructor(fieldSize = 10) {
    this.fieldSize = fieldSize;
  }

  setSize(fieldSize) {
    this.fieldSize = fieldSize;
  }

  fillField(width) {
    for (let i = 0; i < this.fieldSize ** 2; i++) {
      const newCell = new Cell(0);
      this.item.innerHTML += newCell.render(width, this.item);
    }
  }

  render(container) {
    const fieldWrapper = createElement('div', ['fieldWrapper'], container);
    const timerWrapper = createElement('div', ['timerWrapper'], fieldWrapper);
    const timer = createElement('span', ['timer'], timerWrapper);
    timer.textContent = '00:00';
    const counter = createElement('span', ['counter'], timerWrapper);
    counter.textContent = '000';
    this.item = createElement('div', ['field'], fieldWrapper);

    console.log(this.item.clientWidth);
    this.fillField(`${this.item.clientWidth / this.fieldSize}px`);
  }
}

export default Field;
