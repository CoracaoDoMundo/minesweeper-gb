// Class for settings container

import { createElement } from './service-functions.js';

class Settings {
  constructor(container) {
    this.item = createElement('div', ['settingsWrapper'], container);
  }
}

export default Settings;
