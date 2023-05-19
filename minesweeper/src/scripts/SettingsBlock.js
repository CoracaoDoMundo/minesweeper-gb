// Class for settings container

import Input from './Input.js';
import { createElement } from './service-functions.js';

class Settings {
  constructor(container) {
    this.item = createElement('div', ['settingsWrapper'], container);
  }

  render() {
    const input = new Input(this.item, 'How many ghosts you want to bust? ', 'ghostNum');
  }
}

export default Settings;
