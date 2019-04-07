import{ combineReducers} from 'redux'
import eventReducer from './eventReducer'
import taskReducer from './taskReducer'

export default combineReducers({
    event: eventReducer,
    task: taskReducer
});