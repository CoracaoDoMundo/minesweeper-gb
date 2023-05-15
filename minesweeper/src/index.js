import './index.html';
import './style.css';

import Cell from './scripts/Cell.js';
import Wrapper from './scripts/BtnWrapper.js';
import Field from './scripts/Field.js';
import Header from './scripts/Header.js';
import Button from './scripts/Button.js';

const gameHeader = new Header(document.body);
const buttonsWrapper = new Wrapper(document.body);
buttonsWrapper.render();

const gameField = new Field();
gameField.render(document.body);
