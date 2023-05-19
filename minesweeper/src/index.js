import './index.html';
import './style.css';

import BtnBlock from './scripts/BtnBlock.js';
import Field from './scripts/Field.js';
import Header from './scripts/Header.js';
import Settings from './scripts/SettingsBlock.js';

const gameHeader = new Header(document.body);
const buttonsWrapper = new BtnBlock(document.body);
buttonsWrapper.render();

const gameField = new Field();
gameField.render(document.body);

const settingsBlock = new Settings(document.body);
settingsBlock.render(document.body);
