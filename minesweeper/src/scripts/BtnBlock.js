// Class for buttons container
import Button from './Button.js';
import { createElement } from './service-functions.js';

class BtnBlock {
  constructor(container) {
    this.item = createElement('div', ['btnWrapper'], container);
  }

  render() {
    const sound = new Button(this.item, 'Sound off');
    const pause = new Button(this.item, 'Pause');
    const results = new Button(this.item, 'Results');
    const small = new Button(this.item, 'Restart');
    const medium = new Button(this.item, 'Medium');
    const large = new Button(this.item, 'Large');
  }
}

export default BtnBlock;
