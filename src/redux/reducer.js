import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'
import currencyReducer, {moduleName as currencyModule} from '../models/currency'
import counterReducer, {moduleName as counterModule} from '../models/counter'
import simonReducer, {moduleName as simonModule} from '../models/simon'
import twenty48Reducer, {moduleName as twenty48Module} from '../models/2048'
import {connectRouter} from "connected-react-router";
import history from '../history'

export default combineReducers({
  form: formReducer,
  [currencyModule]: currencyReducer,
  [counterModule]: counterReducer,
  [simonModule]: simonReducer,
  [twenty48Module]: twenty48Reducer,
  router: connectRouter(history)
})