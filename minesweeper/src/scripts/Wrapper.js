// Class for multipurpose container
import Button from './Button.js';

class Wrapper {
  constructor(container) {
    this.item = document.createElement('div');

    this.item.classList.add('wrapper');

    container.append(this.item);
  }

  render() {
    const restart = new Button(this.item, 'Restart');
    const pause = new Button(this.item, 'Pause');
    const results = new Button(this.item, 'Results');
  }
}

export default Wrapper;
