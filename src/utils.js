import _ from 'lodash'
export const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

export const isNestedArray = (defaultArr = [], newArray = []) => {
  for(let i = 0; i < defaultArr.length; i++){
    for(let j = 0; j < newArray.length; j++){
      if(i === j){
        if(defaultArr[i] !== newArray[j]){
          return false
        }
      }
    }
  }
  return true
}


//---------2048---------


/*
export const getArrayCoordinates = (array) => {
  const arrayCoordinates = []

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === 0) {
        arrayCoordinates.push([i, j])
      }
    }
  }
  return arrayCoordinates
}
*/
function transpose(matrix) {
  return matrix.reduce((prev, next) => next.map((item, i) =>
    (prev[i] || []).concat(next[i])
  ), []);
}

const matrixRotateRight = (arr, count) => {
  if(count > 0){
    console.log(arr)
    const array = transpose(arr)
    console.log(array)
    return matrixRotateRight(array, --count)
  } else {
    return arr
  }
}

export const addStartNumber = () => {
  const possibleNumbers = [2,2,2,4]
  const randomNumber = possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)]
  return randomNumber
}

export const getEmptyCoordinates = (array) => {
  const emptyArray = [];
  for (let x = 0; x < array.length; x++) {
    for (let z = 0; z < array[x].length; z++) {
      if (array[x][z] === 0) {emptyArray.push([x, z])}
    }
  }
  return emptyArray;
}


export const putRandomNumber = (array) => {
  const randomNumber = addStartNumber()
  const emptyArray = getEmptyCoordinates(array)
  //todo: склонировать array (библиотека lodash/json stringify)
  let arrayClone = JSON.parse(JSON.stringify(array));
  const randomEmptyCoord = emptyArray[Math.floor(Math.random() * emptyArray.length)]
  //arrayClone[Math.floor(Math.random() * arrayClone.length)][Math.floor(Math.random() * arrayClone.length)] = randomNumber
  if (emptyArray.length > 0) {
    arrayClone[randomEmptyCoord[0]][randomEmptyCoord[1]] = randomNumber
    return arrayClone
  }
  return arrayClone
}

const moveNulls = (array) => {
  let newBoard = []
  for (let a = 0; a < array.length; a++) {
    let row = [];
    for (let b = 0; b < array[a].length; b++) {
      let current = array[a][b];
      (current === 0) ? row.unshift(current) : row.push(current);
    }
    newBoard.push(row);
  }
  return newBoard
}

const transformArray = (board) => {
  let newBoard = _.cloneDeep(board)
  for(let i = 0; i < newBoard.length; i++) {
    for (let j = newBoard.length - 1; j >= 0; j--) {
      if (newBoard[i][j] > 0 && newBoard[i][j] === newBoard[i][j - 1]) {
        newBoard[i][j] = newBoard[i][j - 1] * 2
        newBoard[i][j - 1] = 0
      } else if (newBoard[i][j] === 0 && newBoard[i][j - 1] > 0) {
        newBoard[i][j] = newBoard[i][j - 1]
        newBoard[i][j - 1] = 0
      }
    }
  }
  return newBoard
}


export const moveLeft = (arr) => {
  const board = _.cloneDeep(arr)
  console.log(arr)
  const array = board.map((item) => item.reverse())
  console.log(array)
  const nullBoard = moveNulls(array)

  const transformBoard = transformArray(nullBoard)
  return transformBoard.map((item) => item.reverse())
}

export const moveRight = (arr) => {
  const board = _.cloneDeep(arr)
  const nullBoard = moveNulls(board)
  const transformBoard = transformArray(nullBoard)
  return transformBoard
}

export const moveUp = (arr) => {
  const board = _.cloneDeep(arr)
  const array = transpose(board)
  array.map((item) => item.reverse())
  const nullBoard = moveNulls(array)
  const transformBoard = transformArray(nullBoard)
  transformBoard.map((item) => item.reverse())
  return transpose(transformBoard)
}

export const moveDown = (arr) => {
  const board = _.cloneDeep(arr)
  const array = transpose(board)
  const nullBoard = moveNulls(array)
  const transformBoard = transformArray(nullBoard)
  return transpose(transformBoard)

}

export const isGameOver = (arr) => {
  const stringArr = JSON.stringify(arr)
  //console.log(stringArr === JSON.stringify(moveLeft(arr)), stringArr === JSON.stringify(moveDown(arr)), stringArr === JSON.stringify(moveNulls(arr)))
  if(stringArr === JSON.stringify(moveLeft(arr)) && stringArr === JSON.stringify(moveDown(arr)) && stringArr === JSON.stringify(moveNulls(arr))){
    alert("GAME OVER!")
    return true
  } else {
    return false
  }
}


