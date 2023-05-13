// Class for game field
// Create field constructor
// Set up size of the board

import Cell from './Cell.js';

class Field {
  constructor(fieldSize = 10) {
    this.fieldSize = fieldSize;
  }

  setSize(fieldSize) {
    this.fieldSize = fieldSize;
  }

  render(container) {
    this.item = document.createElement('div');
    this.item.classList.add('field');

    const fieldWrapper = document.createElement('div');
    fieldWrapper.classList.add('fieldWrapper');
    const timerWrapper = document.createElement('div');
    timerWrapper.classList.add('timerWrapper');
    const timer = document.createElement('span');
    timer.textContent = '00:00';
    const counter = document.createElement('span');
    counter.textContent = '000';

    container.append(fieldWrapper);
    fieldWrapper.append(timerWrapper);
    timerWrapper.append(timer);
    timerWrapper.append(counter);
    fieldWrapper.append(this.item);

    const newCell = new Cell(0, '20px');
    newCell.render();
    this.item.append(newCell);
  }
}

export default Field;
