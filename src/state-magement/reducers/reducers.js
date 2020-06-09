import { combineReducers } from 'redux';
import  reducer1  from './reducer1'
import qrReducer from './qrReducer'
import statReducer from './statsReducer'
import AttReducer from './AttReducer'

export default combineReducers({
    reducer1,
    qrReducer,
    statReducer,
    AttReducer
}); 