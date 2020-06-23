
import {GET_ATTREC} from '../actions/types'

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    
    case GET_ATTREC:
      return {
        ...state,
        data:action.payload.data
      };
    default:
      return state;
  }
};