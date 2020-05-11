import {GET_STATS} from '../actions/types'

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STATS:
      return {
        ...state,
        data:action.payload.data
      };
    default:
      return state;
  }
};