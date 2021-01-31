import {createSelector} from 'reselect'
import {getRandomInt, isNestedArray} from "../utils";

/**
 * Constants
 * */

export const moduleName = 'simon'
const prefix = moduleName
/*ACTIONS  */
export const GET_NEW_ORDER = `${prefix}/GET_NEW_ORDER`
export const SET_ORDER = `${prefix}/SET_ORDER`
export const FAIL_ITERATION = `${prefix}/FAIL_ITERATION`



/**
 * Reducer
 * */

export const ReducerRecord = {
  order: [],
  currentOrder: []

}

export default function reducer(state = ReducerRecord, action) {
  const {type, payload} = action

  switch (type) {
    case GET_NEW_ORDER:
      return Object.assign({}, state, {
        order: payload, currentOrder:[]
      })
    case SET_ORDER:
      return Object.assign({}, state, {
        currentOrder: payload
      })
    case FAIL_ITERATION:
      return Object.assign({}, state, {
        order: [], currentOrder:[]
      })
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const orderSelector = createSelector(stateSelector, state => state.order)


/**
 * Action creators
 * */


export const startGame = () => ({
  type: GET_NEW_ORDER,
  payload: [getRandomInt(4)]
})


/**
 * Redux thunks
 * */

export const handleSetValue = (value) => (dispatch, getState) => {
  const currentOrder = getState()[moduleName].currentOrder /* getState - возвращает значение из стора moduleName = simon*/
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
}


