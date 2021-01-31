import React, { useEffect, useState } from "react"
import './App.css';
import {Switch, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import FormExample from './components/FormExample'
import Twenty48 from "./components/twenty48";
import Tabs from "./ui/Tabs";
import {
  numberSelector,
  parameterSelector,
  handleIncreaseNumber,
  handleDecreaseNumber,
  getNewValue
} from './models/counter'
import {
  currencyListSelector,
  errorSelector,
  initCurrencyList
} from './models/currency'
import {
  orderSelector,
  startGame,
  handleSetValue
} from './models/simon'

function App({initCurrencyList, currencyList, error, handleIncreaseNumber, handleDecreaseNumber, number, parameter, getNewValue, order, currentOrder, startGame, handleSetValue}) {
  const [activeAnimation, setActiveAnimation] = useState(false)
  useEffect(() => {
    initCurrencyList()
  }, [initCurrencyList])

  const handleSubmit = (data) => {
    console.log(data)
  }

  useEffect(() => {
    order.map((item, key)=>{

      setTimeout(()=>{
        setActiveAnimation(item)
      }, 1000 * key)
      setTimeout(() => {
        setActiveAnimation(false)
      }, (1000 * key) + 1500)
    })

  }, [order, order.length, setActiveAnimation])


  return (
    <div className="App">
      <Tabs items={[{name: "simon", href: "/ "}, {name: "twenty48", href: "/twenty48"}]} />
        <Switch>
          <Route path="/twenty48">
            <Twenty48 />
          </Route>
          <Route path="/">
            <header className="App-header">
              {/*{currencyList && currencyList.map((item, key) =>*/}
              {/*{  return (<div key={key}>{item}</div>)}*/}
              {/*)}*/}
              {/*{error}*/}
              {/*<FormExample onSubmit={handleSubmit}/>*/}
              {/*<input type="number" onChange={(event)=>getNewValue(parseInt(event.target.value))}></input>
              <button onClick={()=>handleIncreaseNumber(number, parameter)}>+</button>{number}<button onClick={handleDecreaseNumber}>-</button>*/}
              <button id="start-game" onClick={startGame}>Start Game</button>
              <div id="outer-circle">
                <div id="topleft" value="1" style={activeAnimation === 0 ? {opacity: "0.5"} : {opacity: "1"}} onClick={()=>{handleSetValue(0)}}/>
                <div id="topright" value="2" style={activeAnimation === 1 ? {opacity: "0.5"} : {opacity: "1"}} onClick={()=>{handleSetValue(1)}}/>
                <div id="bottomleft" value="3" style={activeAnimation === 2 ? {opacity: "0.5"} : {opacity: "1"}} onClick={()=>{handleSetValue(2)}}/>
                <div id="bottomright" value="4" style={activeAnimation === 3 ? {opacity: "0.5"} : {opacity: "1"}} onClick={()=>{handleSetValue(3)}}/>
              </div>
            </header>
          </Route>

        </Switch>
    </div>
  );
}

export default connect(state => ({
  currencyList: currencyListSelector(state),
  error: errorSelector(state),
  number: numberSelector(state),
  parameter: parameterSelector(state),
  order: orderSelector(state)
}), {
  initCurrencyList, handleIncreaseNumber, handleDecreaseNumber, getNewValue, startGame, handleSetValue
})(App)

