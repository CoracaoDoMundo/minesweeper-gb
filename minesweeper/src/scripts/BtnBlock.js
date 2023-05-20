// Class for buttons container
import Button from './Button.js';
import buttonSound from '../assets/sounds/button-sound.mp3';

import { createElement } from './service-functions.js';

const sound = new Audio(buttonSound);

class BtnBlock {
  constructor(container, soundsState) {
    this.item = createElement('div', ['btnWrapper'], container);
    this.soundsState = soundsState;
    this.sound = sound;
  }

  render() {
    this.soundBtn = new Button(this.item, 'Sound off');
    this.pauseBtn = new Button(this.item, 'Pause');
    this.resultsBtn = new Button(this.item, 'Results');
    this.smallFieldBtn = new Button(this.item, 'Restart');
    this.mediumFieldBtn = new Button(this.item, 'Medium');
    this.largeFieldBtn = new Button(this.item, 'Large');
    this.pushBtn();
  }

  playBtnSound() {
    this.sound.play();
  }

  pushBtn() {
    this.item.addEventListener('click', () => {
      console.log(1);
      this.playBtnSound();
    });
  }
}

export default BtnBlock;
