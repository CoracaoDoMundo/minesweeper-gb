// Class for header

class Header {
  constructor(container, name = 'Minesweeper') {
    this.item = document.createElement('h1');

    this.item.textContent = name;
    this.item.classList.add('header');

    container.prepend(this.item);
  }
}

export default Header;
