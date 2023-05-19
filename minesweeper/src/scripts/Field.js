// Class for game field
// Create field constructor
// Set up size of the board

import Cell from './Cell.js';
import {
  createElement,
  createFieldArr,
  splitArray,
} from './service-functions.js';
import ghostPic from '../assets/img/ghost_thick_wb.png';

class Field {
  constructor(fieldSize = 10) {
    this.fieldSize = fieldSize;
    this.counter = 0;
    this.minesQuantity = 10;
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

  fillFieldWithValues() {
    for (let i = 0; i < this.fieldArr.flat().length; i++) {
      if (this.fieldArr.flat()[i] === 'ghost') {
        document.querySelectorAll('.value')[i].textContent = '';
        document
          .querySelectorAll('.value')
          [i].insertAdjacentHTML(
            'afterbegin',
            `<img src="${ghostPic}" class="ghostImg">`
          );
      } else if (this.fieldArr.flat()[i] === 0) {
        document.querySelectorAll('.value')[i].textContent = '';
      } else {
        if (this.fieldArr.flat()[i] === 8) {
          document.querySelectorAll('.value')[i].style.color = '#470100';
        } else if (this.fieldArr.flat()[i] === 7) {
          document.querySelectorAll('.value')[i].style.color = '#6b0200';
        } else if (this.fieldArr.flat()[i] === 6) {
          document.querySelectorAll('.value')[i].style.color = '#8e0200';
        } else if (this.fieldArr.flat()[i] === 5) {
          document.querySelectorAll('.value')[i].style.color = '#b20300';
        } else if (this.fieldArr.flat()[i] === 4) {
          document.querySelectorAll('.value')[i].style.color = '#d60400';
        } else if (this.fieldArr.flat()[i] === 3) {
          document.querySelectorAll('.value')[i].style.color = '#f90400';
        } else if (this.fieldArr.flat()[i] === 2) {
          document.querySelectorAll('.value')[i].style.color = '#ff4542';
        } else if (this.fieldArr.flat()[i] === 1) {
          document.querySelectorAll('.value')[i].style.color = '#ff6866';
        }
        document.querySelectorAll('.value')[i].textContent =
          this.fieldArr.flat()[i];
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

  openCells(i, j, covers, values) {
    if (!values[i][j].textContent) {
      covers[i][j].style.background = 'transparent';
      covers[i][j].setAttribute('isopen', true);
      for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
          if (k < 0 || l < 0 || k >= this.fieldSize || l >= this.fieldSize) {
            continue;
          } else if (covers[k][l].getAttribute('isopen') === 'true') {
            continue;
          } else {
            covers[k][l].style.background = 'transparent';
            covers[k][l].setAttribute('isopen', true);
            this.openCells(k, l, covers, values);
          }
        }
      }
    } else if (values[i][j].textContent === '') {
      covers[i][j].style.background = 'transparent';
      covers[i][j].setAttribute('isopen', true);
    }
  }

  formArrForGame(event) {
    this.fieldArr = createFieldArr(
      this.fieldSize,
      this.minesQuantity,
      Number(event.target.textContent)
    );
  }

  checkForWinning() {
    this.closedCells = 0;
    for (let i = 0; i < this.covers[0].length; i++) {
      for (let j = 0; j < this.covers.length; j++) {
        if (this.covers[i][j].getAttribute('isopen') === 'false') {
          this.closedCells += 1;
        }
      }
    }
    this.announceVictory();
  }

  announceVictory() {
    if (this.closedCells === this.minesQuantity) {
      alert('You won!');
    }
  }

  addEventListeners() {
    this.item.addEventListener('click', (event) => {
      this.clickLeftBtn(event);
    });
  }

  clickLeftBtn(event) {
    const num = event.target.textContent;
    this.values = splitArray(
      Array.from(document.querySelectorAll('.value')),
      this.fieldSize
    );
    this.covers = splitArray(
      Array.from(document.querySelectorAll('.cover')),
      this.fieldSize
    );
    let x;
    let y;
    for (let i = 0; i < this.covers[0].length; i++) {
      for (let j = 0; j < this.covers.length; j++) {
        if (this.covers[i][j].textContent === num) {
          x = i;
          y = j;
        }
      }
    }
    if (this.counterNum === 0) {
      this.countMoves();
      this.formArrForGame(event);
      this.fillFieldWithValues();
      event.target.style.background = 'transparent';
      event.target.setAttribute('isopen', true);
      this.openCells(x, y, this.covers, this.values);
      this.checkForWinning();
    } else if (this.fieldArr[x][y] !== 'ghost') {
      this.countMoves();
      event.target.style.background = 'transparent';
      event.target.setAttribute('isopen', true);
      this.openCells(x, y, this.covers, this.values);
      this.checkForWinning();
    } else if (this.fieldArr[x][y] === 'ghost') {
      this.countMoves();
      event.target.style.background = 'transparent';
      event.target.setAttribute('isopen', true);
      this.checkForWinning();
      alert('game over!');
    }
  }
}

export default Field;
