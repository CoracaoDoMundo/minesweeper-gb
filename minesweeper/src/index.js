import './index.html';
import './style.css';

import Cell from './scripts/Cell.js';
import Wrapper from './scripts/Wrapper.js';
import Field from './scripts/Field.js';
import Header from './scripts/Header.js';
import Button from './scripts/Button.js';

const gameHeader = new Header(document.body);
const buttonsWrapper = new Wrapper(document.body);
buttonsWrapper.render();
// const restart = new Button(buttonsWrapper, 'Restart');
// const pause = new Button(buttonsWrapper, 'Pause');
// const results = new Button(buttonsWrapper, 'Results');

const gameField = new Field();
gameField.render(document.body);
