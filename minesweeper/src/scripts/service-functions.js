const createElement = (tagName, [...classNames], parentNode) => {
  const element = document.createElement(tagName);
  element.classList.add([...classNames]);
  parentNode.append(element);

  return element;
};

const createFieldArr = (fieldSide, minesQuantity, clicked) => {
  const fieldSize = fieldSide ** 2;
  const arr = new Array(fieldSize);
  arr.fill(0);

  let num = minesQuantity;

  while (num > 0) {
    const ghost = Math.floor(Math.random() * fieldSize);
    if (arr[ghost] !== 'ghost' && ghost !== clicked) {
      arr[ghost] = 'ghost';
      num--;
    }
  }

  for (let i = 0; i < fieldSide; i++) {
    const chunk = arr.splice(0, fieldSide);
    arr.push(chunk);
  }

  for (let i = 0; i < arr[0].length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (
        arr[i][j] === 0 &&
        i !== 0 &&
        j !== 0 &&
        i !== arr[0].length - 1 &&
        j !== arr.length - 1
      ) {
        if (arr[i + 1][j] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i - 1][j] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i][j - 1] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i][j + 1] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i - 1][j - 1] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i + 1][j - 1] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i - 1][j + 1] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i + 1][j + 1] === 'ghost') {
          arr[i][j] += 1;
        }
      } else if (arr[i][j] === 0 && i === 0 && j === 0) {
        if (arr[i + 1][j] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i][j + 1] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i + 1][j + 1] === 'ghost') {
          arr[i][j] += 1;
        }
      } else if (
        arr[i][j] === 0 &&
        i === arr[0].length - 1 &&
        j === arr.length - 1
      ) {
        if (arr[i - 1][j] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i][j - 1] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i - 1][j - 1] === 'ghost') {
          arr[i][j] += 1;
        }
      } else if (arr[i][j] === 0 && i === arr[0].length - 1 && j === 0) {
        if (arr[i - 1][j] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i][j + 1] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i - 1][j + 1] === 'ghost') {
          arr[i][j] += 1;
        }
      } else if (arr[i][j] === 0 && i === 0 && j === arr.length - 1) {
        if (arr[i + 1][j] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i][j - 1] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i + 1][j + 1] === 'ghost') {
          arr[i][j] += 1;
        }
      } else if (arr[i][j] === 0 && i === 0) {
        if (arr[i + 1][j] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i][j - 1] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i][j + 1] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i + 1][j - 1] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i + 1][j + 1] === 'ghost') {
          arr[i][j] += 1;
        }
      } else if (arr[i][j] === 0 && i === arr[0].length - 1) {
        if (arr[i - 1][j] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i][j - 1] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i][j + 1] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i - 1][j - 1] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i - 1][j + 1] === 'ghost') {
          arr[i][j] += 1;
        }
      } else if (arr[i][j] === 0 && j === 0) {
        if (arr[i - 1][j] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i + 1][j] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i][j + 1] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i - 1][j + 1] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i + 1][j + 1] === 'ghost') {
          arr[i][j] += 1;
        }
      } else if (arr[i][j] === 0 && j === arr.length - 1) {
        if (arr[i - 1][j] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i + 1][j] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i][j - 1] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i - 1][j - 1] === 'ghost') {
          arr[i][j] += 1;
        }
        if (arr[i + 1][j - 1] === 'ghost') {
          arr[i][j] += 1;
        }
      }
    }
  }
  return arr;
};

// console.log(createFieldArr(10, 10, 87));

export { createElement, createFieldArr };
