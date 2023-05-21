// Class for game field
// Create field constructor
// Set up size of the board
// Control game process (start, restart, count moves, control timer)
// Announce victory or loss

import Cell from './Cell.js';
import {
  createElement,
  createFieldArr,
  splitArray,
} from './service-functions.js';
import ghostPic from '../assets/img/ghost_thick_wb.png';
import signPic from '../assets/icons/stop-sign.svg';
import openCellSound from '../assets/sounds/cell-open.mp3';
import gameOverSound from '../assets/sounds/game-over.mp3';
import mainTheme from '../assets/sounds/Ray_Parker_Jr._-_Ghostbusters.mp3';

const gameOverAudio = new Audio(gameOverSound);
const openCellAudio = new Audio(openCellSound);

class Field {
  constructor(input, soundsState, musicState, pauseState, fieldSize = 10) {
    this.fieldSize = fieldSize;
    this.counter = 0;
    this.input = input;
    this.closedCells = this.fieldSize ** 2;
    this.gameOverSound = gameOverAudio;
    this.soundsState = soundsState;
    this.musicState = musicState;
    this.pauseState = pauseState;
    this.audio = new Audio(mainTheme);
    this.audio.volume = 0.2;
  }

  render(container) {
    const fieldWrapper = createElement('div', ['fieldWrapper'], container);
    this.timerWrapper = createElement('div', ['timerWrapper'], fieldWrapper);
    this.createTimer(this.timerWrapper);
    this.createCounter(this.timerWrapper);
    this.item = createElement('div', ['field'], fieldWrapper);

    this.fillStartField(`${this.item.clientWidth / this.fieldSize}px`);
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
    this.fillStartField(`${this.item.clientWidth / this.fieldSize}px`);
    this.closedCells = this.fieldSize ** 2;
    this.timer.textContent = '00:00';
    this.stopTimer();
    this.relaunchTimer();
    if (this.pauseState.state === true) {
      this.pauseState.state = false;
      document.querySelector('.pause').textContent = 'Pause';
    }
  }

  fillStartField(width) {
    for (let i = 0; i < this.fieldSize ** 2; i++) {
      const newCell = new Cell();
      this.item.innerHTML += newCell.render(width, this.item, i);
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
          } else if (covers[k][l].getAttribute('isflaged') === 'true') {
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
    }
  }

  announceVictory() {
    this.controlFieldBlocker();
    for (let i = 0; i < this.covers[0].length; i++) {
      for (let j = 0; j < this.covers.length; j++) {
        this.covers[i][j].setAttribute('isopen', 'true');
        this.covers[i][j].style.background = 'transparent';
      }
    }
    alert(
      `You won the game for ${this.counterNum} moves and ${this.timer.textContent}!`
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
    if (this.counterNum === 0) {
      if (event.target.className === 'signImg'
        || event.target.getAttribute('isflaged') === 'true') { 
        return;
      }
      this.controlMusicOnPage();
      this.countMoves();
      this.formArrForGame(event);
      this.fillFieldWithValues();
      this.startTimer();
      event.target.style.background = 'transparent';
      event.target.setAttribute('isopen', true);
      this.openCells(x, y, this.covers, this.values);
      if (this.soundsState.state === true) {
        openCellAudio.play();
      }
    } else if (event.target.className === 'blocker') {
      return;
    } else if (event.target.className === 'signImg'
      || event.target.getAttribute('isflaged') === 'true') { 
      return;
    } else if (this.fieldArr[x][y] !== 'g') {
      if (event.target.getAttribute('isopen') !== 'true') {
        this.countMoves();
        if (this.soundsState.state === true) {
          openCellAudio.play();
        }
      }
      event.target.style.background = 'transparent';
      event.target.setAttribute('isopen', true);
      this.openCells(x, y, this.covers, this.values);
    } else if (this.fieldArr[x][y] === 'g') {
      this.countMoves();
      event.target.style.background = 'transparent';
      event.target.setAttribute('isopen', true);
      this.controlFieldBlocker();
      if (this.soundsState.state === true) {
        this.gameOverSound.play();
      }
      alert('game over!');
      this.restartGame();
    }
  }

  clickRightBtn(event) {
    event.preventDefault();
    console.log(event.target.parentNode);
    if (
      event.target.className === 'cover'
      && event.target.getAttribute('isflaged') === 'false'
    ) {
      event.target.setAttribute('isflaged', 'true');
      event.target.insertAdjacentHTML(
        'afterbegin',
        `<img src="${signPic}" class="signImg">`
      );
    } else if (
      event.target.className === 'cover'
      && event.target.getAttribute('isflaged') === 'true'
    ) {
      event.target.setAttribute('isflaged', 'false');
      event.target.childNode.remove();
    } else if (
      event.target.className === 'signImg'
      && event.target.parentNode.getAttribute('isflaged') === 'true'
    ) {
      event.target.parentNode.setAttribute('isflaged', 'false');
      event.target.remove();
    }
  }
}

export default Field;
