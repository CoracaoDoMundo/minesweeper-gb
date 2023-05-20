// Class for control buttons

import { createElement } from './service-functions.js';
// import buttonSound from '../assets/sounds/button-sound.mp3';

// const sound = new Audio(buttonSound);

class Button {
  constructor(container, name) {
    this.item = createElement('div', ['button'], container);
    this.item.textContent = name;
    // this.soundsState = soundsState;
    // this.sound = sound;
    // this.item.pushRestartBtn();
  }

  // playSound() {
  //   if (this.soundsState.state === true) {
  //     this.sound.play();
  //   }
  // }

  // pushBtn() {
  //   this.addEventListener('click', () => {
  //     console.log(2);
  //     this.playSound();
  //   });
  // }
}

export default Button;
