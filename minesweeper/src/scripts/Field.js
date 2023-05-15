// Class for game field
// Create field constructor
// Set up size of the board

import Cell from './Cell.js';
import { createElement, createFieldArr } from './service-functions.js';

class Field {
  constructor(fieldSize = 10) {
    this.fieldSize = fieldSize;
    this.counter = 0;
  }

  setSize(fieldSize) {
    this.fieldSize = fieldSize;
  }

  fillField(width) {
    for (let i = 0; i < this.fieldSize ** 2; i++) {
      const newCell = new Cell(i);
      this.item.innerHTML += newCell.render(width, this.item);
    }
  }

  render(container) {
    const fieldWrapper = createElement('div', ['fieldWrapper'], container);
    const timerWrapper = createElement('div', ['timerWrapper'], fieldWrapper);
    this.createTimer(timerWrapper);
    this.createCounter(timerWrapper);
    this.item = createElement('div', ['field'], fieldWrapper);

    this.fillField(`${this.item.clientWidth / this.fieldSize}px`);
    this.addEventListeners();
  }

  createTimer(parent) {
    this.timer = createElement('span', ['timer'], parent);
    this.timer.textContent = '00:00';
  }

  createCounter(parent) {
    this.counter = createElement('span', ['counter'], parent);
    this.counterLength = 3;
    this.counterNum = 0;
    this.counter.textContent = this.counterNum
      .toString()
      .padStart(this.counterLength, '0');
  }

  addEventListeners() {
    this.item.addEventListener('click', (event) => {
      console.log(
        'counter:',
        this.counterNum.toString().padStart(this.counterLength, '0')
      );
      if (this.counterNum === 0) {
        // const fieldArr = createFieldArr(
        //   this.fieldSize,
        //   this.minesQuantity,
        //   this.clickedCell,
        // );
        this.counterNum += 1;
        console.log(event.target);
      }
    });
  }
}

export default Field;
