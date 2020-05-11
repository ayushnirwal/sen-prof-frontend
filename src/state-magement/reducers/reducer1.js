
import {LOGIN_FAIL,LOGIN_SUCCESS,LOAD_TOKEN, LOGOUT} from '../actions/types'

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token:action.payload.token
      };
    case LOGIN_FAIL:
      return {
        ...state,
        msg:action.payload.msg
      };
    case LOAD_TOKEN:
      return {
        ...state,
        token:action.payload.token
      };
    case LOGOUT:
        return {
          ...state,
          token:action.payload.token
        };
    default:
      return state;
  }
};