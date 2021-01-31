import {createSelector} from 'reselect'

/**
 * Constants
 * */

export const moduleName = 'counter'
const prefix = moduleName
/*ACTIONS  */
export const INCREASE_NUMBER = `${prefix}/INCREASE_NUMBER`
export const DECREASE_NUMBER = `${prefix}/DECREASE_NUMBER`
export const SET_PARAMETER = `${prefix}/SET_PARAMETER`



/**
 * Reducer
 * */

export const ReducerRecord = {
  number: 1,
  parameter: 10

}

export default function reducer(state = ReducerRecord, action) {
  const {type, payload} = action

  switch (type) {
    case INCREASE_NUMBER:
      return Object.assign({}, state, {
        number: payload
      })
    case DECREASE_NUMBER:
      return Object.assign({}, state, {
        number: payload
      })
    case SET_PARAMETER:
      return Object.assign({}, state, {
        parameter: payload
      })
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const numberSelector = createSelector(stateSelector, state => state.number)
export const parameterSelector = createSelector(stateSelector, state => state.parameter)

/**
 * Action creators
 * */

export const handleIncreaseNumber = (number, parameter)=>({
  type: INCREASE_NUMBER,
  payload: number + parameter
})

/**
 * Redux thunks
 * */

export const handleDecreaseNumber = () => (dispatch, getState) => {
  const number = getState().counter.number
  const parameter = getState().counter.parameter
  dispatch({
    type: DECREASE_NUMBER,
    payload: number - parameter
  })

}

export const getNewValue = (parameter) =>({
    type: SET_PARAMETER,
    payload: parameter

})
