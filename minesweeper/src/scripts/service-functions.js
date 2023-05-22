// Create element function
// Create array for game field function
// Form two dimensional array function
// Set and get results for local storage functions

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
    if (arr[ghost] !== 'g' && ghost !== clicked) {
      arr[ghost] = 'g';
      num--;
    }
  }

  for (let i = 0; i < fieldSide; i++) {
    const chunk = arr.splice(0, fieldSide);
    arr.push(chunk);
  }

  for (let i = 0; i < arr[0].length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] === 'g') {
        for (let k = i - 1; k <= i + 1; k++) {
          for (let l = j - 1; l <= j + 1; l++) {
            if (k < 0 || l < 0 || k >= arr[0].length || l >= arr[0].length) {
              continue;
            } else {
              if (arr[k][l] !== 'g') {
                arr[k][l] += 1;
              }
            }
          }
        }
      }
    }
  }
  return arr;
};

const splitArray = (array, fieldSide) => {
  const arr = [];
  for (let i = 0; i <= fieldSide - 1; i++) {
    const piece = array.splice(0, fieldSide);
    arr.push(piece);
  }
  return arr;
};

const setResultToLS = (result) => {
  let res = localStorage.getItem('result');
  if (res !== null) {
    const resArr = Array.from(res);
    const numOfResults = resArr.filter((el) => el === '|').length;
    if (numOfResults === 10) {
      const index = resArr.findIndex((el) => el === '|');
      res = res.slice(index + 1);
    }
    localStorage.setItem('result', res += result);
  } else {
    localStorage.setItem('result', result);
  }
};

const getResultFromLS = () => {
  if (localStorage.getItem('result')) {
    return localStorage.getItem('result');
  }
};

// console.log(createFieldArr(10, 40, 5));

export { createElement, createFieldArr, splitArray, setResultToLS, getResultFromLS };
