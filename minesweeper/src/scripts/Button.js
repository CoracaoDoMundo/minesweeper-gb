// Class for control buttons

class Button {
  constructor(container, name) {
    this.item = document.createElement('button');

    this.item.textContent = name;
    this.item.classList.add('button');

    container.append(this.item);
  }
}

export default Button;
