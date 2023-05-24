// Class for game field
// Create field constructor
// Set up size of the board
// Control game process (start, restart, count moves, control timer)
// Announce victory or loss
// Function for left button click (move)
// Function for right button click (flag)

import Cell from './Cell.js';
import Popup from './Popup.js';
import {
  createElement,
  createFieldArr,
  splitArray,
  setResultToLS,
} from './service-functions.js';
import ghostPic from '../assets/img/ghost_thick_wb.png';
import signPic from '../assets/icons/stop-sign.svg';
import ghostTrap from '../assets/img/ghost-trap.png';
import marshmallowMan from '../assets/img/marshmallow-man.png';
import openCellSound from '../assets/sounds/cell-open.mp3';
import gameOverSound from '../assets/sounds/game-over.mp3';
import victorySound from '../assets/sounds/hooray-sound.mp3';
import markSound from '../assets/sounds/mark-sound.mp3';
import mainTheme from '../assets/sounds/Ray_Parker_Jr._-_Ghostbusters.mp3';

const gameOverAudio = new Audio(gameOverSound);
const openCellAudio = new Audio(openCellSound);
const victoryAudio = new Audio(victorySound);
const markAudio = new Audio(markSound);

class Field {
  constructor(
    input,
    soundsState,
    musicState,
    pauseState,
    toggle,
    fieldSize = 10
  ) {
    this.fieldSize = fieldSize;
    this.counter = 0;
    this.input = input;
    this.closedCells = this.fieldSize ** 2;
    this.gameOverSound = gameOverAudio;
    this.victorySound = victoryAudio;
    this.markSound = markAudio;
    this.soundsState = soundsState;
    this.musicState = musicState;
    this.pauseState = pauseState;
    this.toggle = toggle;
    this.audio = new Audio(mainTheme);
    this.audio.volume = 0.2;
  }

  render(container) {
    const fieldWrapper = createElement('div', ['fieldWrapper'], container);
    this.timerWrapper = createElement('div', ['timerWrapper'], fieldWrapper);
    this.timerText = createElement('span', ['timerText'], this.timerWrapper);
    this.timerText.textContent = 'TIME:';
    this.createTimer(this.timerWrapper);
    this.counterText = createElement(
      'span',
      ['counterText'],
      this.timerWrapper
    );
    this.counterText.textContent = 'MOVES:';
    this.createCounter(this.timerWrapper);
    this.marksText = createElement('span', ['marksText'], this.timerWrapper);
    this.marksText.textContent = 'MARKS:';
    this.createMarksCounter(this.timerWrapper);
    this.item = createElement('div', ['field'], fieldWrapper);

    this.fillStartField();
    this.addEventListeners();
  }

  setSize(fieldSize) {
    this.fieldSize = fieldSize;
  }

  controlMusicOnPage() {
    if (this.musicState.state === true) {
      this.audio.play();
    } else if (this.musicState.state === false) {
      this.audio.pause();
    }
  }

  restartGame() {
    this.counterNum = -1;
    this.countMoves();
    this.item.textContent = '';
    this.fillStartField();
    this.closedCells = this.fieldSize ** 2;
    this.timer.textContent = '00:00';
    this.stopTimer();
    this.relaunchTimer();
    this.marksCounterNum = 0;
    this.rewriteMarksNum();
    if (this.pauseState.state === true) {
      this.pauseState.state = false;
      document.querySelector('.pause').textContent = 'Pause';
    }
  }

  fillStartField() {
    this.cellsArr = [];
    for (let i = 0; i < this.fieldSize ** 2; i++) {
      this.newCell = new Cell();
      this.item.innerHTML += this.newCell.render(this.item, i);
      this.cellsArr.push(this.newCell.item);
    }
    this.covers = splitArray(
      Array.from(document.querySelectorAll('.cover')),
      this.fieldSize
    );
  }

