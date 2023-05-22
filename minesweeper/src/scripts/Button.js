// Class for control buttons

import { createElement } from './service-functions.js';
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
    this.item.textContent = this.name;
    this.item.classList.add(newClass);
    this.pushBtn();
  }

  playBtnSound() {
    this.sound.play();
  }

  pushBtn() {
    this.item.addEventListener('click', (event) => {
      if (this.soundsState.state === true) {
        this.playBtnSound();
      }
      this.restartGame(event);
      this.pauseGame(event);
      this.onOffSounds();
      this.onOffMusic();
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
      this.field.restartGame();
    } else if (event.target.textContent === 'Medium') {
      this.item.previousSibling.textContent = 'Small';
      event.target.textContent = 'Restart';
      this.item.nextSibling.textContent = 'Large';
      this.field.fieldSize = 15;
      this.field.restartGame();
    } else if (event.target.textContent === 'Large') {
      this.item.previousSibling.previousSibling.textContent = 'Small';
      this.item.previousSibling.textContent = 'Medium';
      event.target.textContent = 'Restart';
      this.field.fieldSize = 25;
      this.field.restartGame();
    }
  }

  pauseGame(event) {
    const isStarted = () => {
      for (let i = 0; i < this.field.covers[0].length; i++) {
        for (let j = 0; j < this.field.covers.length; j++) {
          if (this.field.covers[i][j].getAttribute('isopen') === 'true') {
            return true;
          }
        }
      }
      return false;
    };

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
      console.log(isStarted());
      if (isStarted() === true) {
        this.field.startTimer();
      }
      document.querySelector('.blocker').remove();
      this.pauseState.state = false;
    }
  }

  onOffSounds() {
    if (this.item.textContent === 'Sound off') {
      this.item.textContent = 'Sound on';
      this.soundsState.state = false;
    } else if (this.item.textContent === 'Sound on') {
      this.item.textContent = 'Sound off';
      this.soundsState.state = true;
    }
  }

  onOffMusic() {
    if (this.item.textContent === 'Music off') {
      this.item.textContent = 'Music on';
      this.musicState.state = false;
      this.field.controlMusicOnPage();
    } else if (this.item.textContent === 'Music on') {
      this.item.textContent = 'Music off';
      this.musicState.state = true;
      this.field.controlMusicOnPage();
    }
  }
}

export default Button;
