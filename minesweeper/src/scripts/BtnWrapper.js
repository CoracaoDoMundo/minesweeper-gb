// Class for multipurpose container
import Button from './Button.js';

class BtnWrapper {
  constructor(container) {
    this.item = document.createElement('div');

    this.item.classList.add('btnWrapper');

    container.append(this.item);
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

export default BtnWrapper;
