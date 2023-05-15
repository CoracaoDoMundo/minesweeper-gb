// Class for game field
// Create field constructor
// Set up size of the board

import Cell from './Cell.js';
import { createElement, createFieldArr } from './service-functions.js';
import ghostPic from '../assets/img/ghost.png';

class Field {
  constructor(fieldSize = 10) {
    this.fieldSize = fieldSize;
    this.counter = 0;
    this.minesQuantity = 40;
  }

  setSize(fieldSize) {
    this.fieldSize = fieldSize;
  }

  fillStartField(width) {
    for (let i = 0; i < this.fieldSize ** 2; i++) {
      const newCell = new Cell();
      this.item.innerHTML += newCell.render(width, this.item, i);
    }
  }

  fillFieldWithValues(fieldArr) {
    for (let i = 0; i < fieldArr.length; i++) {
      if (fieldArr[i] === 'ghost') {
        document.querySelectorAll('.value')[i].textContent = '';
        document
          .querySelectorAll('.value')
          [i].insertAdjacentHTML(
            'afterbegin',
            `<img src="${ghostPic}" class="ghostImg">`,
          );
      } else if (fieldArr[i] === 0) {
        document.querySelectorAll('.value')[i].textContent = '';
      } else {
        if (fieldArr[i] === 8) {
          document.querySelectorAll('.value')[i].style.color = '#470100';
        } else if (fieldArr[i] === 7) {
          document.querySelectorAll('.value')[i].style.color = '#6b0200';
        } else if (fieldArr[i] === 6) {
          document.querySelectorAll('.value')[i].style.color = '#8e0200';
        } else if (fieldArr[i] === 5) {
          document.querySelectorAll('.value')[i].style.color = '#b20300';
        } else if (fieldArr[i] === 4) {
          document.querySelectorAll('.value')[i].style.color = '#d60400';
        } else if (fieldArr[i] === 3) {
          document.querySelectorAll('.value')[i].style.color = '#f90400';
        } else if (fieldArr[i] === 2) {
          document.querySelectorAll('.value')[i].style.color = '#ff4542';
        } else if (fieldArr[i] === 1) {
          document.querySelectorAll('.value')[i].style.color = '#ff6866';
        }
        document.querySelectorAll('.value')[i].textContent = fieldArr[i];
      }
    }
  }

  render(container) {
    const fieldWrapper = createElement('div', ['fieldWrapper'], container);
    const timerWrapper = createElement('div', ['timerWrapper'], fieldWrapper);
    this.createTimer(timerWrapper);
    this.createCounter(timerWrapper);
    this.item = createElement('div', ['field'], fieldWrapper);

    this.fillStartField(`${this.item.clientWidth / this.fieldSize}px`);
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

  countMoves() {
    this.counterNum += 1;
    this.counter.textContent = this.counterNum
      .toString()
      .padStart(this.counterLength, '0');
  }

  addEventListeners() {
    this.item.addEventListener('click', (event) => {
      this.clickLeftBtn(event);
    });
  }

  clickLeftBtn(event) {
    if (this.counterNum === 0) {
      // console.log('clicked num:', Number(event.target.textContent));
      const fieldArr = createFieldArr(
        this.fieldSize,
        this.minesQuantity,
        Number(event.target.textContent)
      );
      this.countMoves();
      // console.log('field arr:', fieldArr);
      this.fillFieldWithValues(fieldArr);

      // console.log(fieldArr);
      console.log('event.target:', event.target.textContent);
      event.target.remove();
      // console.log(typeof Number(event.target.textContent));
    } else {
      this.countMoves();
    }
  }
}

export default Field;
