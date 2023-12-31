import './index.html';
import './style.css';

import BtnBlock from './scripts/BtnBlock.js';
import Button from './scripts/Button.js';
import Field from './scripts/Field.js';
import Header from './scripts/Header.js';
import Settings from './scripts/SettingsBlock.js';
import Input from './scripts/Input.js';
import Toggle from './scripts/Toggle.js';

import {
  relaunchGameFromLS,
  saveSoundsMusicStatesToLS,
  getSoundsStateFromLS,
  getMusicStateFromLS,
} from './scripts/service-functions.js';

const isSoundsOn = {
  state: 'on',
};
const isMusicOn = {
  state: 'on',
};

const isPause = {
  state: false,
};

const gameHeader = new Header(document.body);
const buttonsWrapper = new BtnBlock(document.body, isSoundsOn);

const settingsBlock = new Settings(document.body);
const ghostInput = new Input();
const themeToggle = new Toggle();

const gameField = new Field(
  ghostInput,
  isSoundsOn,
  isMusicOn,
  isPause,
  themeToggle
);
gameField.render(document.body);

window.addEventListener('load', () => {
  if (
    localStorage.getItem('gameField') !== null &&
    localStorage.getItem('gameField') !== undefined
  ) {
    relaunchGameFromLS(gameField);
  }

  if (!localStorage.getItem('musicState')) {
    isMusicOn.state = 'on';
  } else {
    getMusicStateFromLS(gameField);
  }

  if (!localStorage.getItem('soundsState')) {
    isSoundsOn.state = 'on';
  } else {
    getSoundsStateFromLS(gameField);
  }
});

const musicBtn = new Button(
  gameField,
  isSoundsOn,
  isMusicOn,
  isPause,
  'Music off',
);
musicBtn.render(buttonsWrapper.item, 'music');

const soundBtn = new Button(
  gameField,
  isSoundsOn,
  isMusicOn,
  isPause,
  'Sounds off',
);
soundBtn.render(buttonsWrapper.item, 'sound');
const pauseBtn = new Button(gameField, isSoundsOn, isMusicOn, isPause, 'Pause');
pauseBtn.render(buttonsWrapper.item, 'pause');
const resultsBtn = new Button(
  gameField,
  isSoundsOn,
  isMusicOn,
  isPause,
  'Results'
);
resultsBtn.render(buttonsWrapper.item, 'results');
const saveGameBtn = new Button(
  gameField,
  isSoundsOn,
  isMusicOn,
  isPause,
  'Save'
);
saveGameBtn.render(buttonsWrapper.item, 'save');
const smallFieldBtn = new Button(
  gameField,
  isSoundsOn,
  isMusicOn,
  isPause,
  'Restart'
);
smallFieldBtn.render(buttonsWrapper.item, 'small');
const mediumFieldBtn = new Button(
  gameField,
  isSoundsOn,
  isMusicOn,
  isPause,
  'Medium'
);
mediumFieldBtn.render(buttonsWrapper.item, 'medium');
const largeFieldBtn = new Button(
  gameField,
  isSoundsOn,
  isMusicOn,
  isPause,
  'Large'
);
largeFieldBtn.render(buttonsWrapper.item, 'large');

ghostInput.render(
  settingsBlock.item,
  'How many ghosts you want to bust? ',
  'ghostNum',
  gameField
);
themeToggle.render(
  settingsBlock.item,
  'theme',
  'light',
  'toggleLight',
  'toggleDark',
  gameField
);

window.addEventListener('beforeunload', () => {
  saveSoundsMusicStatesToLS(
    gameField.musicState.state,
    gameField.soundsState.state
  );
});
