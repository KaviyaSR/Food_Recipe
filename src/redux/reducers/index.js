import { create } from 'lodash';
import { combineReducers } from 'redux';
import {
  DEFAULT_STATE,
  DEFAULT_STATE_FF_EF,
  DEFAULT_STATE_FF_ET
} from '../../utils/Constants';
// import Auth from './Auth';
// import Theme from './Theme';

const createReducer = (reducerName, defaultStateParam) => {
  const defaultState = defaultStateParam || DEFAULT_STATE;
  return (state = defaultState, action) => {
    switch (action.type) {
      case `${reducerName}_PENDING`:
      case `${reducerName}_FULFILLED`:
      case `${reducerName}_REJECTED`:
        return Object.assign({}, action.payload);
      default:
        return state;
    }
  };
};

// const createStaticReducer = (reducerName, defaultStateParam) => {
//   const defaultState = defaultStateParam || DEFAULT_STATE;
//   return (state = defaultState, action) => {
//     switch (action.type) {
//       case `${reducerName}`:
//         return Object.assign({}, action.payload);
//       default:
//         return state;
//     }
//   };
// };

const reducers = combineReducers({
  randomReceipes: createReducer('RANDOM_RECEIPES', DEFAULT_STATE_FF_EF)
});

export default reducers;
