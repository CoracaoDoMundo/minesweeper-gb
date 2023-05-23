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
  //   setLocalStorage,
  //   getLocalStorage,
} from './scripts/service-functions.js';

const isSoundsOn = {
  state: true,
};
const isMusicOn = {
  state: true,
};

// window.addEventListener('load', () => {
//   if (localStorage.getItem('music')) {
//     const isMusicOn = {
//       state: localStorage.getItem('music'),
//     };
// //   } else if (
// //     localStorage.getItem('music') === 'null' ||
// //     localStorage.getItem('music') === 'undefined'
// //   ) {
// //     const isMusicOn = {
// //       state: true,
// //     };
//   }

//   if (localStorage.getItem('sounds')) {
//     const isPause = {
//       state: localStorage.getItem('sounds'),
//     };
// //   } else if (
// //     localStorage.getItem('sounds') === 'null' ||
// //     localStorage.getItem('sounds') === 'undefined'
// //   ) {
// //     const isPause = {
// //       state: false,
// //     };
//   }
// });

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

const musicBtn = new Button(
  gameField,
  isSoundsOn,
  isMusicOn,
  isPause,
  'Music off'
);
musicBtn.render(buttonsWrapper.item, 'music');
const soundBtn = new Button(
  gameField,
  isSoundsOn,
  isMusicOn,
  isPause,
  'Sounds off'
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

window.addEventListener('load', () => {
  relaunchGameFromLS(gameField);
});

// window.addEventListener('beforeunload', () => {
//   setLocalStorage(isSoundsOn, isMusicOn);
// });
