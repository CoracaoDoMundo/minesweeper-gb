import './index.html';
import './style.css';

import BtnBlock from './scripts/BtnBlock.js';
import Field from './scripts/Field.js';
import Header from './scripts/Header.js';
import Settings from './scripts/SettingsBlock.js';

const isSoundsOn = {
  state: true,
};
const isMusicOn = {
  state: false,
};

const gameHeader = new Header(document.body);
const buttonsWrapper = new BtnBlock(document.body, isSoundsOn);
buttonsWrapper.render();

const settingsBlock = new Settings(document.body);
settingsBlock.render(document.body);

const gameField = new Field(settingsBlock.input, isSoundsOn, isMusicOn);
gameField.render(document.body);
