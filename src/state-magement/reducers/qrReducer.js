import {GET_QR_SUCCESS,GET_QR_FAIL} from '../actions/types'

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QR_SUCCESS:
      return {
        ...state,
        code:action.payload.code
      };
    case GET_QR_FAIL:
      return {
        ...state,
        msg:action.payload.msg
      };
    default:
      return state;
  }
};