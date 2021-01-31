import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducer'
import {routerMiddleware} from 'connected-react-router'
import history from '../history'
import {savePrevArray, usingLocalStorage, gameOver, winGame} from './middlewares'
const enhancer = applyMiddleware(thunk, logger, routerMiddleware(history), savePrevArray, usingLocalStorage, gameOver, winGame)
const store = createStore(reducer, enhancer)

export default store