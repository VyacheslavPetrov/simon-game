import {createSelector} from 'reselect'
import {putRandomNumber, moveLeft, moveRight, moveUp, moveDown} from "../utils";
import _ from 'lodash'


/**
 * Constants
 * */

export const moduleName = '2048'
const prefix = moduleName
/*ACTIONS  */
export const INIT_NEW_GAME = `${prefix}/INIT_NEW_GAME`
export const SET_NEW_NUMBER = `${prefix}/SET_NEW_NUMBER`
export const MOVE_LEFT = `${prefix}/MOVE_LEFT`
export const MOVE_RIGHT = `${prefix}/MOVE_RIGHT`
export const MOVE_UP = `${prefix}/MOVE_UP`
export const MOVE_DOWN = `${prefix}/MOVE_DOWN`
export const WIN_GAME = `${prefix}/WIN_GAME`
export const UPDATE_OLD_ARRAY = `${prefix}/UPDATE_OLD_ARRAY`
export const SET_NEW_MAX_SCORE = `${prefix}/SET_NEW_MAX_SCORE`
/**
 * Reducer
 * */

export const ReducerRecord = {
  gameArray: JSON.parse(window.localStorage.getItem("gameArray")) || [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]],
  maxScore: window.localStorage.getItem("maxScore"),
  prevGameArray: [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]

}

export default function reducer(state = ReducerRecord, action) {
  const {type, payload} = action

  switch (type) {
    case INIT_NEW_GAME:
      return Object.assign({}, state, {
        gameArray: [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]],
        prevGameArray: [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]
      })
    case SET_NEW_NUMBER:
    case MOVE_RIGHT:
    case MOVE_LEFT:
    case MOVE_UP:
    case MOVE_DOWN:
      return Object.assign({}, state, {
        gameArray: payload
      })
    case WIN_GAME:
      return Object.assign({}, state, {
        maxScore: payload,
      })

    case UPDATE_OLD_ARRAY:
      return Object.assign({}, state, {
        prevGameArray: payload,
      })

    case SET_NEW_MAX_SCORE:
      return Object.assign({}, state, {
        maxScore: payload,
      })
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const gameArraySelector = createSelector(stateSelector, state => state.gameArray)
export const maxScoreSelector = createSelector(stateSelector, state => state.maxScore)
export const currentScoreSelector = createSelector(stateSelector, state => {
  let count = 0
  state.gameArray.map((item)=>{
    item.map(number=>{
      count += number
    })
  })
  return count
})
/**
 * Action creators
 * */


/*export const startGame = () => ({
  type: SET_NEW_GAME,
  payload: [getRandomInt(4)]
})*/


/**
 * Redux thunks
 * */

export const startGame = () => ({
    type: SET_NEW_NUMBER,
    payload: putRandomNumber([[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]])

})

export const setNewNumber = () => (dispatch, getState) => {
  const {gameArray} = getState()[moduleName]

  dispatch({
    type: SET_NEW_NUMBER,
    payload: putRandomNumber(gameArray)

  })
}

export const getLeft = () => async (dispatch, getState) => {
  const {gameArray} = getState()[moduleName]
  const compareArrays = _.isEqual(gameArray, moveLeft(moveLeft(gameArray, true))) ? gameArray : putRandomNumber(moveLeft(moveLeft(gameArray)))
  await dispatch({
    type: MOVE_LEFT,
    payload: compareArrays
  })
}

export const getRight = () => async (dispatch, getState) => {
  const {gameArray} = getState()[moduleName]
  const compareArrays = _.isEqual(gameArray, moveRight(moveRight(gameArray))) ? gameArray : putRandomNumber(moveRight(moveRight(gameArray)))
  await dispatch({
    type: MOVE_RIGHT,
    payload: compareArrays
  })
}

export const getUp = () => async (dispatch, getState) => {
  const {gameArray} = getState()[moduleName]
  const compareArrays = _.isEqual(gameArray, moveUp(moveUp(gameArray))) ? gameArray : putRandomNumber(moveUp(moveUp(gameArray)))
  await dispatch({
    type: MOVE_UP,
    payload: compareArrays
  })
}

export const getDown = () => async (dispatch, getState) => {
  const {gameArray} = getState()[moduleName]
  const compareArrays = _.isEqual(gameArray, moveDown(moveDown(gameArray))) ? gameArray : putRandomNumber(moveDown(moveDown(gameArray)))
  await dispatch({
    type: MOVE_DOWN,
    payload: compareArrays
  })
}

/*export const handleSetValue = (value) => (dispatch, getState) => {
  const currentOrder = getState()[moduleName].currentOrder /!* getState - возвращает значение из стора moduleName = simon*!/
  const order = getState()[moduleName].order
  const currentValue = [...currentOrder, value]
  if(JSON.stringify(order) === JSON.stringify(currentValue)){
    dispatch({
      type: GET_NEW_ORDER,
      payload: [...order, getRandomInt(4)]
    })
  } else {
    if(isNestedArray(order, currentValue)) {
      dispatch({
        type: SET_ORDER,
        payload: currentValue
      })
    } else {
      dispatch({
        type: FAIL_ITERATION
      })
    }
  }
}*/


