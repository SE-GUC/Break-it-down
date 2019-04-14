import{ combineReducers} from 'redux'
import eventReducer from './eventReducer'
import taskReducer from './taskReducer'
import caReducer from './caReducer';


export default combineReducers({
    event: eventReducer,
    task: taskReducer,
    ca: caReducer

});