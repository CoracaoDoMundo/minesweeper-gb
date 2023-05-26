// Class for control buttons and their functionality (levels, sounds, music, pause, results)
// Method for form results board

import {
  createElement,
  getResultFromLS,
  saveGameToLS,
} from './service-functions.js';
import Popup from './Popup.js';
import buttonSound from '../assets/sounds/button-sound.mp3';
import slimerPic from '../assets/img/slimer.png';

const sound = new Audio(buttonSound);

class Button {
  constructor(field, soundsState, musicState, pauseState, name) {
    this.soundsState = soundsState;
    this.musicState = musicState;
    this.pauseState = pauseState;
    this.name = name;
    this.sound = sound;
    this.field = field;
  }

  render(container, newClass = 'button') {
    this.item = createElement('div', ['button'], container);
    this.item.classList.add(newClass);
    if (this.item.classList.contains('music') && localStorage.getItem('musicState') === 'off') {
      this.name = 'Music on';
    }
    if (this.item.classList.contains('sound') && localStorage.getItem('soundsState') === 'off') {
      this.name = 'Sounds on';
    }
    this.item.textContent = this.name;
    this.pushBtn();
  }

  playBtnSound() {
    this.sound.play();
  }

  pushBtn() {
    this.item.addEventListener('click', (event) => {
      if (this.soundsState.state === 'on') {
        this.playBtnSound();
      }
      this.restartGame(event);
      this.pauseGame(event);
      this.onOffSounds();
      this.onOffMusic();
      this.showResults(event);
      this.saveGame(event);
    });
  }

  restartGame(event) {
    if (event.target.textContent === 'Restart') {
      this.field.restartGame();
    } else if (event.target.textContent === 'Small') {
      event.target.textContent = 'Restart';
      this.item.nextSibling.textContent = 'Medium';
      this.item.nextSibling.nextSibling.textContent = 'Large';
      this.field.fieldSize = 10;
      document.documentElement.style.setProperty('--cell-num', 10);
      this.field.restartGame();
    } else if (event.target.textContent === 'Medium') {
      this.item.previousSibling.textContent = 'Small';
      event.target.textContent = 'Restart';
      this.item.nextSibling.textContent = 'Large';
      this.field.fieldSize = 15;
      document.documentElement.style.setProperty('--cell-num', 15);
      this.field.restartGame();
    } else if (event.target.textContent === 'Large') {
      this.item.previousSibling.previousSibling.textContent = 'Small';
      this.item.previousSibling.textContent = 'Medium';
      event.target.textContent = 'Restart';
      this.field.fieldSize = 25;
      document.documentElement.style.setProperty('--cell-num', 25);
      this.field.restartGame();
    }
  }

  pauseGame(event) {
    const isStarted = () => {
      let opened = 0;
      let closed = 0;
      for (let i = 0; i < this.field.covers[0].length; i++) {
        for (let j = 0; j < this.field.covers.length; j++) {
          if (this.field.covers[i][j].getAttribute('isopen') === 'true') {
            opened += 1;
          } else if (
            this.field.covers[i][j].getAttribute('isopen') === 'false'
          ) {
            closed += 1;
          }
        }
      }
      if (opened !== 0 && closed !== 0) {
        return true;
      }
      return false;
    };

    if (isStarted() === true) {
      if (event.target.textContent === 'Pause') {
        this.item.textContent = 'Continue';
        this.field.stopTimer();
        this.field.controlFieldBlocker();
        document.querySelector('.blocker').classList.add('pauseBlocker');
        document
          .querySelector('.blocker')
          .insertAdjacentHTML(
            'afterbegin',
            `<img src="${slimerPic}" class="slimerImg">`
          );
        this.pauseState.state = true;
      } else if (event.target.textContent === 'Continue') {
        this.item.textContent = 'Pause';

        this.field.startTimer();

        document.querySelector('.blocker').remove();
        this.pauseState.state = false;
      }
    }
  }

  onOffSounds() {
    if (this.item.textContent === 'Sounds on' || this.item.textContent === 'Sounds off') {
      if (this.soundsState.state === 'on') {
        this.item.textContent = 'Sounds on';
        this.soundsState.state = 'off';
      } else if (this.soundsState.state === 'off') {
        this.item.textContent = 'Sounds off';
        this.soundsState.state = 'on';
      }
    }
  }

  onOffMusic() {
    if (this.item.textContent === 'Music on' || this.item.textContent === 'Music off') {
      if (this.musicState.state === 'on') {
        this.item.textContent = 'Music on';
        this.musicState.state = 'off';
        this.field.controlMusicOnPage();
      } else if (this.musicState.state === 'off') {
        this.item.textContent = 'Music off';
        this.musicState.state = 'on';
        this.field.controlMusicOnPage();
      }
    }
  }

  showResults(event) {
    console.log(this.popup);
    if (event.target.textContent === 'Results') {
      this.popup = new Popup(document.body, this.field.toggle.theme);
      this.popup.render();
      this.popup.popupOpen = true;
      this.popup.header.textContent = 'Results';
      const result = getResultFromLS();
      if (result === null || result === undefined) {
        this.popup.item.insertAdjacentHTML(
          'beforeend',
          `<p class="popupText">There are no results yet.</p>`
        );
        this.popup.item.insertAdjacentHTML(
          'beforeend',
          `<p class="popupText">Play and change it!</p>`
        );
      } else {
        let resultArr = result.split('');
        const numOfResults = resultArr.filter((el) => el === '|').length;
        for (let i = 0; i < numOfResults; i++) {
          const table = `${i + 1}.`;
          const index = resultArr.findIndex((el) => el === '|');
          const chunk = resultArr
            .splice(0, index + 1)
            .slice(0, -1)
            .join('');
          this.popup.item.insertAdjacentHTML(
            'beforeend',
            `<p class="popupTextSmall">${table} ${chunk}</p>`
          );
        }
      }
    }
  }

  saveGame(event) {
    if (event.target.textContent === 'Save') {
      saveGameToLS(
        this.field.item.innerHTML,
        this.field.fieldArr,
        this.field.fieldSize,
        this.field.s,
        this.field.m,
        this.field.counterNum,
        this.field.marksCounterNum,
      );
    }
  }
}

export default Button;
