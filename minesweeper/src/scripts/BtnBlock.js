// Class for buttons container
// import Button from './Button.js';

import { createElement } from './service-functions.js';

class BtnBlock {
  constructor(container, soundsState) {
    this.item = createElement('div', ['btnWrapper'], container);
    this.soundsState = soundsState;
  }

  // render(container) {
  //   this.item = createElement('div', ['btnWrapper'], container);
  //   this.soundBtn = new Button(this.item, this.soundsState, 'Sound off');
  //   this.pauseBtn = new Button(this.item, this.soundsState, 'Pause');
  //   this.resultsBtn = new Button(this.item, this.soundsState, 'Results');
  //   this.smallFieldBtn = new Button(this.item, this.soundsState, 'Restart');
  //   this.mediumFieldBtn = new Button(this.item, this.soundsState, 'Medium');
  //   this.largeFieldBtn = new Button(this.item, this.soundsState, 'Large');
  // }
}

export default BtnBlock;
