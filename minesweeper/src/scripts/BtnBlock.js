// Class for buttons container

import { createElement } from './service-functions.js';

class BtnBlock {
  constructor(container, soundsState) {
    this.item = createElement('div', ['btnWrapper'], container);
    this.soundsState = soundsState;
  }
}

export default BtnBlock;
