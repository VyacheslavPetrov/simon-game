import {UPDATE_OLD_ARRAY, moduleName, currentScoreSelector, SET_NEW_MAX_SCORE} from '../models/2048.js'
import {isGameOver, isWinGame, putRandomNumber} from '../utils'
import {INIT_NEW_GAME, SET_NEW_NUMBER, WIN_GAME} from "../models/2048";
export const savePrevArray = ({dispatch, getState}) => next => ({type, payload}) => {
  if(type.includes('MOVE')){
    const oldMatrix = getState()[moduleName].gameArray
    dispatch({
      type: UPDATE_OLD_ARRAY,
      payload: oldMatrix
    })
  }
  return next ({type, payload})
}

export const usingLocalStorage = () => next => ({type, payload}) => {
  if(type.includes('MOVE') || type.includes('NEW')){
    window.localStorage.setItem("gameArray", JSON.stringify(payload))
  }
  return next ({type, payload})
}

export const gameOver = ({dispatch}) => next => ({type, payload}) => {
  if(type.includes('MOVE')){
    if(isGameOver(payload)){
      const maxScore = currentScoreSelector({[moduleName]: {gameArray: payload}})
      console.log(maxScore)
      if(window.localStorage.getItem("maxScore") < maxScore){
        window.localStorage.setItem("maxScore", maxScore)
        dispatch({
          type: SET_NEW_MAX_SCORE,
          payload: maxScore
        })
      }

    }
  }
  return next ({type, payload})
}

export const winGame = ({dispatch}) => next => ({type, payload}) => {
  if(type.includes('MOVE')){
      const maxScore = currentScoreSelector({[moduleName]: {gameArray: payload}})
    if(maxScore > 2047) {
      const isConfirm = false//window.confirm("CONGRATULATIONS! Continue game?")
      if(isConfirm){
        dispatch({
          type: WIN_GAME,
          payload: maxScore
        })
      } else {
        dispatch({
          type: SET_NEW_NUMBER,
          payload: putRandomNumber([[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]])
        })
      }
    }
  }
  return next ({type, payload})
}