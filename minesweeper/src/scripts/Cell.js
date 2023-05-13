// Class for the cell on the game field
// Create cell constructor
// Set up value after first click of the user method

// import Field from './Field.js';

class Cell {
  constructor(value, width, state = true, mark = false) {
    this.value = value;
    this.width = width;
    this.state = state;
    this.mark = mark;
  }

  setValue(value) {
    this.value = value;
  }

  render() {
    this.item = document.createElement('div');
    this.item.classList.add('closedCell');
    this.item.style.width = this.width;
  }
}

export default Cell;