  fillFieldWithValues() {
    for (let i = 0; i < this.fieldArr.flat().length; i++) {
      if (this.fieldArr.flat()[i] === 'g') {
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

  createTimer(parent) {
    this.timer = createElement('span', ['timer'], parent);
    this.s = 0;
    this.seconds = `${this.s}`.padStart(2, '0');
    this.m = 0;
    this.minutes = `${this.m}`.padStart(2, '0');
    this.timer.textContent = `${this.minutes}:${this.seconds}`;
  }

  relaunchTimer() {
    this.s = 0;
    this.m = 0;
  }

  startTimer() {
    this.timerCounter = setInterval(() => {
      this.s += 1;
      if (this.s === 60) {
        this.s = 0;
        this.m += 1;
      }
      this.seconds = `${this.s}`.padStart(2, '0');
      this.minutes = `${this.m}`.padStart(2, '0');
      this.timer.textContent = `${this.minutes}:${this.seconds}`;
    }, 1000);
  }

  stopTimer() {
    clearTimeout(this.timerCounter);
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

  createMarksCounter(parent) {
    this.marksCounter = createElement('span', ['marksCounter'], parent);
    this.marksCounterLength = 2;
    this.marksCounterNum = 0;
    this.marksCounter.textContent = this.marksCounterNum
      .toString()
      .padStart(this.marksCounterLength, '0');
  }

  rewriteMarksNum() {
    this.marksCounter.textContent = this.marksCounterNum
      .toString()
      .padStart(this.marksCounterLength, '0');
  }

  openCells(i, j, covers, values) {
    if (!values[i][j].textContent) {
      covers[i][j].style.background = 'transparent';
      covers[i][j].style.border = 'none';
      covers[i][j].setAttribute('isopen', true);
      for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
          if (k < 0 || l < 0 || k >= this.fieldSize || l >= this.fieldSize) {
            continue;
          } else if (covers[k][l].getAttribute('isopen') === 'true') {
            continue;
          } else if (covers[k][l].getAttribute('isflaged') === 'true') {
            continue;
          } else {
            covers[k][l].style.background = 'transparent';
            covers[k][l].style.border = 'none';
            covers[k][l].setAttribute('isopen', true);
            this.openCells(k, l, covers, values);
          }
        }
      }
    } else if (values[i][j].textContent === '') {
      covers[i][j].style.background = 'transparent';
      covers[i][j].style.border = 'none';
      covers[i][j].setAttribute('isopen', true);
    }
    this.checkForWinning();
  }

  formArrForGame(event) {
    this.fieldArr = createFieldArr(
      this.fieldSize,
      this.input.minesQuantity,
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
    if (this.closedCells === Number(this.input.minesQuantity)) {
      this.stopTimer();
      this.announceVictory();
      setResultToLS(
        `${this.fieldSize}x${this.fieldSize} game with ${this.input.minesQuantity} ghosts - ${this.counterNum} moves and ${this.timer.textContent}|`
      );
    }
  }

  announceVictory() {
    this.controlFieldBlocker();
    for (let i = 0; i < this.covers[0].length; i++) {
      for (let j = 0; j < this.covers.length; j++) {
        this.covers[i][j].setAttribute('isopen', 'true');
        this.covers[i][j].style.background = 'transparent';
        this.covers[i][j].style.border = 'none';
      }
    }
    if (this.soundsState.state === true) {
      this.victorySound.play();
    }
    this.popup = new Popup(document.body, this.toggle.theme);
    this.popup.render();
    this.popup.header.textContent = 'Congratulations!';
    this.popup.text.textContent = `You won the game for ${this.counterNum} moves and ${this.timer.textContent}!`;
    this.popup.item.insertAdjacentHTML(
      'beforeend',
      `<img src="${ghostTrap}" class="ghostTrapPic">`
    );
  }

  controlFieldBlocker() {
    if (this.item.contains(this.blocker)) {
      this.blocker.remove();
    } else {
      this.blocker = createElement('div', ['blocker'], this.item);
      this.item.append(this.blocker);
    }
  }

  addEventListeners() {
    this.item.addEventListener('click', (event) => {
      this.clickLeftBtn(event);
    });

    this.item.addEventListener('contextmenu', (event) => {
      this.clickRightBtn(event);
    });
  }

  clickLeftBtn(event) {
    const num = event.target.textContent;
    this.values = splitArray(
      Array.from(document.querySelectorAll('.value')),
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
    if (
      event.target.className === 'field' ||
      event.target.className === 'cell' ||
      event.target.classList.contains('blocker') ||
      event.target.className === 'signImg' ||
      event.target.className === 'slimerImg' ||
      event.target.getAttribute('isflaged') === 'true'
    ) {
      return;
    } else if (this.counterNum === 0) {
      if (
        event.target.className === 'signImg' ||
        event.target.getAttribute('isflaged') === 'true' ||
        event.target.className === 'field'
      ) {
        return;
      }
      this.controlMusicOnPage();
      this.countMoves();
      this.formArrForGame(event);
      this.fillFieldWithValues();
      this.startTimer();
      event.target.style.background = 'transparent';
      event.target.style.border = 'none';
      event.target.setAttribute('isopen', true);
      this.openCells(x, y, this.covers, this.values);
      if (this.soundsState.state === true) {
        openCellAudio.play();
      }
    } else if (this.fieldArr[x][y] !== 'g') {
      if (event.target.getAttribute('isopen') !== 'true') {
        this.countMoves();
        if (this.soundsState.state === true) {
          openCellAudio.play();
        }
      }
      event.target.style.background = 'transparent';
      event.target.style.border = 'none';
      event.target.setAttribute('isopen', true);
      this.openCells(x, y, this.covers, this.values);
    } else if (this.fieldArr[x][y] === 'g') {
      this.countMoves();
      event.target.style.background = 'transparent';
      event.target.style.border = 'none';
      event.target.setAttribute('isopen', true);
      this.controlFieldBlocker();
      if (this.soundsState.state === true) {
        this.gameOverSound.play();
      }
      this.popup = new Popup(document.body, this.toggle.theme);
      this.popup.render();
      this.popup.header.textContent = 'Sorry, you lose!';
      this.popup.text.textContent = 'No luck this time, try again!';
      this.popup.item.insertAdjacentHTML(
        'beforeend',
        `<img src="${marshmallowMan}" class="marshmallowManPic">`
      );
      this.restartGame();
    } else {
      return;
    }
  }

  clickRightBtn(event) {
    event.preventDefault();
    if (
      event.target.className === 'cover' &&
      event.target.getAttribute('isflaged') === 'false' &&
      event.target.getAttribute('isopen') === 'false'
    ) {
      this.marksCounterNum += 1;
      if (this.soundsState.state === true) {
        this.markSound.play();
      }
      this.rewriteMarksNum();
      event.target.setAttribute('isflaged', 'true');
      event.target.insertAdjacentHTML(
        'afterbegin',
        `<img src="${signPic}" class="signImg">`
      );
    } else if (
      event.target.className === 'cover' &&
      event.target.getAttribute('isflaged') === 'true'
    ) {
      this.marksCounterNum -= 1;
      this.rewriteMarksNum();
      event.target.setAttribute('isflaged', 'false');
      event.target.childNode.remove();
    } else if (
      event.target.className === 'signImg' &&
      event.target.parentNode.getAttribute('isflaged') === 'true'
    ) {
      this.marksCounterNum -= 1;
      this.rewriteMarksNum();
      event.target.parentNode.setAttribute('isflaged', 'false');
      event.target.remove();
    }
  }
}

export default Field;
