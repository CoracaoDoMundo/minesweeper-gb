// Class for toggle button to switch theme

import { createElement } from './service-functions.js';

class Toggle {
  render(container, name, theme, idLight, idDark, field) {
    this.item = createElement('div', ['toggleField'], container);
    this.inputLight = createElement('input', ['inputToggleLight'], this.item);
    this.inputLight.setAttribute('id', idLight);
    this.inputLight.setAttribute('type', 'radio');
    this.inputLight.value = 'light';
    this.inputLight.setAttribute('name', name);
    this.inputLight.checked = true;
    this.labelLight = createElement('label', ['labelToggleLight'], this.item);
    this.labelLight.setAttribute('for', idLight);
    this.inputDark = createElement('input', ['inputToggleDark'], this.item);
    this.inputDark.setAttribute('id', idDark);
    this.inputDark.setAttribute('type', 'radio');
    this.inputDark.value = 'dark';
    this.inputDark.setAttribute('name', name);
    this.labelDark = createElement('label', ['labelToggleDark'], this.item);
    this.labelDark.setAttribute('for', idDark);
    this.theme = theme;
    this.field = field;
    this.switchTheme();
  }

  switchTheme() {
    this.item.addEventListener('click', (event) => {
      if (event.target.className === 'inputToggleLight' || event.target.className === 'labelToggleLight') {
        document.body.style.setProperty('--main-color', '#000000');
        document.body.style.setProperty('--second-color', '#ffffff');
        document.body.style.setProperty('--shadow-main-color', '#0000008a');
        document.querySelector('.close').classList.remove('closeDarkTheme');
        this.theme = 'light';
      } else if (event.target.className === 'inputToggleDark' || event.target.className === 'labelToggleDark') {
        document.body.style.setProperty('--main-color', '#ffffff');
        document.body.style.setProperty('--second-color', '#000000');
        document.body.style.setProperty('--shadow-main-color', '#ffffff8a');
        document.querySelector('.close').classList.add('closeDarkTheme');
        this.theme = 'dark';
      }
    });
  }
}

export default Toggle;
