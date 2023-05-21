import './index.html';
import './style.css';

import BtnBlock from './scripts/BtnBlock.js';
import Button from './scripts/Button.js';
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
// buttonsWrapper.render(document.body);

const settingsBlock = new Settings(document.body);
settingsBlock.render(document.body);

const gameField = new Field(settingsBlock.input, isSoundsOn, isMusicOn);
gameField.render(document.body);

const musicBtn = new Button(gameField, isSoundsOn, 'Music off');
musicBtn.render(buttonsWrapper.item, 'music');
const soundBtn = new Button(gameField, isSoundsOn, 'Sound off');
soundBtn.render(buttonsWrapper.item, 'sound');
const pauseBtn = new Button(gameField, isSoundsOn, 'Pause');
pauseBtn.render(buttonsWrapper.item, 'pause');
const resultsBtn = new Button(gameField, isSoundsOn, 'Results');
resultsBtn.render(buttonsWrapper.item, 'results');
const smallFieldBtn = new Button(gameField, isSoundsOn, 'Restart');
smallFieldBtn.render(buttonsWrapper.item, 'small');
const mediumFieldBtn = new Button(gameField, isSoundsOn, 'Medium');
mediumFieldBtn.render(buttonsWrapper.item, 'medium');
const largeFieldBtn = new Button(gameField, isSoundsOn, 'Large');
largeFieldBtn.render(buttonsWrapper.item, 'large');
