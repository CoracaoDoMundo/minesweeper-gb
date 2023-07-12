// Class for header
import ghostbusters from '../assets/icons/ghostbusters.svg';

class Header {
  constructor(container, name = 'Ghostbusters') {
    const headerWrapper = document.createElement('div');
    headerWrapper.classList.add('headerWrapper');
    this.item = document.createElement('h1');
    const leftGhost = document.createElement('img');
    leftGhost.classList.add('ghostHeaderPic');
    const rightGhost = document.createElement('img');
    rightGhost.classList.add('ghostHeaderPic');
    leftGhost.src = ghostbusters;
    rightGhost.src = ghostbusters;

    this.item.textContent = name;
    this.item.classList.add('header');

    container.prepend(headerWrapper);
    headerWrapper.prepend(leftGhost);
    headerWrapper.append(this.item);
    headerWrapper.append(rightGhost);
  }
}

export default Header;
