import React, {useEffect, memo} from "react"
import { connect } from 'react-redux'

import {
  startGame,
  setNewNumber,
  gameArraySelector,
  maxScoreSelector,
  currentScoreSelector,
  getRight,
  getLeft,
  getUp,
  getDown
} from "../../models/2048";


function Twenty48({gameArray, maxScore, currentScore, startGame, setNewNumber, getRight, getLeft, getUp, getDown}) {
  useEffect(()=>{
    if(!window.localStorage.getItem("gameArray")){
      startGame()
    }

  },[setNewNumber, startGame])
  return(
    <div id="2048">
      <p>*2048*</p>
      <div>
        <button id="start2048" onClick={()=>startGame()}>Start Game</button>
        <p>Max Score: {maxScore}</p>
        <p>Score: {currentScore}</p>
      </div>
      <div>
        <button onClick={()=>getUp()}>UP</button>
        <button onClick={()=>getDown()}>DOWN</button>
        <button onClick={()=>getLeft()}>LEFT</button>
        <button onClick={()=>getRight()}>RIGHT</button>
      </div>
      {gameArray.map((row, rowKey)=>{
        return (
          <div className="row" key={rowKey}>
            {row.map((cell, cellKey)=>{
              return(
                <div className="cell" key={cellKey}>{cell}</div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
function areEqual(prevProps, nextProps) {
  /*
  возвращает true, если nextProps рендерит
  тот же результат что и prevProps,
  иначе возвращает false
  */
  if(JSON.stringify(prevProps.gameArray) === JSON.stringify(nextProps.gameArray)){
    return true
  }else{
    return false
  }
}
export default connect(state => ({
  gameArray: gameArraySelector(state),
  maxScore: maxScoreSelector(state),
  currentScore: currentScoreSelector(state),
}), {
  startGame, setNewNumber, getRight, getLeft, getUp, getDown
})(memo(Twenty48, areEqual))