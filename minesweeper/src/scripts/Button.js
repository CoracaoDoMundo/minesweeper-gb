// Class for control buttons

import { createElement } from './service-functions.js';
import buttonSound from '../assets/sounds/button-sound.mp3';

const sound = new Audio(buttonSound);

class Button {
  constructor(field, soundsState, name) {
    this.soundsState = soundsState;
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

  pushBtn = () => {
    this.item.addEventListener('click', (event) => {
      if (this.soundsState.state === true) {
        this.playBtnSound();
      }
      this.restartGame(event);
    });
  };

  restartGame = (event) => {
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
  };
}

export default Button;
